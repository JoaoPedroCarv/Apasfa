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
                <ul className="edit-list"> {/* CLASSE ATUALIZADA */}
                    {eventos.map((evento) => (
                        <li key={evento.id} className="edit-item"> {/* CLASSE ATUALIZADA */}
                            <div className="edit-item-content">
                                {evento.imagemUrl && (
                                    <img src={evento.imagemUrl} alt={evento.titulo} className="edit-item-image" />
                                )}
                                <p><strong>Título:</strong> {evento.titulo}</p>
                                <p><strong>Data:</strong> {evento.data}</p>
                            </div>
                            <div className="edit-item-actions"> {/* CLASSE NOVA */}
                                <button className="btn-edit" onClick={() => abrirModalEdicao(evento)}>Editar</button>
                                <button className="btn-delete" onClick={() => excluirEvento(evento.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal de edição usando as classes do CSS */}
            {eventoEditando && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editar Evento</h3>
                        <div>
                            <label>Título:</label>
                            <input name="titulo" value={eventoEditando.titulo} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Data:</label>
                            <input type="date" name="data" value={eventoEditando.data} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Imagem:</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {eventoEditando.imagemUrl && !imagemFile && (
                                <img src={eventoEditando.imagemUrl} alt="Imagem atual" className="modal-foto-preview" />
                            )}
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-brown" onClick={salvarEdicao}>Salvar</button>
                            <button className="btn-light" onClick={fecharModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
