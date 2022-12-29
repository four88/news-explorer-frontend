import "./SavedNewsHeader.css";
import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentSavedCardsContext } from "../../contexts/CurrentSavedCardsContext";
import { useState, useEffect, useContext } from "react";
import mainApi from "../../utils/MainApi";

export default function SavedNewsHeader({ inSavedNews }) {
  const [username, setUsername] = useContext(CurrentUserContext);
  const [savedCards, setSavedCards] = useContext(CurrentSavedCardsContext);

  useEffect(() => {
    mainApi
      .getSaveArticle(localStorage.getItem("token"))
      .then((res) => {
        setSavedCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteClick = (cardId) => {
    mainApi
      .deleteSaveArticle(cardId, localStorage.getItem("token"))
      .then((res) => {
        const index = savedCards.findIndex((card) => card._id === cardId);
        // Make a copy of the cards array
        const newCards = [...savedCards];
        // Remove the card at the specified index
        newCards.splice(index, 1);
        // Update the state with the new array of cards
        setSavedCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  // find the unique keyword from saved news return list of unique keyword
  // in descending order
  function sortKeywords(cards) {
    const keywordCounts = {};
    cards.forEach((card) => {
      keywordCounts[card.keyword] = keywordCounts[card.keyword]
        ? keywordCounts[card.keyword] + 1
        : 1;
    });
    const keywordsSorted = Object.keys(keywordCounts).sort(
      (firstKeyword, secondKeyword) => {
        return keywordCounts[secondKeyword] - keywordCounts[firstKeyword];
      }
    );
    return keywordsSorted;
  }

  // show span how many keyword user have
  const listSpanKeyword = () => {
    const unique = sortKeywords(savedCards);
    if (unique.length <= 2) {
      if (unique.length === 0) {
        return " Not found any saved news";
      }
      if (unique.length === 1) {
        return ` ${unique[0]}`;
      }
      if (unique.length === 2) {
        return ` ${unique[0]}, ${unique[1]} `;
      }
    } else {
      return ` ${unique[0]}, ${unique[1]} and ${unique.length - 2} `;
    }
  };

  // sort card by keyword
  const sortCardsByKeyword = (cards) => {
    const sortedKeywords = sortKeywords(cards);
    cards.sort(
      (firstCard, secondCard) =>
        sortedKeywords.indexOf(firstCard.keyword) -
        sortedKeywords.indexOf(secondCard.keyword)
    );
    return cards;
  };

  return (
    <>
      <section className="saved_news">
        <div className="saved_news__container">
          <header className="saved_news__header">
            <p className="saved_news__title">Saved article</p>
            <h2 className="saved_news__info">
              {`${username.name}, you have ${savedCards.length} saved articles`}
            </h2>
            <p className="saved_news__keyword">
              By keywords:
              <span className="saved_news__bold">{listSpanKeyword()}</span>
            </p>
          </header>
        </div>
        <main className="saved_news__main">
          {savedCards.length > 0 ? (
            <ul className="saved_news__container saved_news__container-main">
              {sortCardsByKeyword(savedCards).map((card) => {
                return (
                  <li key={card._id} className="saved_news__card">
                    <Card
                      card={card}
                      inSavedNews={inSavedNews}
                      savedCards={savedCards}
                      onDeleteClick={handleDeleteClick}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="saved_news__container saved_news__container-height">
              <Preloader hasResult={false} />
            </div>
          )}
        </main>
      </section>
    </>
  );
}
