import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './headerStyle.css';
import logo from '../../assets/imagens/Logo apasfa sem fundo 2.png';

function Header() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Verificar dados do usuário
    useEffect(() => {
        const userInfo = localStorage.getItem("usuario");
        setUserData(userInfo ? JSON.parse(userInfo) : null);
    }, [location]);

    const isAdmin = userData?.admin === true;
    const isLoggedIn = userData !== null;

    const toggleMenu = () => setMenuAberto(!menuAberto);
    const closeMenu = () => setMenuAberto(false);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUserData(null);
        closeMenu();
        navigate("/");
    };

    // Verificar se link está ativo
    const isActiveLink = (path) => location.pathname === path;

    return (
        <>
            <header className="header">
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menu">
                    <span className={`hamburger ${menuAberto ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <div className="logo-container">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt="APASFA - Associação Protetora dos Animais" className="logo" />
                    </Link>
                </div>

                <div className="header-user-info">
                    {isLoggedIn ? (
                        <span className="user-welcome">
                            Olá, <strong>{userData.nome}</strong>
                            {isAdmin && <span className="admin-badge">Admin</span>}
                        </span>
                    ) : (
                        <Link to="/logar" className="login-button">
                            Entrar
                        </Link>
                    )}
                </div>
            </header>

            {/* Overlay para fechar menu */}
            {menuAberto && <div className="sidebar-overlay" onClick={closeMenu}></div>}

            {/* Sidebar Menu */}
            <nav className={`sidebar ${menuAberto ? 'ativo' : ''}`}>
                <div className="sidebar-header">
                    <img src={logo} alt="APASFA" className="sidebar-logo" />
                    <button className="close-button" onClick={closeMenu} aria-label="Fechar menu">
                        ✕
                    </button>
                </div>

                <div className="menu-content">
                    {/* Informações do usuário no menu */}
                    {isLoggedIn && (
                        <div className="user-info-menu">
                            <div className="user-avatar">
                                {userData.nome.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{userData.nome}</span>
                                <span className="user-email">{userData.email}</span>
                                {isAdmin && <span className="admin-label">Administrador</span>}
                            </div>
                        </div>
                    )}

                    {/* Links de navegação */}
                    <div className="menu-links">
                        <Link 
                            to="/" 
                            className={isActiveLink("/") ? "active" : ""} 
                            onClick={closeMenu}
                        >
                            <span className="link-icon">🏠</span>
                            Início
                        </Link>

                        <Link 
                            to="/adocao" 
                            className={isActiveLink("/adocao") ? "active" : ""} 
                            onClick={closeMenu}
                        >
                            <span className="link-icon">🐾</span>
                            Adoção
                        </Link>

                        {!isLoggedIn ? (
                            <>
                                <Link 
                                    to="/logar" 
                                    className={isActiveLink("/logar") ? "active" : ""} 
                                    onClick={closeMenu}
                                >
                                    <span className="link-icon">🔑</span>
                                    Login
                                </Link>
                                <Link 
                                    to="/registrar" 
                                    className={isActiveLink("/registrar") ? "active" : ""} 
                                    onClick={closeMenu}
                                >
                                    <span className="link-icon">📝</span>
                                    Registrar
                                </Link>
                            </>
                        ) : (
                            <>
                                {isAdmin && (
                                    <>
                                        <Link 
                                            to="/admin" 
                                            className={isActiveLink("/admin") ? "active" : ""} 
                                            onClick={closeMenu}
                                        >
                                            <span className="link-icon">⚙️</span>
                                            Painel Admin
                                        </Link>
                                        <Link 
                                            to="/eventosAdmin" 
                                            className={isActiveLink("/eventosAdmin") ? "active" : ""} 
                                            onClick={closeMenu}
                                        >
                                            <span className="link-icon">🗂️</span>
                                            Gerenciar Conteúdo
                                        </Link>
                                    </>
                                )}
                                <button className="logout-button" onClick={handleLogout}>
                                    <span className="link-icon">🚪</span>
                                    Sair
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
