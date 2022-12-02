import './Card.css';

export default function Card({
  card,
  onSaveClick
}) {

  const handleSaveClick = () => {
    onSaveClick(card)
  }

  return (
    <li className='card'>
      <button className="card__save-button"
        onClick={handleSaveClick}
      >
      </button>
      <img
        alt={card.title}
        src={card.img}
        className="card__img"
      />
      <div className="card__content-box">
        <p className="card__date">
          {card.date}
        </p>
        <h2 className="card__title">
          {card.title}
        </h2>
        <p className="card__content">
          {card.content}
        </p>
        <p className="card__source">
          {card.cardSource}
        </p>
      </div>

    </li>
  )
}
