import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';
import './eventos.css';

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
                // Converter nova imagem para Base64
                imagemUrlAtualizada = await convertToBase64(imagemFile);
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

    // Função para converter arquivo para Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
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

    if (loading) return <div className="eventos-admin-container"><p>Carregando eventos...</p></div>;

    return (
        <div className="eventos-admin-container">
            <h3>Gerenciar Eventos</h3>
            
            {eventos.length === 0 ? (
                <p>Nenhum evento encontrado.</p>
            ) : (
                <ul className="edit-list">
                    {eventos.map((evento) => (
                        <li key={evento.id} className="edit-item">
                            <div className="edit-item-content">
                                <img
                                    src={evento.imagemUrl && (evento.imagemUrl.startsWith('http') || evento.imagemUrl.startsWith('data:')) ? evento.imagemUrl : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'}
                                    alt={evento.titulo}
                                    className="edit-item-image"
                                    onError={e => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'; }}
                                />
                                <div>
                                    <p><strong>Título:</strong> {evento.titulo}</p>
                                    <p><strong>Data:</strong> {new Date(evento.data).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                            <div className="edit-item-actions">
                                <button className="btn-edit" onClick={() => abrirModalEdicao(evento)}>
                                    ✏️ Editar
                                </button>
                                <button className="btn-delete" onClick={() => excluirEvento(evento.id)}>
                                    🗑️ Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal de edição usando Portal */}
            {eventoEditando && createPortal(
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>✏️ Editar Evento</h3>
                        
                        <div>
                            <label htmlFor="titulo">Título:</label>
                            <input 
                                id="titulo"
                                type="text"
                                name="titulo" 
                                value={eventoEditando.titulo} 
                                onChange={handleInputChange} 
                                placeholder="Digite o título do evento"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="data">Data:</label>
                            <input 
                                id="data"
                                type="date" 
                                name="data" 
                                value={eventoEditando.data} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="imagem">Nova Imagem (opcional):</label>
                            <input 
                                id="imagem"
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                            {eventoEditando.imagemUrl && !imagemFile && (
                                <img
                                    src={eventoEditando.imagemUrl && (eventoEditando.imagemUrl.startsWith('http') || eventoEditando.imagemUrl.startsWith('data:')) ? eventoEditando.imagemUrl : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'}
                                    alt="Imagem atual"
                                    className="modal-foto-preview"
                                    onError={e => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'; }}
                                />
                            )}
                        </div>
                        
                        <div className="modal-buttons">
                            <button className="btn-brown" onClick={salvarEdicao}>
                                ✅ Salvar Alterações
                            </button>
                            <button className="btn-light" onClick={fecharModal}>
                                ❌ Cancelar
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
