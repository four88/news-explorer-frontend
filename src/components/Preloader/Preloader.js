import './Preloader.css';
import preloaderIcon from '../../images/Ellipse.png';

export default function Preloader() {

  return (
    <section className="preloader">
      <div className="preloader__container">
        <i className="preloader__icon"></i>
        <p className="preloader__text">
          Searching for news...
        </p>
      </div>
    </section>
  )
}
