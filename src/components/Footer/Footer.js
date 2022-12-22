import './Footer.css';
import gitIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';

export default function Footer() {

  return (
    <footer className="footer">
      <p className='footer__copyright'>
        © 2021 Supersite, Powered by News API
      </p>
      <nav className="footer__container">
        <ul className='footer__links'>
          <li className='footer__list'>
            <a href=".header" className='footer__link'>
              Home
            </a>
          </li>
          <li className='footer__list'>
            <a href="https://practicum.com/"
              className='footer__link'
              target='_blank'
              rel='noreferrer'
            >
              Practicum
            </a>
          </li>
        </ul>
        <ul className='footer__socials'>
          <li className='footer__list'>
            <a href='https://github.com/four88'
              className="footer__social"
              target='_blank'
              rel='noreferrer'
            >
              <img src={gitIcon}
                alt="github"
                className='footer__social_icon'
              />
            </a>
          </li>

          <li className='footer__list'>
            <a href='https://www.facebook.com/pharanyu.chuenjit'
              className="footer__social"
              target='_blank'
              rel='noreferrer'
            >
              <img src={facebookIcon}
                alt="facebook"
                className='footer__social_icon'
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>

  )
}
