import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../services/firebaseConnection';
import '../admin.css';

const storage = getStorage();

export default function EditarAnimais() {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animalEditando, setAnimalEditando] = useState(null);
    const [fotoFile, setFotoFile] = useState(null);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function buscarAnimais() {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'animais'));
                const lista = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAnimais(lista);
            } catch (error) {
                console.error('Erro ao buscar animais:', error);
                alert('Erro ao carregar os animais.');
            } finally {
                setLoading(false);
            }
        }

        buscarAnimais();
    }, []);

    function abrirModalEdicao(animal) {
        setAnimalEditando({ ...animal });
        setFotoFile(null);
    }

    function fecharModal() {
        setAnimalEditando(null);
        setFotoFile(null);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setAnimalEditando(prev => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFotoFile(e.target.files[0]);
        }
    }

    async function salvarEdicao() {
        if (!animalEditando.nome || !animalEditando.descricao) {
            alert('Por favor, preencha nome e descrição.');
            return;
        }

        setSalvando(true);
        try {
            let fotoUrlAtualizada = animalEditando.fotoUrl;

            if (fotoFile) {
                const fotoRef = ref(storage, `animais/${animalEditando.id}/${fotoFile.name}`);
                await uploadBytes(fotoRef, fotoFile);
                fotoUrlAtualizada = await getDownloadURL(fotoRef);
            }

            const animalRef = doc(db, 'animais', animalEditando.id);
            await updateDoc(animalRef, {
                nome: animalEditando.nome,
                descricao: animalEditando.descricao,
                idade: animalEditando.idade,
                raca: animalEditando.raca,
                sexo: animalEditando.sexo,
                fotoUrl: fotoUrlAtualizada,
            });

            setAnimais(prev =>
                prev.map(a => (a.id === animalEditando.id ? { ...animalEditando, fotoUrl: fotoUrlAtualizada } : a))
            );

            fecharModal();
        } catch (error) {
            console.error('Erro ao atualizar animal:', error);
            alert('Erro ao salvar as alterações. Tente novamente.');
        } finally {
            setSalvando(false);
        }
    }

    async function excluirAnimal(id) {
        if (!window.confirm('Tem certeza que deseja excluir este animal?')) return;

        try {
            await deleteDoc(doc(db, 'animais', id));
            setAnimais(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error('Erro ao excluir animal:', error);
            alert('Erro ao excluir o animal.');
        }
    }

    if (loading) return <p>Carregando animais...</p>;

    return (
        <div>
            {animais.length === 0 ? (
                <p>Nenhum animal encontrado.</p>
            ) : (
                <ul className="edit-list"> {/* CLASSE ATUALIZADA */}
                    {animais.map(animal => (
                        <li key={animal.id} className="edit-item"> {/* CLASSE ATUALIZADA */}
                             <div className="edit-item-content">
                                {animal.fotoUrl && (
                                    <img src={animal.fotoUrl} alt={animal.nome} className="edit-item-image" />
                                )}
                                <p><strong>Nome:</strong> {animal.nome}</p>
                                <p><strong>Idade:</strong> {animal.idade} anos</p>
                                <p><strong>Raça:</strong> {animal.raca}</p>
                                <p><strong>Sexo:</strong> {animal.sexo}</p>
                                <p><strong>Descrição:</strong> {animal.descricao}</p>
                            </div>
                            <div className="edit-item-actions">
                                <button className="btn-edit" onClick={() => abrirModalEdicao(animal)}>Editar</button>
                                <button className="btn-delete" onClick={() => excluirAnimal(animal.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {animalEditando && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editar Animal</h3>
                        <div>
                            <label>Nome:</label>
                            <input name="nome" value={animalEditando.nome} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Descrição:</label>
                            <textarea name="descricao" value={animalEditando.descricao} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Idade:</label>
                            <input type="number" name="idade" value={animalEditando.idade} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Raça:</label>
                            <input name="raca" value={animalEditando.raca} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Sexo:</label>
                            <input name="sexo" value={animalEditando.sexo} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Foto:</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {animalEditando.fotoUrl && !fotoFile && (
                                <img src={animalEditando.fotoUrl} alt="Foto atual" className="modal-foto-preview" />
                            )}
                        </div>

                        <div className="modal-buttons">
                            <button className="btn-brown" disabled={salvando} onClick={salvarEdicao}>
                                {salvando ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button className="btn-light" onClick={fecharModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
