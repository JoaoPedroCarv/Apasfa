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
            <div className="password-input" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                autoComplete="current-password"
                style={{
                  flex: 1,
                  paddingRight: '2.5rem',
                  // padding-right para o ícone não sobrepor o texto
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: '100%',
                  zIndex: 2
                }}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label="Mostrar/ocultar senha"
              >
                {showPassword ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#8d99ae" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3.5" stroke="#8d99ae" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94C16.11 19.24 14.13 20 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.06M9.53 9.53A3.5 3.5 0 0 1 12 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .47-.09.92-.26 1.33M1 1l22 22" stroke="#8d99ae" strokeWidth="2"/>
                  </svg>
                )}
              </span>
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