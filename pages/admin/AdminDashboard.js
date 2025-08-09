import React from 'react';
import SolicitacoesAdocao from './solicitacoes';
import CadastroAnimal from './cadastroAnimal';
import CadastrarEvento from './cadastrarEvento';
import './admin.css';

// Imagens placeholder (URLs públicas)
const animalPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFuaW1hbDwvdGV4dD48L3N2Zz4=";
const eventoPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50bzwvdGV4dD48L3N2Zz4=";
const solicitacaoPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNvbGljaXRhw6fDo288L3RleHQ+PC9zdmc+";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container" style={{ justifyContent: 'center' }}>
      <main className="admin-main-content" style={{ maxWidth: '100%', width: '100%' }}>
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
