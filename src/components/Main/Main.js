import './Main.css';
import Card from '../Card/Card.js';

export default function Main({
  cards,
  isSaved,
  onSaveClick,
  onDeleteClick
}) {


  return (
    <section className="main">
      <div className='main__container'>
        <h1 className='main__heading'>
          Search result
        </h1>
        <ul className='main__cards'>
          {cards.map((card) => {
            return (
              <Card
                card={card}
                isSaved={isSaved}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
              />
            )
          })
          }
        </ul>
      </div>
    </section>
  )
}
