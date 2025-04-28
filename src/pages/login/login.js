import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(e) {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      return setError('Preencha todos os campos!');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Digite um e-mail válido.');
    }

    try {
      await signIn(email, password);
    } catch (err) {
      setError('E-mail ou senha incorretos');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bem-vindo de volta</h1>
          <p>Faça login para continuar</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSignIn} className="login-form">
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
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

          <div className="forgot-password">
            <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loadingAuth}
          >
            {loadingAuth ? (
              <>
                <span className="spinner"></span>
                Carregando...
              </>
            ) : "Acessar"}
          </button>
        </form>

        <div className="signup-redirect">
          Não tem uma conta? <Link to="/registrar">Crie uma agora</Link>
        </div>
      </div>
    </div>
  );
}