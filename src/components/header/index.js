import { Link } from "react-router-dom";
import './headerStyle.css'

function Header() {
    return (
        <header>
            <h2>Consulta de países</h2>

            <div>
                <Link to="/">Início</Link>
                <Link to="/comentarios">Ver comentários</Link>
            </div>
        </header>
    )
}

export default Header;