import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './inicio.css';
import './flipcards.css';

import { db } from '../../services/firebaseConnection';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import banner1 from '../../assets/imagens/sorriso.jpg';
import banner2 from '../../assets/imagens/images (1).jpg';
import banner3 from '../../assets/imagens/gatinhos.jpg';
import banner4 from '../../assets/imagens/obrigado.png';
import colaborador1 from '../../assets/imagens/pikrepo-com.jpg';
import colaborador2 from '../../assets/imagens/pikrepo-com.jpg';
import colaborador3 from '../../assets/imagens/pikrepo-com.jpg';
import imagemCantoSuperior from '../../assets/imagens/Vector.png';
import imagemCantoInferior from '../../assets/imagens/Vector.png';

const carrosselImagens = [banner1, banner2, banner3, banner4];

const historiasResgate = [
  {
    imagem: banner1,
    nome: "Luna",
    descricao: "Resgatada com fome e frio, hoje vive feliz em um novo lar."
  },
  {
    imagem: banner2,
    nome: "Bidu",
    descricao: "Machucado na rua, recebeu cuidados e muito amor."
  },
  {
    imagem: banner3,
    nome: "Mimi",
    descricao: "Sobreviveu a maus-tratos e agora está saudável e brincalhona."
  }
];

function Inicio() {
  const [indexAtual, setIndexAtual] = useState(0);
  const [eventos, setEventos] = useState([]);
  const [eventoAtualIndex, setEventoAtualIndex] = useState(0);

  useEffect(() => {
    async function carregarEventos() {
      const eventosRef = collection(db, "eventos");
      const q = query(eventosRef, orderBy("criadoEm", "desc"));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEventos(lista);
    }

    carregarEventos();
  }, []);

  const settings = {
    arrow: true,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "ease-in-out",
    nextArrow: <div className="arrow next">→</div>,
    prevArrow: <div className="arrow prev">←</div>,
  };

  const historia = historiasResgate[indexAtual];

  const compromissos = [
    {
      titulo: "Missão",
      texto:
        "• Manter o abrigo dentro da capacidade.\n" +
        "• Socorrer animais agonizantes.\n" +
        "• Apoiar famílias carentes com seus animais.\n" +
        "• Promover a castração para evitar a superpopulação.\n" +
        "• Reabilitar física e emocionalmente os animais resgatados.\n"
    },
    {
      titulo: "Visão",
      texto:
        "• Conscientizar e auxiliar no controle da espécie.\n" +
        "• Participar de políticas públicas.\n" +
        "• Educação em posse responsável.\n" +
        "• Ser referência regional em proteção e bem-estar animal.\n" +
        "• Criar programas de voluntariado e engajamento comunitário.\n" +
        "• Desenvolver campanhas contínuas de adoção e castração."
    },
    {
      titulo: "Valores",
      texto:
        "• Fiscalizar crueldade animal.\n" +
        "• Promover adoção.\n" +
        "• Difundir leis de proteção animal.\n" +
        "• Transparência e ética na gestão da ONG.\n" +
        "• Respeito à vida em todas as suas formas.\n" +
        "• Comprometimento com o bem-estar animal e social."
    }
  ];

  return (
    <div className="inicio-container">
      <img src={imagemCantoSuperior} alt="Decoração Superior" className="decoracao-superior" />

      <div className="carrossel-wrapper">
        <Slider {...settings}>
          {carrosselImagens.map((imagem, index) => (
            <div key={index}>
              <img src={imagem} alt={`Slide ${index + 1}`} className="carrossel-img" />
            </div>
          ))}
        </Slider>
      </div>

      <section className="info-rapida">
        <div className="info-card"><h3>Animais Encontrados</h3><p>123</p></div>
        <div className="info-card"><h3>Animais Castrados</h3><p>56</p></div>
        <div className="info-card"><h3>Animais Recuperados</h3><p>78</p></div>
      </section>

      <section className="resumo-e-historia">
        <div className="bloco-historia">
          <TransitionGroup>
            <CSSTransition key={historia.nome} timeout={500} classNames="fade">
              <div className="historia-card-modern">
                <img src={historia.imagem} alt={`Foto de ${historia.nome}`} className="historia-img-modern" />
                <div className="historia-texto">
                  <h3>{historia.nome}</h3>
                  <p>{historia.descricao}</p>
                </div>
                <button
                  className="pata-btn direita"
                  onClick={() =>
                    setIndexAtual(prev => prev === historiasResgate.length - 1 ? 0 : prev + 1)
                  }
                >
                  🐾
                </button>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <div className="quem-somos">
          <h2>Quem Somos</h2>
          <p>A APASFA (Associação Protetora dos Animais São Francisco de Assis) em Prudentópolis é uma organização sem fins lucrativos que visa proteger e promover o bem-estar dos animais.</p>
          <div className="flip-card-container">
            {compromissos.map((item, idx) => (
              <div className="flip-card" key={idx}>
                <h3>{item.titulo}</h3>
                <div className="flip-card-inner">
                  <div className="flip-card-front"></div>
                  <div className="flip-card-back">
                    {item.texto.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}<br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="colaboradores-e-eventos">
        <div className="colaboradores">
          {[colaborador1, colaborador2, colaborador3].map((img, idx) => (
            <div key={idx} className="colaborador-card" style={{ animationDelay: `${idx * 0.2}s` }}>
              <img src={img} alt={`Foto de colaborador ${idx + 1}`} className="foto-colaborador" />
              <h4>{['João Silva', 'Maria Oliveira', 'Carlos Souza'][idx]}</h4>
              <p>Membro desde: {['Janeiro 2020', 'Março 2019', 'Julho 2021'][idx]}</p>
            </div>
          ))}
        </div>

        <div className="eventos">
          <h2>Próximos Eventos</h2>
          <TransitionGroup>
            <CSSTransition key={eventos[eventoAtualIndex]?.id || 'placeholder'} timeout={500} classNames="fade">
              <div className="evento-card historia-card-modern">
                {eventos.length > 0 ? (
                  <>
                    <img
                      src={eventos[eventoAtualIndex].imagemUrl}
                      alt={eventos[eventoAtualIndex].titulo}
                      className="historia-img-modern"
                    />
                    <div className="historia-texto">
                      <h3>{eventos[eventoAtualIndex].titulo}</h3>
                      <p><strong>Data:</strong> {eventos[eventoAtualIndex].data}</p>
                    </div>
                    <button
                      className="pata-btn-direita-evento"
                      onClick={() =>
                        setEventoAtualIndex(prev => prev === eventos.length - 1 ? 0 : prev + 1)
                      }
                    >
                      🐾
                    </button>
                  </>
                ) : (
                  <p>Nenhum evento disponível</p>
                )}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>

      <img src={imagemCantoInferior} alt="Decoração Inferior" className="decoracao-inferior" />
    </div>
  );
}

export default Inicio;
