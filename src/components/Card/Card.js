import './Card.css';

export default function Card({
  card
}) {

  return (
    <li className='card'>

      <button className="card__save-button"
        onClick={""}
      >
      </button>
      <img
        alt="card-image"
        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1743&q=80"
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
          {card.card__source}
        </p>
      </div>

    </li>
  )
}
