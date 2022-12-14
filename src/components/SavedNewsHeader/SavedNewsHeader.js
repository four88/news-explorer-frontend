import './SavedNewsHeader.css';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';

export default function SavedNewsHeader({
  username,
  inSavedNews,
}) {

  const [savedCards, setSavedCards] = useState([])

  useEffect(() => {
    setSavedCards(JSON.parse(localStorage.getItem('savedCards')))
  }, [])

  const handleDeleteCardClick = (card) => {
    const index = savedCards.indexOf(card)

    console.log(savedCards)
    savedCards.splice(index, 1)
    localStorage.setItem('savedCards', JSON.stringify(savedCards))
    setSavedCards(JSON.parse(localStorage.getItem('savedCards')))
    console.log(savedCards)
  }

  const findUniqueKeyword = (cards) => {
    const keywords = []
    for (let i = 0; i < cards.length; i++) {
      keywords.push(cards[i].keyword)
    }
    let unique = [...new Set(keywords)];
    return unique
  }

  const unique = findUniqueKeyword(savedCards)

  console.log(savedCards)

  return (
    <>
      <section className='saved_news'>
        <div className='saved_news__container'>
          <header className='saved_news__header'>
            <p className='saved_news__title'>
              Saved article
            </p>
            <h2 className='saved_news__info'>
              {`${username}, you have ${savedCards.length} saved articles`}
            </h2>
            <p className='saved_news__keyword'>
              By keywords:
              <span className='saved_news__bold'>
                {` ${unique[0]}, ${unique[1]}, and ${unique.length - 2} other`}
              </span>
            </p>
          </header>
        </div>
        <main className="saved_news__main">
          <div className='saved_news__container saved_news__container-main'>
            {savedCards.map((card) => {
              return (
                <Card
                  card={card}
                  inSavedNews={inSavedNews}
                  onDeleteClick={handleDeleteCardClick}
                />
              )
            })}
          </div>
        </main>
      </section>
    </>
  )
} 
