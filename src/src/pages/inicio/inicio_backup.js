import React, { useState, useEffect } from 'react';
import './inicio.css';
import './flipcards.css'; // Garantindo que ambos os CSS sejam importados
import { Link } from 'react-router-dom';
import pixQrCode from '../../assets/imagens/qrcode.png';

import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore"; // Importe 'doc' e 'getDoc'
import { db } from "../../services/firebaseConnection";

// Imagens de exemplo para a galeria e outras seções
const historiaLuna = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";
const historiaBidu = "https://images.unsplash.com/photo-1598133894022-76a087120b0d?auto=format&fit=crop&w=600&q=80";
const historiaMimi = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80";

function Inicio() {
  const [pets, setPets] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [eventoIndex, setEventoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [estatisticas, setEstatisticas] = useState({
    animaisEncontrados: '...', animaisCastrados: '...', animaisRecuperados: '...',
  });

  // Funções do Formulário de Contato
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado pelo contato, ${formData.name}! Sua mensagem foi recebida.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  // Efeito para buscar todos os dados do Firestore
   useEffect(() => {
    // Busca Pets, Eventos e Colaboradores
    const fetchData = async () => {
      try {
        const petsSnapshot = await getDocs(collection(db, "animais"));
        setPets(petsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { console.error("Erro ao buscar animais:", error); }

      try {
        const eventosSnapshot = await getDocs(collection(db, "eventos"));
        setEventos(eventosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { console.error("Erro ao buscar eventos:", error); }

      try {
        const colaboradoresSnapshot = await getDocs(collection(db, "colaboradores"));
        const colaboradoresList = colaboradoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setColaboradores(colaboradoresList.length > 0 ? colaboradoresList : [
          // Colaboradores padrão caso não haja nenhum cadastrado
          { nome: "João Silva", membroDesde: "Janeiro 2020", imagem: "https://randomuser.me/api/portraits/men/32.jpg" },
          { nome: "Maria Oliveira", membroDesde: "Março 2019", imagem: "https://randomuser.me/api/portraits/women/44.jpg" },
          { nome: "Carlos Souza", membroDesde: "Julho 2021", imagem: "https://randomuser.me/api/portraits/men/65.jpg" },
        ]);
      } catch (error) { 
        console.error("Erro ao buscar colaboradores:", error);
        // Em caso de erro, usar colaboradores padrão
        setColaboradores([
          { nome: "João Silva", membroDesde: "Janeiro 2020", imagem: "https://randomuser.me/api/portraits/men/32.jpg" },
          { nome: "Maria Oliveira", membroDesde: "Março 2019", imagem: "https://randomuser.me/api/portraits/women/44.jpg" },
          { nome: "Carlos Souza", membroDesde: "Julho 2021", imagem: "https://randomuser.me/api/portraits/men/65.jpg" },
        ]);
      }
    };

    fetchData();

    // A MÁGICA: Listener em tempo real para as estatísticas
    const docRef = doc(db, 'estatisticas', 'geral');
    
    // onSnapshot abre uma conexão e ouve por mudanças.
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log("Dados das estatísticas recebidos em tempo real: ", docSnap.data());
        setEstatisticas(docSnap.data());
      } else {
        console.log("Documento de estatísticas não existe.");
      }
    });

    // Função de limpeza: fecha a conexão quando o componente "desmonta"
    return () => {
      unsubscribe();
    };

  }, []);
  
  const historiasResgate = [
    { nome: "Luna", descricao: "Resgatada com fome e frio, hoje vive feliz em um novo lar.", imagem: historiaLuna },
    { nome: "Bidu", descricao: "Machucado na rua, recebeu cuidados e muito amor.", imagem: historiaBidu },
    { nome: "Mimi", descricao: "Sobreviveu a maus-tratos e agora está saudável e brincalhona.", imagem: historiaMimi },
  ];

  const proximoEvento = () => {
    if (eventos.length > 0) {
      setEventoIndex((prev) => (prev + 1) % eventos.length);
    }
  };

  const compromissos = [
    { titulo: "Missão", texto: "• Manter o abrigo dentro da capacidade.\n• Socorrer animais agonizantes.\n• Apoiar famílias carentes com seus animais.\n• Promover a castração para evitar a superpopulação.\n• Reabilitar física e emocionalmente os animais resgatados.\n" },
    { titulo: "Visão", texto: "• Conscientizar e auxiliar no controle da espécie.\n• Participar de políticas públicas.\n• Educação em posse responsável.\n• Ser referência regional em proteção e bem-estar animal.\n• Criar programas de voluntariado e engajamento comunitário.\n• Desenvolver campanhas contínuas de adoção e castração." },
    { titulo: "Valores", texto: "• Fiscalizar crueldade animal.\n• Promover adoção.\n• Difundir leis de proteção animal.\n• Transparência e ética na gestão da ONG.\n• Respeito à vida em todas as suas formas.\n• Comprometimento com o bem-estar animal e social." },
  ];

  return (
    <div className="container">
      <main>
        
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Encontre seu Amigo Fiel</h1>
              <p className="hero-description">
                Somos a instituição APASFA e acreditamos que cada animal tem uma história. Junte-se a nós para dar a eles um final feliz. Adote, doe ou seja voluntário.
              </p>
              <div className="hero-actions">
                <Link to="/adocao" className="btn btn-primary">Adote Agora</Link>
                <a href="#como-ajudar" className="btn btn-accent">Como Ajudar</a>
              </div>
            </div>
            <div className="hero-gallery">
              <img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80" alt="Cachorro feliz para adoção" className="gallery-img img-1" />
              <img src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=400&q=80" alt="Gato curioso para adoção" className="gallery-img img-2" />
              <img src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=400&q=80" alt="Cachorro brincando" className="gallery-img img-3" />
            </div>
          </div>
        </section>

        <section className="info-rapida">
          <div className="info-card">
            <h3>Animais Encontrados</h3>
            <p>{estatisticas.animaisEncontrados}</p>
          </div>
          <div className="info-card">
            <h3>Animais Castrados</h3>
            <p>{estatisticas.animaisCastrados}</p>
          </div>
          <div className="info-card">
            <h3>Animais Recuperados</h3>
            <p>{estatisticas.animaisRecuperados}</p>
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
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>{item.titulo}</h3>
                      <span className="flip-icon"></span>
                    </div>
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
                    <img src={historia.imagem} alt={`Foto de ${historia.nome}`} />
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
              {pets.slice(0, 6).map((pet) => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-image">
                    <img
                      src={pet.fotoUrl && (pet.fotoUrl.startsWith('http') || pet.fotoUrl.startsWith('data:')) ? pet.fotoUrl : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'}
                      alt={`Animal para adoção ${pet.nome}`}
                      onError={e => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'; }}
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
              <Link to="/adocao" className="btn btn-brown">Ver Todos os Animais</Link>
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
                <h3 className="help-title">Gostou do nosso projeto? Seja Voluntário!</h3>
                <p className="help-description">
                 Doe seu tempo e faça parte da transformação na vida de muitos animais resgatados. O trabalho voluntário é essencial para manter nossas atividades e garantir que cada animal receba amor, cuidado e uma chance real de ser adotado.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => { document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Saiba Mais
                </button>
                <img src={require('../../assets/imagens/abrigo.png')} alt="Imagem do Abrigo" className="volunteer-image" />
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
                    src={colab.imagem && (colab.imagem.startsWith('http') || colab.imagem.startsWith('data:')) ? colab.imagem : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'}
                    alt={`Foto de ${colab.nome}`}
                    onError={e => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjQwMHgzMDA8L3RleHQ+PC9zdmc+'; }}
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
                    src={eventos[eventoIndex].imagemUrl && eventos[eventoIndex].imagemUrl.startsWith('http') ? eventos[eventoIndex].imagemUrl : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjYwMHg0MDA8L3RleHQ+PC9zdmc+'}
                    alt={`Imagem do evento ${eventos[eventoIndex].titulo}`}
                    onError={e => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjYwMHg0MDA8L3RleHQ+PC9zdmc+'; }}
                  />
                </div>
                <div className="evento-info">
                  <h3 className="evento-titulo">{eventos[eventoIndex].titulo}</h3>
                  <p className="evento-data">
                    <strong>Data:</strong> {eventos[eventoIndex].data}
                  </p>
                  <p className="evento-descricao">{eventos[eventoIndex].descricao}</p>
                </div>
                <button className="pata-btn" onClick={proximoEvento}>🐾</button>
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
                  Estamos à disposição para esclarecer dúvidas, receber sugestões ou conversar sobre como você pode ajudar.
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    <span>(42) 9999-8888</span>
                  </div>
                  <div className="contact-item">
                    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    <span>contato@apasfa.org.br</span>
                  </div>
                  <div className="contact-item">
                    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span>Rua Exemplo, 123 - Prudentópolis, PR</span>
                  </div>
                </div>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="social-link" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
              </div>

              <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Nome</label>
                      <input id="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Seu nome completo" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input id="email" type="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="seu.email@exemplo.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Assunto</label>
                    <input id="subject" value={formData.subject} onChange={handleInputChange} className="form-input" placeholder="Sobre o que você gostaria de falar?" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Mensagem</label>
                    <textarea id="message" value={formData.message} onChange={handleInputChange} className="form-textarea" placeholder="Digite sua mensagem aqui..." required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">Enviar Mensagem</button>
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
