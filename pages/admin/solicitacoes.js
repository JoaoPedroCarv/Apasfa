import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { getAuth } from 'firebase/auth';
import './solicitacoes.css';

export default function SolicitacoesAdmin() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState('todas'); // 'todas', 'adocao', 'contato'
    const [filtroStatus, setFiltroStatus] = useState('todas'); // 'todas', 'pendente', 'visualizada', 'concluida'
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
    const [atualizandoStatus, setAtualizandoStatus] = useState(false);
    
    // Estados para paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(10); // Número de solicitações por página

    useEffect(() => {
        async function verificarAdmin() {
            const auth = getAuth();
            const user = auth.currentUser;
            console.log('Usuário atual:', user);
            
            if (!user) {
                console.log('Nenhum usuário logado');
                return;
            }

            try {
                const usuarioRef = doc(db, 'usuarios', user.uid);
                const usuarioSnap = await getDoc(usuarioRef);

                if (usuarioSnap.exists()) {
                    const dados = usuarioSnap.data();
                    console.log('Dados do usuário:', dados);
                    if (dados.admin === true) {
                        setIsAdmin(true);
                        console.log('Usuário é admin');
                    } else {
                        console.log('Usuário não é admin');
                    }
                } else {
                    console.log('Documento do usuário não existe');
                }
            } catch (error) {
                console.error('Erro ao verificar admin:', error);
            }
        }

        verificarAdmin();
    }, []);

    useEffect(() => {
        async function fetchSolicitacoes() {
            if (!isAdmin) {
                setLoading(false);
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, 'solicitacoes'));

                const solicitacoesDetalhadas = await Promise.all(
                    querySnapshot.docs.map(async (docSolicitacao) => {
                        const solicitacao = docSolicitacao.data();
                        const solicitacaoId = docSolicitacao.id;

                        let usuarioNome = solicitacao.nome || 'Desconhecido';
                        let usuarioEmail = solicitacao.email || 'Desconhecido';
                        let animalNome = 'N/A';
                        let animalRaca = '';
                        let animalFoto = '';

                        // Se for solicitação de adoção (tem usuarioId e animalId)
                        if (solicitacao.usuarioId) {
                            const usuarioRef = doc(db, 'usuarios', solicitacao.usuarioId);
                            const usuarioSnap = await getDoc(usuarioRef);
                            if (usuarioSnap.exists()) {
                                const usuarioData = usuarioSnap.data();
                                usuarioNome = usuarioData.nome || 'Sem nome';
                                usuarioEmail = usuarioData.email || 'Sem email';
                            }
                        }

                        if (solicitacao.animalId) {
                            const animalRef = doc(db, 'animais', solicitacao.animalId);
                            const animalSnap = await getDoc(animalRef);
                            if (animalSnap.exists()) {
                                const animalData = animalSnap.data();
                                animalNome = animalData.nome || 'Sem nome';
                                animalRaca = animalData.raca || '';
                                animalFoto = animalData.fotoUrl || '';
                            }
                        }

                        return {
                            id: solicitacaoId,
                            tipo: solicitacao.tipo || 'adocao',
                            usuario: { nome: usuarioNome, email: usuarioEmail },
                            animal: { nome: animalNome, raca: animalRaca, foto: animalFoto },
                            motivo: solicitacao.motivo || '',
                            outrosAnimais: solicitacao.outrosAnimais || '',
                            telefone: solicitacao.telefone || '',
                            assunto: solicitacao.assunto || '',
                            mensagem: solicitacao.mensagem || '',
                            status: solicitacao.status || 'pendente',
                            data: solicitacao.dataSolicitacao?.toDate().toLocaleString() || 
                                  (solicitacao.dataEnvio ? new Date(solicitacao.dataEnvio).toLocaleString() : ''),
                        };
                    })
                );

                setSolicitacoes(solicitacoesDetalhadas);
            } catch (error) {
                console.error('Erro ao buscar solicitações:', error);
            } finally {
                setLoading(false);
            }
        }

        if (isAdmin) {
            fetchSolicitacoes();
        }
    }, [isAdmin]);

  

    const abrirSolicitacao = async (solicitacao) => {
        setSolicitacaoSelecionada(solicitacao);
        
        // Se estiver pendente, marcar como visualizada
        if (solicitacao.status === 'pendente') {
            await atualizarStatus(solicitacao.id, 'visualizada');
        }
    };

    const fecharModal = () => {
        setSolicitacaoSelecionada(null);
    };

    const atualizarStatus = async (solicitacaoId, novoStatus) => {
        // Verificar se é admin antes de tentar atualizar
        if (!isAdmin) {
            alert('Apenas administradores podem atualizar o status das solicitações.');
            return;
        }

        

        // Verificar se o usuário está logado
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            alert('Você precisa estar logado como administrador.');
            return;
        }

        setAtualizandoStatus(true);
        try {
            console.log('Tentando atualizar status:', { solicitacaoId, novoStatus, userId: user.uid, isAdmin });
            
            const solicitacaoRef = doc(db, 'solicitacoes', solicitacaoId);
            await updateDoc(solicitacaoRef, {
                status: novoStatus,
                dataAtualizacao: new Date().toISOString()
            });

            // Atualizar a lista local
            setSolicitacoes(prev => 
                prev.map(s => 
                    s.id === solicitacaoId 
                        ? { ...s, status: novoStatus }
                        : s
                )
            );

            // Atualizar também a solicitação selecionada se for a mesma
            if (solicitacaoSelecionada && solicitacaoSelecionada.id === solicitacaoId) {
                setSolicitacaoSelecionada(prev => ({ ...prev, status: novoStatus }));
            }

            if (novoStatus === 'concluida') {
                alert('Solicitação marcada como concluída!');
                fecharModal();
            }
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            alert('Erro ao atualizar status da solicitação. Verifique se você tem permissões de administrador.');
        } finally {
            setAtualizandoStatus(false);
        }
    };

    const handleExcluirSolicitacao = async (solicitacaoId) => {
    // Medida de segurança: pedir confirmação ao usuário
    if (!window.confirm("Tem certeza que deseja excluir esta solicitação? Esta ação não pode ser desfeita.")) {
        return; // Cancela a exclusão se o usuário clicar em "Cancelar"
    }

    try {
        // Cria a referência para o documento que será excluído
        const solicitacaoRef = doc(db, 'solicitacoes', solicitacaoId);
        
        // Exclui o documento do Firestore
        await deleteDoc(solicitacaoRef);

        // Atualiza a lista local removendo o item excluído, para a UI responder imediatamente
        setSolicitacoes(prevSolicitacoes => 
            prevSolicitacoes.filter(s => s.id !== solicitacaoId)
        );

        alert("Solicitação excluída com sucesso!");

    } catch (error) {
        console.error("Erro ao excluir solicitação:", error);
        alert("Ocorreu um erro ao tentar excluir a solicitação.");
    }
};

    if (loading) return <p>Carregando solicitações...</p>;

    if (!isAdmin) return <p>Você não tem permissão para ver esta página.</p>;

    // Filtrar solicitações por tipo e status
    const solicitacoesFiltradas = solicitacoes.filter(s => {
        const filtroTipoOk = filtroTipo === 'todas' || s.tipo === filtroTipo;
        const filtroStatusOk = filtroStatus === 'todas' || (s.status || 'pendente') === filtroStatus;
        return filtroTipoOk && filtroStatusOk;
    });

    // Calcular paginação
    const totalPaginas = Math.ceil(solicitacoesFiltradas.length / itensPorPagina);
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const solicitacoesPagina = solicitacoesFiltradas.slice(indiceInicial, indiceFinal);

    // Função para ir para uma página específica
    const irParaPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    // Reset da página quando filtros mudam
    const handleFiltroChange = (novoFiltroTipo, novoFiltroStatus) => {
        setPaginaAtual(1);
        if (novoFiltroTipo !== undefined) setFiltroTipo(novoFiltroTipo);
        if (novoFiltroStatus !== undefined) setFiltroStatus(novoFiltroStatus);
    };

    return (
        <div className="solicitacoes-container">
            <h3>Gerenciar Solicitações</h3>
            
            {/* Filtros */}
            <div className="filtros-solicitacoes" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                    <label htmlFor="filtro-tipo" style={{ marginRight: '0.5rem' }}>Tipo:</label>
                    <select 
                        id="filtro-tipo" 
                        value={filtroTipo} 
                        onChange={(e) => handleFiltroChange(e.target.value, undefined)}
                        style={{ padding: '0.5rem' }}
                    >
                        <option value="todas">Todas</option>
                        <option value="adocao">Adoção</option>
                        <option value="contato">Contato</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="filtro-status" style={{ marginRight: '0.5rem' }}>Status:</label>
                    <select 
                        id="filtro-status" 
                        value={filtroStatus} 
                        onChange={(e) => handleFiltroChange(undefined, e.target.value)}
                        style={{ padding: '0.5rem' }}
                    >
                        <option value="todas">Todos</option>
                        <option value="pendente">Pendentes</option>
                        <option value="visualizada">Visualizadas</option>
                        <option value="concluida">Concluídas</option>
                    </select>
                </div>
                
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    ({solicitacoesFiltradas.length} solicitação{solicitacoesFiltradas.length !== 1 ? 'ões' : ''})
                </span>
            </div>

            {solicitacoesFiltradas.length === 0 ? (
                <p>Nenhuma solicitação encontrada para os filtros selecionados.</p>
            ) : (
                <>
                    <ul className="sollicitacoes-list">
                        {solicitacoesPagina.map((s) => (
                            <li key={s.id} className={`sollicitacao-item ${s.tipo === 'contato' ? 'contato-item' : 'adocao-item'}`}>
                                
                           {/* Header do card com badges e botão de excluir */}
<div className="card-header">
    <h4 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
        {s.tipo === 'contato' ? '📧 Mensagem de Contato' : '🐾 Solicitação de Adoção'}
    </h4>
    <div className="badges-container">
        {/* Badge de Status (código existente) */}
        <div className={`status-badge ${s.status || 'pendente'}`}>
            {s.status === 'pendente' ? '⏳ Pendente' : 
             s.status === 'visualizada' ? '👁️ Visualizada' : 
             s.status === 'concluida' ? '✅ Concluída' : '⏳ Pendente'}
        </div>

        {/* ======================================================== */}
        {/*    BOTÃO DE EXCLUIR QUE APARECE CONDICIONALMENTE     */}
        {/* ======================================================== */}
        {(s.status === 'visualizada' || s.status === 'concluida') && (
            <button
                className="btn-excluir"
                title="Excluir solicitação"
                onClick={(e) => {
                    // Impede que o modal abra ao clicar na lixeira
                    e.stopPropagation(); 
                    handleExcluirSolicitacao(s.id);
                }}
            >
                🗑️
            </button>
        )}
        {/* ======================================================== */}
    </div>
</div>
                            
                            <div className="solicitacao-content">
                                <div className="usuario-info">
                                    <p><strong>Nome:</strong> {s.usuario.nome}</p>
                                    <p><strong>Email:</strong> {s.usuario.email}</p>
                                    {s.telefone && <p><strong>Telefone:</strong> {s.telefone}</p>}
                                </div>

                                {s.tipo === 'adocao' ? (
                                    // Layout para solicitações de adoção
                                    <div className="adocao-info">
                                        <div className="animal-info">
                                            <p><strong>Animal:</strong> {s.animal.nome} {s.animal.raca && `(${s.animal.raca})`}</p>
                                            {s.animal.foto && (
                                                <img
                                                    src={s.animal.foto}
                                                    alt={s.animal.nome}
                                                    className="animal-foto-mini"
                                                    onError={e => { e.target.style.display = 'none'; }}
                                                />
                                            )}
                                        </div>
                                        <p><strong>Motivo para adoção:</strong> {s.motivo}</p>
                                        <p><strong>Outros animais:</strong> {s.outrosAnimais}</p>
                                    </div>
                                ) : (
                                    // Layout para mensagens de contato
                                    <div className="contato-info">
                                        <p><strong>Assunto:</strong> {s.assunto}</p>
                                        <div className="mensagem-box">
                                            <strong>Mensagem:</strong>
                                            <p className="mensagem-texto">{s.mensagem}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="solicitacao-footer">
                                    <p className="data-solicitacao"><strong>Data:</strong> {s.data}</p>
                                    <button 
                                        className="btn-responder" 
                                        onClick={() => abrirSolicitacao(s)}
                                    >
                                        �️ Ver detalhes
                                    </button>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    
                    {/* Controles de Paginação */}
                    {totalPaginas > 1 && (
                        <div className="paginacao" style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            marginTop: '2rem',
                            padding: '1rem'
                        }}>
                            <button 
                                onClick={() => irParaPagina(paginaAtual - 1)}
                                disabled={paginaAtual === 1}
                                className="btn-paginacao"
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ddd',
                                    background: paginaAtual === 1 ? '#f8f9fa' : 'white',
                                    cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                ← Anterior
                            </button>
                            
                            <span style={{ 
                                margin: '0 1rem', 
                                color: '#666',
                                fontSize: '0.9rem'
                            }}>
                                Página {paginaAtual} de {totalPaginas}
                            </span>
                            
                            <button 
                                onClick={() => irParaPagina(paginaAtual + 1)}
                                disabled={paginaAtual === totalPaginas}
                                className="btn-paginacao"
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ddd',
                                    background: paginaAtual === totalPaginas ? '#f8f9fa' : 'white',
                                    cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                Próxima →
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Modal para detalhes da solicitação */}
            {solicitacaoSelecionada && createPortal(
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Detalhes da Solicitação</h3>
                            <button className="btn-fechar" onClick={fecharModal}>✖</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="modal-info">
                                <div className="status-atual">
                                    <span className={`status-badge ${solicitacaoSelecionada.status || 'pendente'}`}>
                                        {solicitacaoSelecionada.status === 'pendente' ? '⏳ Pendente' :
                                         solicitacaoSelecionada.status === 'visualizada' ? '👁️ Visualizada' : 
                                         '✅ Concluída'}
                                    </span>
                                </div>
                                
                                <div className="usuario-detalhes">
                                    <h4>Informações do Usuário</h4>
                                    <p><strong>Nome:</strong> {solicitacaoSelecionada.usuario?.nome || solicitacaoSelecionada.nome}</p>
                                    <p><strong>Email:</strong> {solicitacaoSelecionada.usuario?.email || solicitacaoSelecionada.email}</p>
                                    {solicitacaoSelecionada.telefone && <p><strong>Telefone:</strong> {solicitacaoSelecionada.telefone}</p>}
                                </div>

                                {solicitacaoSelecionada.tipo === 'adocao' ? (
                                    <div className="animal-detalhes">
                                        <h4>Animal de Interesse</h4>
                                        <p><strong>Nome:</strong> {solicitacaoSelecionada.animal?.nome}</p>
                                        {solicitacaoSelecionada.animal?.raca && <p><strong>Raça:</strong> {solicitacaoSelecionada.animal.raca}</p>}
                                        <h4>Motivação</h4>
                                        <p>{solicitacaoSelecionada.motivacao}</p>
                                    </div>
                                ) : (
                                    <div className="mensagem-detalhes">
                                        <h4>Mensagem</h4>
                                        <p><strong>Assunto:</strong> {solicitacaoSelecionada.assunto}</p>
                                        <p>{solicitacaoSelecionada.mensagem}</p>
                                    </div>
                                )}
                                
                                <div className="data-detalhes">
                                    <p><strong>Data da solicitação:</strong> {solicitacaoSelecionada.data}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            {solicitacaoSelecionada.status !== 'concluida' && (
                                <button 
                                    className="btn-concluir"
                                    onClick={() => atualizarStatus(solicitacaoSelecionada.id, 'concluida')}
                                    disabled={atualizandoStatus}
                                >
                                    {atualizandoStatus ? 'Atualizando...' : '✅ Marcar como Concluída'}
                                </button>
                            )}
                           
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
