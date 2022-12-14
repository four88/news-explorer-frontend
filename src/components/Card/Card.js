import './Card.css';

export default function Card({
  card,
  onSaveClick,
  isSaved,
  onDeleteClick
}) {

  const handleSaveClick = () => {
    onSaveClick(card)
  }

  const handleDeleteClick = () => {
    onDeleteClick(card)
  }

  return (
    <li className='card'>
      {isSaved ?
        <button className="card__delete-button"
          onClick={handleDeleteClick}
        >
        </button>
        :
        <button className="card__save-button"
          onClick={handleSaveClick}
        >
        </button>
      }
      <img
        alt={card.title}
        src={card.urlToImage}
        className="card__img"
      />
      <div className="card__content-box">
        <p className="card__date">
          {card.publishedAt}
        </p>
        <h2 className="card__title">
          {card.title}
        </h2>
        <p className="card__content">
          {card.description}
        </p>
        <p className="card__source">
          {card.source.name}
        </p>
      </div>
    </li>
  )
}
