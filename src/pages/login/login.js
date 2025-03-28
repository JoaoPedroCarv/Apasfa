import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      await signIn(email, password);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            className="input-field"
          />
          <button type="submit" className="login-button">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>
        <Link to="/registrar" className="signup-link">Criar uma conta gratuitamente</Link>
      </div>
    </div>
  );
}

