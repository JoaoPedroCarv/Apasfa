import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './admin.css';

export default function CriarConta() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [opcao, setOpcao] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        // Validações
        if (!name || !email || !password || !confirmPassword) {
            return setError('Preencha todos os campos!');
        }

        if (password !== confirmPassword) {
            return setError('As senhas não coincidem!');
        }

        if (password.length < 6) {
            return setError('A senha deve ter no mínimo 6 caracteres.');
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return setError('Digite um e-mail válido.');
        }

        try {
            await signUp(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            setError('Erro ao cadastrar. Tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h1>Adicone um novo animal</h1>
                    <p>Preencha as informações</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="name">Nome do Animal</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Digite o nome do animal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Selecione o sexo</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label className="l-radio">
                                <input
                                    type="radio"
                                    name="opcao"
                                    value="opcao1"
                                    checked={opcao === 'opcao1'}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                <span style={{ paddingLeft: '6px' }}>Opção 1</span>
                            </label>

                            <label className="l-radio">
                                <input
                                    type="radio"
                                    name="opcao"
                                    value="opcao2"
                                    checked={opcao === 'opcao2'}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                <span style={{ paddingLeft: '6px' }}>Opção 2</span>
                            </label>
                        </div>
                    </div>


                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirme sua senha</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Digite novamente sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loadingAuth}
                        className={`submit-button ${loadingAuth ? 'loading' : ''}`}
                    >
                        {loadingAuth ? (
                            <>
                                <span className="spinner"></span>
                                Cadastrando...
                            </>
                        ) : 'Criar conta'}
                    </button>
                </form>

                <div className="login-redirect">
                    Já tem uma conta? <Link to="/logar">Faça login</Link>
                </div>
            </div>
        </div>
    );
}