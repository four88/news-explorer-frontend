import './App.css';
import { useState, useEffect } from 'react';
import { CurrentKeywordContext } from '../../contexts/CurrentKeywordContext';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import thirdPartyApi from '../../utils/ThirdPartyApi';


function App() {

  // when press 'esc' close popup
  useEffect(() => {
    const exitEsc = (e) => {
      if (e.key === "Escape") {
        setPopupOpend(false)
      }
    };
    document.addEventListener("keydown", exitEsc);

    return () => document.removeEventListener("keydown", exitEsc);
  }, []);

  // when click on modal then close popup
  useEffect(() => {
    if (isPopupOpened) {
      document
        .querySelector('.modal_type_opened')
        .addEventListener("click", (evt) => {
          if (evt.target.classList.contains('modal')) {
            handlePopup()
          }
        })
    }
  })

  // for control popup  
  const [isPopupOpened, setPopupOpend] = useState(false);

  // for sign in or sign up 
  const [hasAccount, setHasAccount] = useState(true)

  // for keyword search
  const [keyword, setKeyword] = useState("");

  // for collect account 
  const [account, setAccount] = useState({
    email: "",
    password: "",
    username: "Elise"
  })

  // for sign in state if user already sign in set to true 
  const [isSignIn, setSignIn] = useState(false)

  // for contain cards from news api
  const [cards, setCards] = useState([])

  // for count number of news when click on show more button
  const [showMore, setShowMore] = useState(3)

  // state for loading when search 
  const [isLoading, setIsLoading] = useState(true)

  // state for show result if user not serach keyword result = false
  const [hasResult, setHasResult] = useState(false)

  // state for check if news saved 
  const [isSaved, setIsSaved] = useState(false)


  const handlePopup = () => {
    setPopupOpend(!isPopupOpened)
  }
  const handleSearchUpdate = () => {
    // send keyword to api
    setHasResult(true)
    setIsLoading(true)
    thirdPartyApi.getArticles(keyword)
      .then((res) => {
        setShowMore(3)
        setCards(res)
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }

  const handleHasAccount = (evt) => {
    setHasAccount(!hasAccount)
  }

  const handleSignInClick = () => {
    handlePopup()
    setHasAccount(true)
  }

  const handleSignInChange = (evt) => {
    const { name, value } = evt.target;
    setAccount({
      ...account,
      [name]: value,
    })
  }

  const handleSubmitSignIn = (evt) => {
    evt.preventDefault()
    setSignIn(true)
    console.log(account)
    handlePopup()
  }

  const handleSignOutClick = () => {
    setSignIn(false)
    localStorage.removeItem('savedCards')
  }

  const handleSubmitSignup = (evt) => {
    evt.preventDefault()
    console.log(account)
    console.log('sign up successed')
  }

  const handleShowMoreClick = () => {
    setShowMore(showMore + 3)
  }



  const handleSaveCardClick = (card) => {
    if (isSignIn) {
      card.keyword = keyword
      // list of saved card
      let savedCards = []
      // read from local if cannot get any card set empyty list
      savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
      // add card to list
      savedCards.push(card)
      // set to localstorage
      localStorage.setItem('savedCards', JSON.stringify(savedCards))
    }
    else {
      console.log('Please Sign in')
    }
  }

  console.log(JSON.parse(localStorage.getItem('savedCards')))




  return (
    <CurrentKeywordContext.Provider value={[keyword, setKeyword]}>
      <PopupWithForm
        isPopupOpened={isPopupOpened}
        onClose={handlePopup}
        handleSubmitSignIn={hasAccount ? handleSubmitSignIn : handleSubmitSignup}
        account={account}
        handleChange={handleSignInChange}
        hasAccount={hasAccount}
        handleHasAccount={handleHasAccount}
      />


      <Switch>
        <Route path="/" exact>
          <Header
            username={account.username}
            onSearchUpdate={handleSearchUpdate}
            onClickSignIn={handleSignInClick}
            onClickSignOut={handleSignOutClick}
            isSignIn={isSignIn}
            inArticleRoute={false}
          />

          {hasResult ?
            isLoading
              ?
              <Preloader
                hasResult={true}
              />
              : cards.length > 0
                ?
                <Main
                  cards={cards}
                  inSavedNews={false}
                  onSaveClick={handleSaveCardClick}
                  showMore={showMore}
                  handleShowMoreClick={handleShowMoreClick}
                />
                :
                <Preloader hasResult={false} />
            :
            ""

          }
          <About />
          <Footer />
        </Route>

        <ProtectedRoute
          path="/saved-news"
          isSignIn={isSignIn}
          toPath='/'
        >
          <Navigation
            onClickSignIn={handleSignInClick}
            isSignIn={isSignIn}
            onClickSignOut={handleSignOutClick}
            username={account.username}
            inArticleRoute={true}
          />
          <SavedNewsHeader
            username={account.username}
            onSaveClick={handleSaveCardClick}
            inSavedNews={true}
          />
          <Footer />
        </ProtectedRoute>
      </Switch>
    </CurrentKeywordContext.Provider>
  );
}

export default App;
