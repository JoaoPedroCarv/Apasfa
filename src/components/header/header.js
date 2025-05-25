import { useState } from "react";
import { Link } from "react-router-dom";
import './headerStyle.css';
import logo from '../../assets/imagens/Logo apasfa sem fundo 2.png';

function Header() {
    const [menuAberto, setMenuAberto] = useState(false);
    const userData = localStorage.getItem("usuario");
    const user = userData ? JSON.parse(userData) : null;
    const isAdmin = user?.admin === true;

    const toggleMenu = () => setMenuAberto(!menuAberto);

    return (
        <header className="header">


            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>

            <nav className={`sidebar ${menuAberto ? 'ativo' : ''}`}>
                <div className="menu-espaco">
                    <Link to="/" onClick={toggleMenu}>Início</Link>
                    <Link to="/logar" onClick={toggleMenu}>Login</Link>
                    <Link to="/registrar" onClick={toggleMenu}>Registrar</Link>
                    {isAdmin && <Link to="/admin" onClick={toggleMenu}>Ver admin</Link>}
                    {isAdmin && <Link to="/eventosAdmin" onClick={toggleMenu}>Editar eventos/animais</Link>}
                </div>
            </nav>

            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="espaco-vazio"></div>

        </header>
    );
}

export default Header;
