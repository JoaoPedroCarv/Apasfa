import React from 'react';
import SolicitacoesAdocao from './solicitacoes';
import CadastroAnimal from './cadastroAnimal';
import CadastrarEvento from './cadastrarEvento';
import './admin.css';

// Imagens placeholder (URLs públicas)
const animalPlaceholder = "https://via.placeholder.com/120?text=Animal";
const eventoPlaceholder = "https://via.placeholder.com/120?text=Evento";
const solicitacaoPlaceholder = "https://via.placeholder.com/120?text=Solicitação";

function AdminDashboard() {
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
          Painel Administrativo
        </h2>
        <div className="admin-cards-wrapper">
          <section className="admin-section-card">
            <img
              src={solicitacaoPlaceholder}
              alt="Solicitações de Adoção"
              style={{ width: '100%', maxWidth: 120, margin: '0 auto 1.5rem', display: 'block' }}
            />
            <h3>Solicitações de Adoção</h3>
            <SolicitacoesAdocao />
          </section>
          <section className="admin-section-card">
            <img
              src={animalPlaceholder}
              alt="Cadastrar Animal"
              style={{ width: '100%', maxWidth: 120, margin: '0 auto 1.5rem', display: 'block' }}
            />
            <h3>Cadastrar Animal para Adoção</h3>
            <CadastroAnimal />
          </section>
          <section className="admin-section-card">
            <img
              src={eventoPlaceholder}
              alt="Cadastrar Evento"
              style={{ width: '100%', maxWidth: 120, margin: '0 auto 1.5rem', display: 'block' }}
            />
            <h3>Cadastrar Evento</h3>
            <CadastrarEvento />
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
