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

  // for sign in state 
  const [isSignIn, setSignIn] = useState(true)



  const card = {
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1743&q=80",
    date: "13 Jan 2019",
    title: "Meow",
    content: 'fdkalj;fkldajfkjaklfjkdlafkljakljkjakfakslfjklasdjfklsajf',
    cardSource: 'fkjaldjlkfjdakljfkla'
  }

  const handlePopup = () => {
    setPopupOpend(!isPopupOpened)
  }
  const handleSearchUpdate = () => {
    // send keyword to api
    console.log(keyword)
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
    console.log(account)
  }

  const handleSubmitSignup = (evt) => {
    evt.preventDefault()
    console.log(account)
    console.log('sign up successed')
  }

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
            isSignIn={isSignIn}
            inArticleRoute={false}
          />
          <Main
            card={card}
          />
          <About />
          <Footer />
        </Route>

        <Route path="/saved-news">
          <Navigation
            isSignIn={isSignIn}
            username={account.username}
            inArticleRoute={true}
          />
        </Route>

      </Switch>
    </CurrentKeywordContext.Provider>
  );
}

export default App;
