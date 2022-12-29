import "./Main.css";
import Card from "../Card/Card.js";
import { useState, useEffect, useContext } from "react";
import { CurrentSavedCardsContext } from "../../contexts/CurrentSavedCardsContext";
import mainApi from "../../utils/MainApi";

export default function Main({
  cards,
  inSavedNews,
  onDeleteClick,
  showMore,
  handleShowMoreClick,
  isSignIn,
  onSignInNeededClick,
  isSavedButton,
}) {
  const [savedCards, setSavedCards] = useContext(CurrentSavedCardsContext);

  // to update card._id from from savedCard._id to for identify card that already mark
  // for using when user want to unmarked on main page
  const updateCards = (cards, savedCards) => {
    return cards.map((card) => {
      // Find the saved card that has the same url as the current card
      const savedCard = savedCards.find(
        (savedCard) => savedCard.link === card.url
      );
      // If the saved card was found, set the _id properties of the current card
      if (savedCard) {
        return {
          ...card,
          _id: savedCard._id,
        };
      }
      // Otherwise, return the current card without any changes
      return card;
    });
  };

  const updatedCards = updateCards(cards, savedCards);

  const handleDeleteClickUnmark = (cardId, setIsSavedButton) => {
    console.log(cardId);
    mainApi
      .deleteSaveArticle(cardId, localStorage.getItem("token"))
      .then((res) => {
        console.log(res);
        setIsSavedButton(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="main">
      <div className="main__container">
        <h2 className="main__heading">Search result</h2>
        <ul className="main__cards">
          {updatedCards.slice(0, showMore).map((card, index) => {
            return (
              <li key={index} className="main__card">
                <Card
                  isSignIn={isSignIn}
                  card={card}
                  inSavedNews={inSavedNews}
                  onDeleteClick={handleDeleteClickUnmark}
                  isSaved={false}
                  onSignInNeededClick={onSignInNeededClick}
                  isSavedButton={isSavedButton}
                  savedCards={savedCards}
                />
              </li>
            );
          })}
        </ul>
        {showMore <= 100 && (
          <button className="main__more-button" onClick={handleShowMoreClick}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
}
