import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../services/firebaseConnection';
import '../admin.css';

const storage = getStorage();

export default function EventosAdmin() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventoEditando, setEventoEditando] = useState(null);
    const [imagemFile, setImagemFile] = useState(null);

    useEffect(() => {
        async function buscarEventos() {
            try {
                const querySnapshot = await getDocs(collection(db, 'eventos'));
                const lista = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEventos(lista);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            } finally {
                setLoading(false);
            }
        }

        buscarEventos();
    }, []);

    const abrirModalEdicao = (evento) => {
        setEventoEditando({ ...evento });
        setImagemFile(null); // limpa o arquivo selecionado ao abrir o modal
    };

    const fecharModal = () => {
        setEventoEditando(null);
        setImagemFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventoEditando(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagemFile(e.target.files[0]);
        }
    };

    const salvarEdicao = async () => {
        try {
            let imagemUrlAtualizada = eventoEditando.imagemUrl;

            if (imagemFile) {
                // Upload da nova imagem
                const imageRef = ref(storage, `eventos/${eventoEditando.id}/${imagemFile.name}`);
                await uploadBytes(imageRef, imagemFile);
                imagemUrlAtualizada = await getDownloadURL(imageRef);
            }

            const eventoRef = doc(db, 'eventos', eventoEditando.id);
            await updateDoc(eventoRef, {
                titulo: eventoEditando.titulo,
                data: eventoEditando.data,
                imagemUrl: imagemUrlAtualizada,
            });

            setEventos(prev =>
                prev.map(e => (e.id === eventoEditando.id ? { ...eventoEditando, imagemUrl: imagemUrlAtualizada } : e))
            );

            fecharModal();
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
        }
    };

    const excluirEvento = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;

        try {
            await deleteDoc(doc(db, 'eventos', id));
            setEventos(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
        }
    };

    if (loading) return <p>Carregando eventos...</p>;

    return (
        <div>
            {eventos.length === 0 ? (
                <p>Nenhum evento encontrado.</p>
            ) : (
                <ul className="eventos-list">
                    {eventos.map((evento) => (
                        <li key={evento.id} className="evento-item">
                            <p><strong>Título:</strong> {evento.titulo}</p>
                            <p><strong>Data:</strong> {evento.data}</p>
                            {evento.imagemUrl && (
                                <img
                                    src={evento.imagemUrl}
                                    alt={evento.titulo}
                                    style={{ width: '200px', borderRadius: '8px', marginTop: '0.5rem' }}
                                />
                            )}
                            <button onClick={() => abrirModalEdicao(evento)}>Editar</button>
                            <button
                                onClick={() => excluirEvento(evento.id)}
                                style={{ marginLeft: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal de edição simplificado */}
            {eventoEditando && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{ maxWidth: '400px', width: '90%', background: 'white', padding: '1rem', borderRadius: '8px' }}>
                        <h3>Editar Evento</h3>
                        <div>
                            <label>Título:</label>
                            <input name="titulo" value={eventoEditando.titulo} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Data:</label>
                            <input name="data" value={eventoEditando.data} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Imagem:</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {eventoEditando.imagemUrl && !imagemFile && (
                                <img
                                    src={eventoEditando.imagemUrl}
                                    alt="Imagem atual"
                                    style={{ width: '200px', borderRadius: '8px', marginTop: '0.5rem' }}
                                />
                            )}
                            {imagemFile && <p>Arquivo selecionado: {imagemFile.name}</p>}
                        </div>
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                            <button onClick={salvarEdicao}>Salvar</button>
                            <button onClick={fecharModal} style={{ marginLeft: '10px' }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}
