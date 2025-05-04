import './admin.css';

export default function SolicitacoesAdocao() {
    const solicitacoes = [
        { id: 1, usuario: 'joao@email.com', animal: 'Luna', mensagem: 'Gostaria de adotar a Luna!' },
        { id: 2, usuario: 'maria@email.com', animal: 'Rex', mensagem: 'Tenho interesse no Rex.' },
    ];

    function responderEmail(email) {
        alert(`Abrir modal ou função para responder ${email}`);
    }

    return (
        <div className="admin-container">
            <div className="dashboard-box">
                <h2>Solicitações de Adoção</h2>
                {solicitacoes.length === 0 ? (
                    <p>Nenhuma solicitação no momento.</p>
                ) : (
                    <ul className="sollicitacoes-list">
                        {solicitacoes.map((s) => (
                            <li key={s.id} className="sollicitacao-item">
                                <p><strong>Usuário:</strong> {s.usuario}</p>
                                <p><strong>Animal:</strong> {s.animal}</p>
                                <p><strong>Mensagem:</strong> {s.mensagem}</p>
                                <button onClick={() => responderEmail(s.usuario)}>Responder por Email</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
