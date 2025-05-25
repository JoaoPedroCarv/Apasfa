import React from 'react';
import EventosAdmin from './eventos';
import AnimaisAdmin from './animais';
import '../admin.css';

const Editar = () => {
    return (
        <div className="admin-dashboard-container" style={{ justifyContent: 'center' }}>
            <main className="admin-main-content" style={{ maxWidth: 1100, width: '100%' }}>
                <h2 style={{
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '2rem',
                    marginBottom: '2.5rem',
                    textAlign: 'center',
                    letterSpacing: '1px'
                }}>
                    Editar Informações
                </h2>

                <div className="admin-cards-wrapper">
                    <section className="admin-section-card">
                        <h3>Eventos</h3>
                        <EventosAdmin />
                    </section>

                    <section className="admin-section-card">
                        <h3>Animais</h3>
                        <AnimaisAdmin />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Editar;
