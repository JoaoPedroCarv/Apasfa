import { useState } from 'react';
import { Link } from 'react-router-dom';
import './doacao.css';

export default function Doacao() {
  const [donationType, setDonationType] = useState('dinheiro');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar a doação
    alert(`Obrigado por sua doação, ${name}! Sua contribuição é muito importante para nós.`);
    // Limpar formulário
    setAmount('');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="donation-container">
      <div className="donation-card">
        <div className="donation-header">
          <h1>Faça uma doação</h1>
          <p>Sua contribuição faz a diferença!</p>
        </div>

        <div className="donation-tabs">
          <button 
            className={`tab-button ${donationType === 'dinheiro' ? 'active' : ''}`}
            onClick={() => setDonationType('dinheiro')}
          >
            Doação em Dinheiro
          </button>
          <button 
            className={`tab-button ${donationType === 'material' ? 'active' : ''}`}
            onClick={() => setDonationType('material')}
          >
            Doação de Materiais
          </button>
        </div>

        {donationType === 'dinheiro' ? (
          <form onSubmit={handleSubmit} className="donation-form">
            <div className="input-group">
              <label>Valor da Doação (R$)</label>
              <input
                type="number"
                placeholder="50,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Seu Nome</label>
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Seu E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="payment-methods">
              <h3>Métodos de Pagamento</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Cartão de Crédito</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Pix</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Boleto Bancário</span>
                </label>
              </div>
            </div>

            <button type="submit" className="donate-button">
              Realizar Doação
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="donation-form">
            <div className="input-group">
              <label>Itens para Doação</label>
              <textarea
                placeholder="Descreva os itens que deseja doar (roupas, alimentos, móveis, etc.)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Seu Nome</label>
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Seu E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Telefone para Contato</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
              />
            </div>

            <button type="submit" className="donate-button">
              Enviar Solicitação de Doação
            </button>
          </form>
        )}

        <div className="back-link">
          <Link to="/">← Voltar para a página inicial</Link>
        </div>
      </div>
    </div>
  );
}
