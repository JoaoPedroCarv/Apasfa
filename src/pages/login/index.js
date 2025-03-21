import { useState, useContext } from 'react'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import './login.css'


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      await signIn(email, password);
    }

  }


  return (
    <div className='tudo' >
      <div >
        <div >
        </div>
        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <Link to="/registrar">Criar uma conta gratuitamente</Link>

      </div>
    </div>
  )
}