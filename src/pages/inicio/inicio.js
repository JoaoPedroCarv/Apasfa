import React, { useState } from 'react';
import Slider from 'react-slick';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './inicio.css';

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

  const settings = {
    arrow : true,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "ease-in-out",
    nextArrow: <div className="arrow next">→</div>,  // Flecha para próximo
    prevArrow: <div className="arrow prev">←</div>,  // Flecha para anterior
  };

  const historia = historiasResgate[indexAtual];

  

  return (
    <div className="inicio-container">
      {/* Imagem decorativa no canto superior */}
      <img src={imagemCantoSuperior} alt="Decoração Superior" className="decoracao-superior" />

      {/* Carrossel de imagens */}
      <div className="carrossel-wrapper">
        <Slider {...settings}>
          {carrosselImagens.map((imagem, index) => (
            <div key={index}>
              <img src={imagem} alt={`Slide ${index + 1}`} className="carrossel-img" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Informações rápidas */}
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

      {/* Quem Somos */}
      <section className="quem-somos">
        <div className="texto">
          <h2>Quem Somos</h2>
          <p>
            Somos uma organização dedicada a resgatar, tratar e encontrar lares para animais em situação de rua.
            Trabalhamos com amor, dedicação e responsabilidade para fazer a diferença na vida de cada animal.
          </p>
        </div>
      </section>

      {/* Histórias de Resgate */}
      <section className="historias-resgate">
        <h2>Histórias de Resgate</h2>
        <TransitionGroup>
          <CSSTransition key={historia.nome} timeout={500} classNames="fade">
            <div className="historia-card-modern">
              <img src={historia.imagem} alt={`Foto de ${historia.nome}`} className="historia-img-modern" />
              <div className="historia-texto">
                <h3>{historia.nome}</h3>
                <p>{historia.descricao}</p>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </section>

      {/* Colaboradores */}
      <div className="colaboradores">
        {[ 
          { img: colaborador1, nome: 'João Silva', membro: 'Janeiro 2020' }, 
          { img: colaborador2, nome: 'Maria Oliveira', membro: 'Março 2019' }, 
          { img: colaborador3, nome: 'Carlos Souza', membro: 'Julho 2021' } 
        ].map((colab, idx) => (
          <div key={idx} className="colaborador-card" style={{ animationDelay: `${idx * 0.2}s` }}>
            <img src={colab.img} alt={`Foto de ${colab.nome}`} className="foto-colaborador" />
            <h4>{colab.nome}</h4>
            <p>Membro desde: {colab.membro}</p>
          </div>
        ))}
      </div>

      {/* Imagem decorativa no canto inferior */}
      <img src={imagemCantoInferior} alt="Decoração Inferior" className="decoracao-inferior" />
    </div>
  );
}

export default Inicio;
