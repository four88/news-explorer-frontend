import "./Navigation.css";
export default function Navigation() {

  return (
    <nav className="nav">
      <div className="nav__container">
        <p className="nav__name">NewsExplorer</p>
        <ul className="nav__lists">
          <li className="nav__item">
            Home
          </li>
          <button className="nav__button-signin">
            Sign in
          </button>
        </ul>
      </div>
    </nav>
  )
}
