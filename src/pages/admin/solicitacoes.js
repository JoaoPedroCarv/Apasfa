import { useEffect, useState } from 'react';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { getAuth } from 'firebase/auth';
import './admin.css';

export default function SolicitacoesAdocao() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function verificarAdmin() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const usuarioRef = doc(db, 'usuarios', user.uid);
            const usuarioSnap = await getDoc(usuarioRef);

            if (usuarioSnap.exists()) {
                const dados = usuarioSnap.data();
                if (dados.admin === true) {
                    setIsAdmin(true);
                }
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

                        let usuarioNome = 'Desconhecido';
                        let usuarioEmail = 'Desconhecido';
                        let animalNome = 'Desconhecido';
                        let animalRaca = '';
                        let animalFoto = '';

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
                            usuario: { nome: usuarioNome, email: usuarioEmail },
                            animal: { nome: animalNome, raca: animalRaca, foto: animalFoto },
                            motivo: solicitacao.motivo || '',
                            outrosAnimais: solicitacao.outrosAnimais || '',
                            telefone: solicitacao.telefone || '',
                            data: solicitacao.dataSolicitacao?.toDate().toLocaleString() || '',
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

    function responderEmail(email) {
        alert(`Abrir modal ou função para responder ${email}`);
    }

    if (loading) return <p>Carregando solicitações...</p>;

    if (!isAdmin) return <p>Você não tem permissão para ver esta página.</p>;

    return (
        <div>
            {solicitacoes.length === 0 ? (
                <p>Nenhuma solicitação no momento.</p>
            ) : (
                <ul className="sollicitacoes-list">
                    {solicitacoes.map((s) => (
                        <li key={s.id} className="sollicitacao-item">
                            <p><strong>Usuário:</strong> {s.usuario.nome} ({s.usuario.email})</p>
                            <p><strong>Telefone:</strong> {s.telefone}</p>
                            <p><strong>Animal:</strong> {s.animal.nome} ({s.animal.raca})</p>
                            {s.animal.foto && (
                                <img src={s.animal.foto} alt={s.animal.nome} style={{ width: '150px', borderRadius: '8px' }} />
                            )}
                            <p><strong>Motivo:</strong> {s.motivo}</p>
                            <p><strong>Outros Animais:</strong> {s.outrosAnimais}</p>
                            <p><strong>Data da Solicitação:</strong> {s.data}</p>
                            <button onClick={() => responderEmail(s.usuario.email)}>Responder por Email</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
