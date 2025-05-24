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
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>

            <nav className={`sidebar ${menuAberto ? 'ativo' : ''}`}>
    <button className="fechar-menu" onClick={toggleMenu}>×</button><Link to="/" onClick={toggleMenu}>Início</Link>
    <Link to="/logar" onClick={toggleMenu}>Login</Link>
    <Link to="/registrar" onClick={toggleMenu}>Registrar</Link>
    {isAdmin && <Link to="/admin" onClick={toggleMenu}>Ver admin</Link>}
</nav>


            <div className="espaco-vazio"></div>
        </header>
    );
}

export default Header;
