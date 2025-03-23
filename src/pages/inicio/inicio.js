import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './inicio.css';

import banner1 from '../../assets/imagens/ajude-um-animal.png';
import banner2 from '../../assets/imagens/images (1).jpg';
import banner3 from '../../assets/imagens/images.jpg';
import colaborador1 from '../../assets/imagens/pikrepo-com.jpg';
import colaborador2 from '../../assets/imagens/pikrepo-com.jpg';
import colaborador3 from '../../assets/imagens/pikrepo-com.jpg';

function Inicio() {
  const carrosselImagens = [banner1, banner2, banner3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='principal'>
      <div className='carrossel-container'>
        <Slider {...settings} className='carrossel'>
          {carrosselImagens.map((imagem, index) => (
            <div key={index}>
              <img src={imagem} alt={`Slide ${index + 1}`} className='carrossel-imagem' />
            </div>
          ))}
        </Slider>
      </div>

      <div className='informacoes-container'>
        <div className='info-box'>
          <h3>Animais Encontrados</h3>
          <p>123</p>
        </div>
        <div className='info-box'>
          <h3>Animais Castrados</h3>
          <p>56</p>
        </div>
        <div className='info-box'>
          <h3>Animais Recuperados</h3>
          <p>78</p>
        </div>
      </div>

      {/* Seção Quem Somos */}
      <div className='quem-somos'>
        <div className='texto-quem-somos'>
          <h2>Quem Somos</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis dui. Nulla
            facilisi. Integer at risus quis neque aliquam iaculis. Phasellus nec gravida justo, eget
            consectetur elit. Aliquam erat volutpat. Sed ac libero nulla. Donec a sollicitudin risus.
          </p>
        </div>

        {/* Seção Colaboradores */}
        <div className='colaboradores'>
          <div className='colaborador'>
            <img src={colaborador1} alt="Colaborador 1" className='foto-colaborador' />
            <h4>João Silva</h4>
            <p>Membro desde: Janeiro 2020</p>
          </div>
          <div className='colaborador'>
            <img src={colaborador2} alt="Colaborador 2" className='foto-colaborador' />
            <h4>Maria Oliveira</h4>
            <p>Membro desde: Março 2019</p>
          </div>
          <div className='colaborador'>
            <img src={colaborador3} alt="Colaborador 3" className='foto-colaborador' />
            <h4>Carlos Souza</h4>
            <p>Membro desde: Julho 2021</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Inicio;
