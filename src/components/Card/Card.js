import './Card.css';
import { useState, useContext } from 'react';
import mainApi from '../../utils/MainApi';
import { CurrentKeywordContext } from '../../contexts/CurrentKeywordContext';

const checkIfSaved = (card, savedCards) => {
  let found = false;
  if (savedCards.length > 0) {
    savedCards.forEach((savedCard) => {
      if (savedCard.link === card.url) {
        found = true;
      }
    });
    return found;
  }
  return false;
}

export default function Card({
  card,
  inSavedNews,
  isSignIn,
  onSignInNeededClick,
  savedCards

}) {


  // for keyword from context
  const [keyword, setKeyword] = useContext(CurrentKeywordContext);
  // for check card is save or not  
  const [isSavedButton, setIsSavedButton] = useState(checkIfSaved(card, savedCards));

  const handleSaveClick = () => {
    if (isSignIn) {
      card.keyword = keyword
      mainApi.saveArticle({
        keyword: card.keyword,
        title: card.title,
        text: card.description,
        date: card.publishedAt,
        source: card.source.name,
        link: card.url,
        image: card.urlToImage
      }, localStorage.getItem('token'))
        .then((res) => {
          console.log(res)
          setIsSavedButton(true);
        })
        .catch((err) => console.log(err))
    }
    else {
      console.log('Please Sign in')
    }
  }

  const handleDeleteClick = () => {
    if (card._id) {
      mainApi.deleteSaveArticle(card._id, localStorage.getItem('token'))
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }


  const formattedDate = (card) => {
    const cardDate = card.publishedAt || card.date;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const noTime = cardDate.slice(0, 10);
    const date = new Date(noTime);
    const formatDate = `${months[date.getMonth()]} ${date.getDate()},  ${date.getFullYear()}`;
    return formatDate;
  };

  const handleSignInNeededClick = () => {
    onSignInNeededClick(card)
  }


  return (
    <div className='card'>
      {inSavedNews ?
        <>
          <span className='card__keyword'>
            {card.keyword}
          </span>
          <button className="card__delete-button"
            onClick={handleDeleteClick}
          >
          </button>
        </>
        :
        isSignIn ?
          isSavedButton ?
            <button className="card__save-button_marked"
            >
            </button>
            :
            <>
              <button className="card__save-button"
                onClick={handleSaveClick}
              >
              </button>
            </>
          :
          <>

            <button className="card__save-button card__save-button_signin"
              onClick={handleSignInNeededClick}
            >
              <span className='card__signin' >
                Sign in to save articles
              </span>
            </button>
          </>
      }
      <img
        alt={card.title}
        src={card.urlToImage || card.image}
        className="card__img"
      />
      <div className="card__content-box">
        <p className="card__date">
          {formattedDate(card)}
        </p>
        <h2 className="card__title">
          <a href={card.url || card.link} className="card__title_link" target="_blank" rel="noreferrer">
            {card.title}
          </a>
        </h2>
        <p className="card__content">
          {card.description || card.text}
        </p>
        <p className="card__source">
          {card.source.name || card.source}
        </p>
      </div>
    </div>
  )
}
