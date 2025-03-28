import './footer.css';
import facebookIcon from '../../assets/imagens/facebook.png';  // Caminho correto para a imagem
import instagramIcon from '../../assets/imagens/instagram.png';  // Caminho correto para a imagem
import twitterIcon from '../../assets/imagens/x.png';  // Caminho correto para a imagem

function Footer() {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://www.facebook.com/apasfaprudentopolis?locale=pt_BR" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" className="social-icon" />
                </a>
                <a href="https://www.instagram.com/apasfaprudentopolis/" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className="social-icon" />
                </a>
                <a href="https://x.com/apasfaprude" target="_blank" rel="noopener noreferrer">
                    <img src={twitterIcon} alt="Twitter" className="social-icon" />
                </a>
                
            </div>
            <div>
                <h3>apasfaprudentopolis@gmail.com |
                (42) 99904-2630
                </h3>
            </div>
        </footer>
    );
}

export default Footer;
