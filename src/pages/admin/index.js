import { useState } from 'react';
import './admin.css';

export default function PainelAdmin() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [sexo, setSexo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState(null);
    const [error, setError] = useState('');
    const [solicitacoes, setSolicitacoes] = useState([
        { id: 1, usuario: 'joao@email.com', animal: 'Luna', mensagem: 'Gostaria de adotar a Luna!' },
        { id: 2, usuario: 'maria@email.com', animal: 'Rex', mensagem: 'Tenho interesse no Rex.' },
        { id: 3, usuario: 'maria@email.com', animal: 'Rex', mensagem: 'Tenho interesse no Rex.' },
        { id: 4, usuario: 'maria@email.com', animal: 'Rex', mensagem: 'Tenho interesse no Rex.' },
    ]);

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!nome || !idade || !tipo || !raca || !sexo || !foto) {
            return setError('Preencha todos os campos obrigatórios!');
        }

        // Simulação de cadastro
        alert('Animal cadastrado com sucesso!');
        setNome('');
        setIdade('');
        setTipo('');
        setRaca('');
        setSexo('');
        setDescricao('');
        setFoto(null);
    }

    function responderEmail(email) {
        alert(`Abrir modal ou função para responder ${email}`);
    }

    return (
        <div className="admin-container">
            {/* Lado Esquerdo: Cadastro de Animal */}
            <div className="form-box">
                <h1>Cadastro de Animal</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="input-group">
                        <label>Nome do Animal</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Idade</label>
                        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Tipo</label>
                        <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Raça</label>
                        <input type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Sexo</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="sexo"
                                    value="Macho"
                                    checked={sexo === 'Macho'}
                                    onChange={(e) => setSexo(e.target.value)}
                                /> Macho
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sexo"
                                    value="Fêmea"
                                    checked={sexo === 'Fêmea'}
                                    onChange={(e) => setSexo(e.target.value)}
                                /> Fêmea
                            </label>
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

            {/* Lado Direito: Painel de Solicitações */}
            <div className="dashboard-box">
                <h2>Solicitações de Adoção</h2>
                {solicitacoes.length === 0 ? (
                    <p>Nenhuma solicitação no momento.</p>
                ) : (
                    <ul className="sollicitacoes-list">
                        {solicitacoes.map((s) => (
                            <li key={s.id} className="sollicitacao-item">
                                <p><strong>Usuário:</strong> {s.usuario}</p>
                                <p><strong>Animal:</strong> {s.animal}</p>
                                <p><strong>Mensagem:</strong> {s.mensagem}</p>
                                <button onClick={() => responderEmail(s.usuario)}>Responder por Email</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
