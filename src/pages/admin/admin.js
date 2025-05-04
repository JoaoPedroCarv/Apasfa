import React from 'react';
import './admin.css';
import { Link } from 'react-router-dom';

const admin = () => {
    return (
        <div className="pagina-container">
            <div className="opcao-container">
                <h2>
                    <Link to="/cadastroAnimal">Cadastrar animais para adoção</Link>
                </h2>
            </div>
            <div className="opcao-container">
                <h2>
                    <Link to="/solicitacoes">Ver solicitações de adoção</Link>
                </h2>
            </div>
        </div>
    );
}

export default admin;
