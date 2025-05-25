import React, { useState, useEffect } from 'react';
import './inicio.css';
import { Link } from 'react-router-dom';
import pixQrCode from '../../assets/imagens/qrcode.png';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection"; // ajuste o caminho se necessário


// Imagens reais de pets e colaboradores (Unsplash e RandomUser)
const carrosselImagens = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
];

const historiaLuna = "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=600&q=80";
const historiaBidu = "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=600&q=80";
const historiaMimi = "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=600&q=80";

// const pet1 = "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80";
// const pet2 = "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80";
// const pet3 = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80";
// const pet4 = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80";
// const pet5 = "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80";
// const pet6 = "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80";

const colaborador1 = "https://randomuser.me/api/portraits/men/32.jpg";
const colaborador2 = "https://randomuser.me/api/portraits/women/44.jpg";
const colaborador3 = "https://randomuser.me/api/portraits/men/65.jpg";

// const eventoImg = "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80";

function Inicio() {
  // Carrossel funcional simples
  const [carrosselIndex, setCarrosselIndex] = useState(0);
  const nextSlide = () => setCarrosselIndex((carrosselIndex + 1) % carrosselImagens.length);
  const prevSlide = () => setCarrosselIndex((carrosselIndex - 1 + carrosselImagens.length) % carrosselImagens.length);

  const historiasResgate = [
    {
      nome: "Luna",
      descricao: "Resgatada com fome e frio, hoje vive feliz em um novo lar.",
      imagem: historiaLuna,
    },
    {
      nome: "Bidu",
      descricao: "Machucado na rua, recebeu cuidados e muito amor.",
      imagem: historiaBidu,
    },
    {
      nome: "Mimi",
      descricao: "Sobreviveu a maus-tratos e agora está saudável e brincalhona.",
      imagem: historiaMimi,
    },
  ];


  const [pets, setPets] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [eventoIndex, setEventoIndex] = useState(0);



  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "animais"));
        const petsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPets(petsData);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    };

    fetchPets();

    const fetchEventos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "eventos"));
        const eventosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEventos(eventosData);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);

      }
    };

    fetchEventos();




  }, []);

  const proximoEvento = () => {
    setEventoIndex((prev) => (prev + 1) % eventos.length);
  };


  const colaboradores = [
    { nome: "João Silva", membroDesde: "Janeiro 2020", imagem: colaborador1 },
    { nome: "Maria Oliveira", membroDesde: "Março 2019", imagem: colaborador2 },
    { nome: "Carlos Souza", membroDesde: "Julho 2021", imagem: colaborador3 },
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
        {/* Carrossel funcional */}
        <section className="carrossel-section">
          <div className="carrossel-wrapper">
            <div className="carrossel-slide">
              <img
                src={carrosselImagens[carrosselIndex]}
                alt={`Slide ${carrosselIndex + 1}`}
                className="carrossel-img"
              />
            </div>
          </div>
          <div className="carrossel-controls">
            <button className="carrossel-arrow prev" onClick={prevSlide}>🐾</button>
            <div className="carrossel-dots">
              {carrosselImagens.map((_, idx) => (
                <span
                  key={idx}
                  className={`carrossel-dot${carrosselIndex === idx ? " active" : ""}`}
                  onClick={() => setCarrosselIndex(idx)}
                ></span>
              ))}
            </div>
            <button className="carrossel-arrow next" onClick={nextSlide}>🐾</button>
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
                      src={historia.imagem}
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
              {pets.slice(0, 6).map((pet, idx) => (
                <div key={idx} className="pet-card">
                  <div className="pet-image">
                    <img
                      src={pet.fotoUrl || "https://via.placeholder.com/400x300?text=Sem+Imagem"}
                      alt={`Animal para adoção ${pet.nome}`}
                    />

                  </div>
                  <div className="pet-info">
                    <h3 className="pet-name">{pet.nome}</h3>
                    <p className="pet-details">
                      {pet.raca} • {pet.idade} anos • {pet.sexo}
                    </p>

                  </div>
                </div>
              ))}
            </div>
            <div className="center-button">
              <Link to="/adocao">
                <button className="btn btn-brown">Ver Todos os Animais</button>
              </Link>
            </div>

          </div>
        </section>

<section id="como-ajudar" className="section-ajuda">
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

        <a href="https://pagseguro.uol.com.br/checkout/v2/pre-approvals/nc/sender-identification.jhtml?t=b5fcc89f3048a0932b111aa41ae873aa&e=true#rmcl" target="_blank" rel="noopener noreferrer">
          <button className="btn btn-primary">Doar Agora</button>
        </a>

        <div className="donation-section">
          <h4>Ajude a causa! Faça uma doação via Pix</h4>
          <p>Chave Pix:<br /><strong>apasfaprudentopolis@gmail.com</strong></p>
          <img src={pixQrCode} alt="QR Code para doação via Pix" className="pix-qrcode" />
        </div>
      </div>

      <div className="help-option card-orange">
        <h3 className="help-title">Gostou do nosso projeto? Seja Voluntário!!</h3>
        <p className="help-description">
         Doe seu tempo e faça parte da transformação na vida de muitos animais resgatados. O trabalho voluntário é essencial para manter nossas atividades e garantir que cada animal receba amor, cuidado e uma chance real de ser adotado.

          Precisamos de pessoas dispostas a ajudar em tarefas do dia a dia, como passear com os cães, colaborar com a limpeza dos espaços, organizar eventos de adoção e também contribuir com a divulgação nas redes sociais.
        </p>
        <button
          className="btn btn-outline"
          onClick={() => {
            const contatoSection = document.getElementById('contato');
            if (contatoSection) {
              contatoSection.scrollIntoView({ behavior: 'smooth' });
            }
            
          }}
        >
          Saiba Mais
        </button> <img
            src={require('../../assets/imagens/abrigo.png')}
            alt="Imagem do Abrigo"
            className="volunteer-image"
          />

        

        
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
              {colaboradores.map((colab, idx) => (
                <div key={idx} className="colaborador-card">
                  <div className="colaborador-img">
                    <img
                      src={colab.imagem}
                      alt={`Foto de ${colab.nome}`}
                    />
                  </div>
                  <h4 className="colaborador-nome">{colab.nome}</h4>
                  <p className="colaborador-info">Membro desde: {colab.membroDesde}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="section">
          <div className="section-content">
            <div className="section-header">
              <h2 className="section-title">Próximos Eventos</h2>
              <p className="section-description">
                Fique por dentro dos nossos eventos e participe das nossas ações.
              </p>
            </div>

            {eventos.length > 0 && (
              <div className="evento-card">
                <div className="evento-img">
                  <img
                    src={eventos[eventoIndex].imagemUrl || "https://via.placeholder.com/600x400?text=Sem+Imagem"}
                    alt={`Imagem do evento ${eventos[eventoIndex].titulo}`}
                  />
                </div>
                <div className="evento-info">
                  <h3 className="evento-titulo">{eventos[eventoIndex].titulo}</h3>
                  <p className="evento-data">
                    <strong>Data:</strong> {eventos[eventoIndex].data}
                  </p>
                  <p className="evento-descricao">{eventos[eventoIndex].descricao}</p>

                </div>
                <button className="pata-btn" onClick={proximoEvento}>
                  🐾
                </button>
              </div>
            )}
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