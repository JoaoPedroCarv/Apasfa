import { useState } from 'react';
import './admin.css';
import { db } from '../../services/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';

export default function CadastroAnimal() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const [raca, setRaca] = useState('');
    const [sexo, setSexo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState(null);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!nome || !idade || !raca || !sexo || !foto) {
            return setError('Preencha todos os campos obrigatórios!');
        }

        try {
            // Converter imagem para Base64
            const fotoUrl = await convertToBase64(foto);

            // Salvar dados no Firestore com imagem em Base64
            await addDoc(collection(db, "animais"), {
                nome,
                idade: parseInt(idade),
                raca,
                sexo,
                descricao,
                fotoUrl, // Agora é uma string Base64
                criadoEm: new Date()
            });

            alert('Animal cadastrado com sucesso!');

            // Resetar formulário
            setNome('');
            setIdade('');
            setRaca('');
            setSexo('');
            setDescricao('');
            setFoto(null);
            
            // Resetar o campo de arquivo
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
            
        } catch (err) {
            console.error("Erro ao cadastrar animal:", err);
            setError(`Erro ao cadastrar: ${err.message}`);
        }
    }

    // Função para converter arquivo para Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="admin-container centralizado">
            <div className="form-box">
                <h1>Cadastro de Animal</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nome do Animal</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Idade</label>
                        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label>Raça</label>
                        <input type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Sexo</label>
                        <div className="radio-group">
                            <label><input type="radio" name="sexo" value="Macho" checked={sexo === 'Macho'} onChange={(e) => setSexo(e.target.value)} /> Macho</label>
                            <label><input type="radio" name="sexo" value="Fêmea" checked={sexo === 'Fêmea'} onChange={(e) => setSexo(e.target.value)} /> Fêmea</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Descrição</label>
                        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Foto</label>
                        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
                    </div>
                    <button type="submit">Cadastrar Animal</button>
                </form>
            </div>
        </div>
    );
}
