import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './conta.css';

export default function CriarConta() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    <h1>Crie sua conta</h1>
                    <p>Comece sua jornada conosco</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="name">Nome completo</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="password-input">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo 6 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="toggle-password"
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
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