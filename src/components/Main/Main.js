import './Main.css';
import Card from '../Card/Card.js';

export default function Main() {

  return (
    <section className="main">
      <div className='main__container'>
        <h1 className='main__heading'>
          Search result
        </h1>
        <ul className='main__cards'>
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
    </section>
  )
}
