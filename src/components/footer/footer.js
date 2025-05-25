import './footer.css';
import facebookIcon from '../../assets/imagens/facebook.png';
import instagramIcon from '../../assets/imagens/instagram.png';
import twitterIcon from '../../assets/imagens/x.png';
import pixQrCode from '../../assets/imagens/qrcode.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="left-section">
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
                <div className="contact-info">
                    <h3>apasfaprudentopolis@gmail.com | (42) 99904-2630</h3>
                </div>
            </div>

            
        </footer>
    );
}

export default Footer;
