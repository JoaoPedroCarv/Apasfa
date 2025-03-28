import { Link } from "react-router-dom";
import './headerStyle.css';
import logo from '../../assets/imagens/Logo apasfa sem fundo 2.png';

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <nav className="nav-links">
                <Link to="/">Início</Link>
                <Link to="/logar">Login</Link>
                <Link to="/registrar">Registrar</Link>
                <Link to="/comentarios">Ver comentários</Link>
            </nav>
            <div className="espaco-vazio"></div>
        </header>
    );
}

export default Header;
