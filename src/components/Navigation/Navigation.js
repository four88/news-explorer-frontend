import "./Navigation.css";
import { Link } from 'react-router-dom';
import logOutIconBlack from '../../images/logout_icon.svg';
import logOutIconWhite from '../../images/logout_icon_white.svg';

export default function Navigation({
  onClickSignIn,
  onClickSignOut,
  isSignIn,
  username,
  inArticleRoute
}) {

  return (
    <nav
      className={`nav
              ${inArticleRoute ? 'nav_black' : ""}`}
    >
      <div className="nav__container">
        <p className="nav__name">NewsExplorer</p>
        <ul className="nav__lists">
          <li className={`nav__item
                        ${inArticleRoute ? 'nav__item_black' : "nav__item-active"}`}
          >
            <Link
              to='/'
              className={`nav__link nav__link_home
                        ${inArticleRoute ? 'nav__link_black' : ""}`
              }
            >
              Home
            </Link>
          </li>
          {
            isSignIn ?
              <>
                <li className={`nav__item
                        ${inArticleRoute ? 'nav__item_black nav__item_black-active' : ""}`}
                >
                  <Link className={`nav__link nav__link_article
                        ${inArticleRoute ? 'nav__link_black' : ""}`
                  }
                    to='/saved-news'
                  >
                    Saved articles
                  </Link>
                </li>
                <button
                  className={`nav__button-signin nav__button-signin_login
                        ${inArticleRoute ? 'nav__button-signin_black' : ""}
                        `}
                  type='button'
                  onClick={onClickSignOut}
                >
                  {username}
                  <img src={inArticleRoute ? logOutIconBlack : logOutIconWhite}
                    alt="logout-icon-white"
                  />
                </button>
              </>
              :
              <button
                className="nav__button-signin"
                type='button'
                onClick={onClickSignIn}
              >
                Sign in
              </button>
          }
        </ul>
      </div>
    </nav >
  )
}
