import React from 'react';
import './inicio.css';

function Inicio() {
  // Dados para histórias de resgate
  const historiasResgate = [
    {
      nome: "Luna",
      descricao: "Resgatada com fome e frio, hoje vive feliz em um novo lar.",
    },
    {
      nome: "Bidu",
      descricao: "Machucado na rua, recebeu cuidados e muito amor.",
    },
    {
      nome: "Mimi",
      descricao: "Sobreviveu a maus-tratos e agora está saudável e brincalhona.",
    },
  ];

  const compromissos = [
    {
      titulo: "Missão",
      texto:
        "• Manter o abrigo dentro da capacidade.\n" +
        "• Socorrer animais agonizantes.\n" +
        "• Apoiar famílias carentes com seus animais.\n" +
        "• Promover a castração para evitar a superpopulação.\n" +
        "• Reabilitar física e emocionalmente os animais resgatados.\n",
    },
    {
      titulo: "Visão",
      texto:
        "• Conscientizar e auxiliar no controle da espécie.\n" +
        "• Participar de políticas públicas.\n" +
        "• Educação em posse responsável.\n" +
        "• Ser referência regional em proteção e bem-estar animal.\n" +
        "• Criar programas de voluntariado e engajamento comunitário.\n" +
        "• Desenvolver campanhas contínuas de adoção e castração.",
    },
    {
      titulo: "Valores",
      texto:
        "• Fiscalizar crueldade animal.\n" +
        "• Promover adoção.\n" +
        "• Difundir leis de proteção animal.\n" +
        "• Transparência e ética na gestão da ONG.\n" +
        "• Respeito à vida em todas as suas formas.\n" +
        "• Comprometimento com o bem-estar animal e social.",
    },
  ];

  return (
    <div className="container">

      <main>
        <section className="carrossel-section">
          <div className="carrossel-wrapper">
            <div className="carrossel-slide">
              <img
                src="/colocar"
                alt="Slide 1"
                className="carrossel-img"
              />
            </div>
          </div>
          <div className="carrossel-controls">
            <button className="carrossel-arrow prev">←</button>
            <div className="carrossel-dots">
              <span className="carrossel-dot active"></span>
              <span className="carrossel-dot"></span>
              <span className="carrossel-dot"></span>
              <span className="carrossel-dot"></span>
            </div>
            <button className="carrossel-arrow next">→</button>
          </div>
        </section>

        <section className="info-rapida">
          <div className="info-card">
            <h3>Animais Encontrados</h3>
            <p>123</p>
          </div>
          <div className="info-card">
            <h3>Animais Castrados</h3>
            <p>56</p>
          </div>
          <div className="info-card">
            <h3>Animais Recuperados</h3>
            <p>78</p>
          </div>
        </section>

        <section id="sobre" className="section">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Quem Somos</h2>
              <p className="section-description">
                A APASFA (Associação Protetora dos Animais São Francisco de Assis) em Prudentópolis é uma organização
                sem fins lucrativos que visa proteger e promover o bem-estar dos animais.
              </p>
            </div>
            <div className="flip-card-container">
              {compromissos.map((item, idx) => (
                <div className="flip-card" key={idx}>
                  <h3>{item.titulo}</h3>
                  <div className="flip-card-inner">
                    <div className="flip-card-front"></div>
                    <div className="flip-card-back">
                      {item.texto.split("\n").map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-light-blue">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Histórias de Resgate</h2>
              <p className="section-description">
                Conheça algumas das histórias de animais que resgatamos e transformamos suas vidas.
              </p>
            </div>
            <div className="historias-container">
              {historiasResgate.map((historia, index) => (
                <div key={index} className="historia-card">
                  <div className="historia-img">
                    <img
                      src={`colocar=${historia.nome}`}
                      alt={`Foto de ${historia.nome}`}
                    />
                  </div>
                  <div className="historia-texto">
                    <h3>{historia.nome}</h3>
                    <p>{historia.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="adocao" className="section section-light-orange">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Adote um Amigo</h2>
              <p className="section-description">
                Conheça alguns dos nossos animais que estão à espera de um lar amoroso. Todos são vacinados, castrados e
                acompanhados por nossa equipe.
              </p>
            </div>
            <div className="pets-grid">
              {[1, 2, 3, 4, 5, 6].map((pet) => (
                <div key={pet} className="pet-card">
                  <div className="pet-image">
                    <img
                      src={`colocar${pet}`}
                      alt={`Animal para adoção ${pet}`}
                    />
                  </div>
                  <div className="pet-info">
                    <h3 className="pet-name">Nome do Animal {pet}</h3>
                    <p className="pet-details">
                      {pet % 2 === 0 ? "Cachorro" : "Gato"} • {pet + 1} anos • {pet % 2 === 0 ? "Macho" : "Fêmea"}
                    </p>
                    <button className="btn btn-outline btn-full">Saiba Mais</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="center-button">
              <button className="btn btn-brown">Ver Todos os Animais</button>
            </div>
          </div>
        </section>


        <section id="como-ajudar" className="section">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Como Você Pode Ajudar</h2>
              <p className="section-description">
                Existem várias maneiras de contribuir com nossa causa e fazer a diferença na vida dos animais.
              </p>
            </div>
            <div className="help-grid">
              <div className="help-card card-blue">
                <h3 className="help-title">Faça uma Doação</h3>
                <p className="help-description">
                  Sua contribuição financeira ajuda a custear tratamentos veterinários, alimentação, medicamentos e
                  manutenção do nosso abrigo.
                </p>
                <div className="bank-info">
                  <p className="bank-title">Dados Bancários:</p>
                  <p className="bank-detail">Banco: Exemplo</p>
                  <p className="bank-detail">Agência: 0000</p>
                  <p className="bank-detail">Conta: 00000-0</p>
                  <p className="bank-detail">PIX: exemplo@apasfa.org.br</p>
                </div>
                <button className="btn btn-primary">Doar Agora</button>
              </div>
              <div className="help-options">
                <div className="help-option card-orange">
                  <h3 className="help-title">Seja Voluntário</h3>
                  <p className="help-description">
                    Doe seu tempo e habilidades. Precisamos de ajuda com passeios, limpeza, eventos de adoção e
                    divulgação nas redes sociais.
                  </p>
                  <button className="btn btn-outline">Saiba Mais</button>
                </div>
                <div className="help-option card-blue">
                  <h3 className="help-title">Doe Suprimentos</h3>
                  <p className="help-description">
                    Aceitamos doações de ração, medicamentos, produtos de limpeza, cobertores, caminhas e brinquedos.
                  </p>
                  <button className="btn btn-outline">Ver Lista de Necessidades</button>
                </div>
                <div className="help-option card-orange">
                  <h3 className="help-title">Apadrinhe um Animal</h3>
                  <p className="help-description">
                    Contribua mensalmente para o cuidado de um animal específico enquanto ele aguarda por adoção.
                  </p>
                  <button className="btn btn-outline">Apadrinhar</button>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="section section-light-blue">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Nossos Colaboradores</h2>
              <p className="section-description">
                Conheça as pessoas que dedicam seu tempo e esforço para fazer a diferença na vida dos animais.
              </p>
            </div>
            <div className="colaboradores-grid">
              {["João Silva", "Maria Oliveira", "Carlos Souza"].map((nome, idx) => (
                <div key={idx} className="colaborador-card">
                  <div className="colaborador-img">
                    <img
                      src="colocar"
                      alt={`Foto de ${nome}`}
                    />
                  </div>
                  <h4 className="colaborador-nome">{nome}</h4>
                  <p className="colaborador-info">Membro desde: {["Janeiro 2020", "Março 2019", "Julho 2021"][idx]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="section">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Próximos Eventos</h2>
              <p className="section-description">Fique por dentro dos nossos eventos e participe das nossas ações.</p>
            </div>
            <div className="evento-card">
              <div className="evento-img">
                <img
                  src="colocar"
                  alt="Imagem do evento"
                />
              </div>
              <div className="evento-info">
                <h3 className="evento-titulo">Feira de Adoção</h3>
                <p className="evento-data">
                  <strong>Data:</strong> 15/06/2025
                </p>
                <p className="evento-descricao">
                  Venha conhecer nossos animais disponíveis para adoção e encontre seu novo melhor amigo.
                </p>
                <button className="btn btn-primary">Saiba Mais</button>
              </div>
              <button className="pata-btn">🐾</button>
            </div>
          </div>
        </section>


        <section id="contato" className="section">
          <div className="section-content">
            <div className="contact-grid">
              <div className="contact-info">
                <h2 className="contact-title">Entre em Contato</h2>
                <p className="contact-description">
                  Estamos à disposição para esclarecer dúvidas, receber sugestões ou conversar sobre como você pode
                  ajudar.
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <svg
                      className="contact-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>(00) 0000-0000</span>
                  </div>
                  <div className="contact-item">
                    <svg
                      className="contact-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>contato@apasfa.org.br</span>
                  </div>
                  <div className="contact-item">
                    <svg
                      className="contact-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Rua Exemplo, 123 - Prudentópolis, PR</span>
                  </div>
                </div>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="visually-hidden">Instagram</span>
                  </a>
                  <a href="#" className="social-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="visually-hidden">Facebook</span>
                  </a>
                </div>
              </div>
              <div className="contact-form-container">
                <form className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input id="name" className="form-input" placeholder="Seu nome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input id="email" type="email" className="form-input" placeholder="seu.email@exemplo.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Assunto
                    </label>
                    <input id="subject" className="form-input" placeholder="Assunto da mensagem" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Mensagem
                    </label>
                    <textarea id="message" className="form-textarea" placeholder="Digite sua mensagem aqui..." />
                  </div>
                  <button className="btn btn-primary btn-full">Enviar Mensagem</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}

export default Inicio;