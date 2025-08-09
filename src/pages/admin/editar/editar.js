

import React from 'react';
import EventosAdmin from './eventos';
import AnimaisAdmin from './animais';
import EditarEstatisticas from './editarEstatisticas';
import '../admin.css'; 

const Editar = () => {
    return (
        <div className="admin-dashboard-container">
            <main className="admin-main-content">
                <h2>
                    Editar Informações
                </h2>

                <section className="admin-section-card">
                    <h3>Estatísticas da Página Inicial</h3>
                    <EditarEstatisticas />
                </section>

                {/* Seção de Eventos */}
                <section className="admin-section-card">
                    <h3>Gerenciar Eventos</h3>
                    <EventosAdmin />
                </section>

                {/* Seção de Animais */}
                <section className="admin-section-card">
                    <h3>Gerenciar Animais</h3>
                    <AnimaisAdmin />
                </section>
            </main>
        </div>
    );
};

export default Editar;