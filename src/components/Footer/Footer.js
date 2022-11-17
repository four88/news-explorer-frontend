import './Footer.css';
import gitIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';

export default function Footer() {

  return (
    <footer className="footer">
      <p className='footer__copyright'>
        © 2021 Supersite, Powered by News API
      </p>
      <div className="footer__container">
        <div className='footer__links'>
          <a href=".header" className='footer__link'>
            Home
          </a>
          <a href="https://practicum.com/"
            className='footer__link'
            target='_blank'
            rel='noopener noreferrer'
          >
            Practicum
          </a>
        </div>
        <div className='footer__socials'>
          <a href='https://github.com/four88'
            className="footer__social"
          >
            <img src={gitIcon}
              alt="github"
              className='footer__social_icon'
            />
          </a>
          <a href='https://www.facebook.com/pharanyu.chuenjit'
            className="footer__social"
          >
            <img src={facebookIcon}
              alt="facebook"
              className='footer__social_icon'
            />
          </a>
        </div>
      </div>
    </footer>

  )
}
