import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import './colaboradores.css';

export default function GerenciarColaboradores() {
    const [colaboradores, setColaboradores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [colaboradorEditando, setColaboradorEditando] = useState(null);
    const [novoColaborador, setNovoColaborador] = useState({
        nome: '',
        membroDesde: '',
        imagem: '',
        cargo: 'colaborador',
        descricao: ''
    });

    // Lista de cargos disponíveis
    const cargosDisponiveis = [
        { value: 'presidente', label: 'Presidente' },
        { value: 'vice-presidente', label: 'Vice-Presidente' },
        { value: 'secretario', label: 'Secretário(a)' },
        { value: 'tesoureiro', label: 'Tesoureiro(a)' },
        { value: 'coordenador', label: 'Coordenador(a)' },
        { value: 'veterinario', label: 'Veterinário(a)' },
        { value: 'ajudante', label: 'Ajudante' },
        { value: 'voluntario', label: 'Voluntário(a)' },
        { value: 'colaborador', label: 'Colaborador(a)' }
    ];
    const [imagemFile, setImagemFile] = useState(null);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        carregarColaboradores();
    }, []);

    const carregarColaboradores = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'colaboradores'));
            const colaboradoresList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setColaboradores(colaboradoresList);
        } catch (error) {
            console.error('Erro ao carregar colaboradores:', error);
            if (error.code === 'permission-denied') {
                alert('Erro: Permissões insuficientes para acessar colaboradores. Verifique as regras do Firestore.');
            } else {
                alert('Erro ao carregar colaboradores: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Função para converter arquivo para Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setColaboradorEditando(prev => ({ ...prev, [name]: value }));
        } else {
            setNovoColaborador(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e, isEditing = false) => {
        const file = e.target.files[0];
        if (file) {
            setImagemFile(file);
            if (isEditing) {
                setColaboradorEditando(prev => ({ ...prev, imagemFile: file }));
            }
        }
    };

    const adicionarColaborador = async (e) => {
        e.preventDefault();
        setSalvando(true);

        try {
            // Verificar se já existe um presidente
            if (novoColaborador.cargo === 'presidente') {
                const presidenteExistente = colaboradores.find(c => c.cargo === 'presidente');
                if (presidenteExistente) {
                    alert('Já existe um presidente cadastrado. Edite o presidente atual ou altere o cargo deste colaborador.');
                    setSalvando(false);
                    return;
                }
            }

            let imagemUrl = novoColaborador.imagem;

            // Se uma nova imagem foi selecionada, converte para Base64
            if (imagemFile) {
                imagemUrl = await convertToBase64(imagemFile);
            }

            const colaboradorData = {
                nome: novoColaborador.nome,
                membroDesde: novoColaborador.membroDesde,
                cargo: novoColaborador.cargo,
                descricao: novoColaborador.descricao,
                imagem: imagemUrl,
                criadoEm: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, 'colaboradores'), colaboradorData);
            
            setColaboradores(prev => [...prev, { id: docRef.id, ...colaboradorData }]);
            setNovoColaborador({ nome: '', membroDesde: '', imagem: '', cargo: 'colaborador', descricao: '' });
            setImagemFile(null);

            alert('Colaborador adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar colaborador:', error);
            if (error.code === 'permission-denied') {
                alert('Erro: Você não tem permissão para adicionar colaboradores. Verifique se está logado como administrador e se as regras do Firestore estão configuradas corretamente.');
            } else {
                alert('Erro ao adicionar colaborador: ' + error.message);
            }
        } finally {
            setSalvando(false);
        }
    };

    const abrirModalEdicao = (colaborador) => {
        setColaboradorEditando({ ...colaborador });
    };

    const fecharModal = () => {
        setColaboradorEditando(null);
        setImagemFile(null);
    };

    const salvarEdicao = async () => {
        setSalvando(true);

        try {
            // Verificar se está tentando alterar para presidente quando já existe um
            if (colaboradorEditando.cargo === 'presidente') {
                const presidenteExistente = colaboradores.find(c => c.cargo === 'presidente' && c.id !== colaboradorEditando.id);
                if (presidenteExistente) {
                    alert('Já existe um presidente cadastrado. Primeiro altere o cargo do presidente atual ou escolha outro cargo para este colaborador.');
                    setSalvando(false);
                    return;
                }
            }

            let imagemUrlAtualizada = colaboradorEditando.imagem;

            // Se uma nova imagem foi selecionada, converte para Base64
            if (colaboradorEditando.imagemFile) {
                imagemUrlAtualizada = await convertToBase64(colaboradorEditando.imagemFile);
            }

            const colaboradorRef = doc(db, 'colaboradores', colaboradorEditando.id);
            await updateDoc(colaboradorRef, {
                nome: colaboradorEditando.nome,
                membroDesde: colaboradorEditando.membroDesde,
                cargo: colaboradorEditando.cargo,
                descricao: colaboradorEditando.descricao,
                imagem: imagemUrlAtualizada,
            });

            setColaboradores(prev =>
                prev.map(c => (c.id === colaboradorEditando.id ? { ...colaboradorEditando, imagem: imagemUrlAtualizada } : c))
            );

            fecharModal();
            alert('Colaborador atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar colaborador:', error);
            alert('Erro ao atualizar colaborador.');
        } finally {
            setSalvando(false);
        }
    };

    const excluirColaborador = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este colaborador?')) return;

        try {
            await deleteDoc(doc(db, 'colaboradores', id));
            setColaboradores(prev => prev.filter(c => c.id !== id));
            alert('Colaborador excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir colaborador:', error);
            alert('Erro ao excluir colaborador.');
        }
    };

    if (loading) {
        return (
            <div className="colaboradores-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Carregando colaboradores...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="colaboradores-container">
            <div className="colaboradores-header">
                <h2 style={{ color: '#007bff' }}>Gerenciar Colaboradores</h2>
                <p>Gerencie os membros da equipe e suas informações</p>
            </div>
            
            {/* Formulário para adicionar novo colaborador */}
            <form onSubmit={adicionarColaborador} className="cadastro-form">
                <div className="form-header">
                    <svg className="form-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5H10.6C7.25 5 4.56 7.69 4.56 11.04V16.96C4.56 18.11 5.45 19 6.6 19S8.64 18.11 8.64 16.96V15H15.36V16.96C15.36 18.11 16.25 19 17.4 19S19.44 18.11 19.44 16.96V11.04C19.44 10.12 19.25 9.25 18.94 8.45L21 6.5V9H21Z"/>
                    </svg>
                    <h3>Adicionar Novo Colaborador</h3>
                </div>
                
                <div className="form-grid">
                    <div className="form-group">
                        <label>Nome Completo:</label>
                        <input
                            type="text"
                            name="nome"
                            value={novoColaborador.nome}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite o nome completo"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Membro desde:</label>
                        <input
                            type="text"
                            name="membroDesde"
                            value={novoColaborador.membroDesde}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Janeiro 2020"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Cargo:</label>
                        <select
                            name="cargo"
                            value={novoColaborador.cargo}
                            onChange={handleInputChange}
                            required
                        >
                            {cargosDisponiveis.map(cargo => (
                                <option key={cargo.value} value={cargo.value}>
                                    {cargo.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Foto do colaborador:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, false)}
                        />
                        <small>Selecione uma foto para o perfil</small>
                    </div>
                    
                    <div className="form-group full-width">
                        <label>
                            Descrição {novoColaborador.cargo === 'presidente' ? '(obrigatória para presidente)' : '(opcional)'}:
                        </label>
                        <textarea
                            name="descricao"
                            value={novoColaborador.descricao}
                            onChange={handleInputChange}
                            required={novoColaborador.cargo === 'presidente'}
                            placeholder={novoColaborador.cargo === 'presidente' ? 'Descrição detalhada do presidente...' : 'Descrição opcional do colaborador...'}
                            rows="4"
                        />
                    </div>
                </div>
                
                <button type="submit" className="submit-button" disabled={salvando}>
                    {salvando ? (
                        <>
                            <div className="spinner" style={{width: '16px', height: '16px', border: '2px solid #ffffff40', borderTop: '2px solid white'}}></div>
                            Adicionando...
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"/>
                            </svg>
                            Adicionar Colaborador
                        </>
                    )}
                </button>
            </form>

            {/* Lista de colaboradores existentes */}
            <div className="colaboradores-list">
                <div className="list-header">
                    <h3>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 6C14.9 6 14 6.9 14 8C14 9.1 14.9 10 16 10C17.1 10 18 9.1 18 8C18 6.9 17.1 6 16 6ZM8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 13C10.67 13 16 14.33 16 17V20H0V17C0 14.33 5.33 13 8 13ZM8 14.9C5.03 14.9 1.9 16.36 1.9 17V18.1H14.1V17C14.1 16.36 10.97 14.9 8 14.9ZM16 13C18.67 13 24 14.33 24 17V20H18V18.1H22.1V17C22.1 16.36 18.97 14.9 16 14.9C15.33 14.9 14.53 15.05 13.66 15.28C14.5 15.92 15.1 16.4 15.1 17V18.1H16V20H15V17C15 14.33 21.33 13 16 13Z"/>
                        </svg>
                        Colaboradores Cadastrados ({colaboradores.length})
                    </h3>
                </div>
                
                {colaboradores.length === 0 ? (
                    <div className="empty-state">
                        <h4>Nenhum colaborador encontrado</h4>
                        <p>Adicione o primeiro colaborador usando o formulário acima</p>
                    </div>
                ) : (
                    <div className="colaboradores-grid">
                        {colaboradores.map((colaborador) => (
                            <div key={colaborador.id} className="colaborador-item">
                                <div className="colaborador-header">
                                    <img
                                        src={colaborador.imagem && (colaborador.imagem.startsWith('http') || colaborador.imagem.startsWith('data:')) ? colaborador.imagem : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG88L3RleHQ+PC9zdmc+'}
                                        alt={colaborador.nome}
                                        className="colaborador-image"
                                        onError={e => { 
                                            e.target.onerror = null; 
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG88L3RleHQ+PC9zdmc+'; 
                                        }}
                                    />
                                    <div className="colaborador-info">
                                        <h4>{colaborador.nome}</h4>
                                        <span className={`cargo-badge ${colaborador.cargo === 'presidente' ? 'cargo-presidente' : colaborador.cargo === 'vice-presidente' ? 'cargo-vice-presidente' : 'cargo-default'}`}>
                                            {cargosDisponiveis.find(c => c.value === colaborador.cargo)?.label || colaborador.cargo}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="colaborador-details">
                                    <p><strong>Membro desde:</strong> {colaborador.membroDesde}</p>
                                    {colaborador.descricao && (
                                        <div className="colaborador-descricao">
                                            <p>{colaborador.descricao.length > 150 ? colaborador.descricao.substring(0, 150) + '...' : colaborador.descricao}</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="colaborador-actions">
                                    <button className="action-button edit-button" onClick={() => abrirModalEdicao(colaborador)}>
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"/>
                                        </svg>
                                        Editar
                                    </button>
                                    <button className="action-button delete-button" onClick={() => excluirColaborador(colaborador.id)}>
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z"/>
                                        </svg>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de edição */}
            {colaboradorEditando && createPortal(
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fecharModal()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"/>
                            </svg>
                            <h3>Editar Colaborador</h3>
                        </div>
                        
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nome Completo:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={colaboradorEditando.nome}
                                    onChange={(e) => handleInputChange(e, true)}
                                    placeholder="Digite o nome completo"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Membro desde:</label>
                                <input
                                    type="text"
                                    name="membroDesde"
                                    value={colaboradorEditando.membroDesde}
                                    onChange={(e) => handleInputChange(e, true)}
                                    placeholder="Ex: Janeiro 2020"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Cargo:</label>
                                <select
                                    name="cargo"
                                    value={colaboradorEditando.cargo || 'colaborador'}
                                    onChange={(e) => handleInputChange(e, true)}
                                    required
                                >
                                    {cargosDisponiveis.map(cargo => (
                                        <option key={cargo.value} value={cargo.value}>
                                            {cargo.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Foto:</label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleFileChange(e, true)} 
                                />
                                {colaboradorEditando.imagem && !colaboradorEditando.imagemFile && (
                                    <img
                                        src={colaboradorEditando.imagem && (colaboradorEditando.imagem.startsWith('http') || colaboradorEditando.imagem.startsWith('data:')) ? colaboradorEditando.imagem : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG88L3RleHQ+PC9zdmc+'}
                                        alt="Foto atual"
                                        className="modal-foto-preview"
                                        style={{ width: '80px', height: '80px' }}
                                        onError={e => { 
                                            e.target.onerror = null; 
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG88L3RleHQ+PC9zdmc+'; 
                                        }}
                                    />
                                )}
                            </div>
                            
                            <div className="form-group full-width">
                                <label>
                                    Descrição {colaboradorEditando.cargo === 'presidente' ? '(obrigatória para presidente)' : '(opcional)'}:
                                </label>
                                <textarea
                                    name="descricao"
                                    value={colaboradorEditando.descricao || ''}
                                    onChange={(e) => handleInputChange(e, true)}
                                    required={colaboradorEditando.cargo === 'presidente'}
                                    placeholder={colaboradorEditando.cargo === 'presidente' ? 'Descrição detalhada do presidente...' : 'Descrição opcional do colaborador...'}
                                    rows="4"
                                />
                            </div>
                        </div>
                        
                        <div className="modal-buttons">
                            <button className="modal-button primary" disabled={salvando} onClick={salvarEdicao}>
                                {salvando ? (
                                    <>
                                        <div className="spinner" style={{width: '16px', height: '16px', border: '2px solid #ffffff40', borderTop: '2px solid white'}}></div>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16S10.34 13 12 13 15 14.34 15 16 13.66 19 12 19ZM15 9H5V5H15V9Z"/>
                                        </svg>
                                        Salvar Alterações
                                    </>
                                )}
                            </button>
                            <button className="modal-button secondary" onClick={fecharModal}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                                </svg>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
