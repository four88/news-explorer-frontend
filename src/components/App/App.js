import "./App.css";
import { useState, useEffect } from "react";
import { CurrentKeywordContext } from "../../contexts/CurrentKeywordContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentSavedCardsContext } from "../../contexts/CurrentSavedCardsContext";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { Switch, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";
import thirdPartyApi from "../../utils/ThirdPartyApi";
import mainApi from "../../utils/MainApi";

function App() {
  // for control popup
  const [isPopupOpened, setPopupOpend] = useState(false);

  // for sign in or sign up
  const [hasAccount, setHasAccount] = useState(true);

  // for keyword search
  const [keyword, setKeyword] = useState("");

  // for collect account
  const [account, setAccount] = useState({
    email: "",
    password: "",
    name: "",
  });

  // for sign in state if user already sign in set to true
  const [isSignIn, setSignIn] = useState(false);

  // for contain cards from news api
  const [cards, setCards] = useState([]);

  // for count number of news when click on show more button
  const [showMore, setShowMore] = useState(3);

  // state for loading when search
  const [isLoading, setIsLoading] = useState(true);

  // state for show result if user not serach keyword result = false
  const [hasResult, setHasResult] = useState(false);

  // for control open and close RegistrationSuccess popup
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  // for contain cards from save article
  const [savedCards, setSavedCards] = useState([]);

  // for contain sign in error when submit form failed
  const [signinError, setSignInError] = useState("");

  // for contain sign in error when submit form failed
  const [signupError, setSignupError] = useState("");

  const handlePopup = () => {
    setPopupOpend(!isPopupOpened);
    setSignInError("");
    setSignInError("");
  };

  const handleSignInNeededCardClick = () => {
    handlePopup();
  };

  const handleSearchUpdate = () => {
    // send keyword to api
    setHasResult(true);
    setIsLoading(true);
    thirdPartyApi
      .getArticles(keyword)
      .then((res) => {
        setShowMore(3);
        setCards(res);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  const handleSignInClick = () => {
    handlePopup();
    setHasAccount(true);
  };

  const handleSignInChange = (evt) => {
    const { name, value } = evt.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSubmitSignIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    console.log(email);
    console.log(password);
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleTokenCheck(data.token);
          setSignIn(true);
          setSignInError("");
          setSignInError("");
          handlePopup();
        }
      })
      .catch((err) => {
        console.log(err);
        setSignInError("Invalid email or password please try again");
      });
  };

  const handleSubmitSignup = ({ email, password, name }) => {
    mainApi
      .register(email, password, name)
      .then((res) => {
        if (res.data.email) {
          handlePopup();
          setSignInError("");
          setSignInError("");
          setIsRegisterSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupError("This email is not available");
      });
  };

  const handleSignOutClick = () => {
    setSignIn(false);
    localStorage.removeItem("token");
    setAccount({
      email: "",
      password: "",
      name: "",
    });
  };

  const handleShowMoreClick = () => {
    setShowMore(showMore + 3);
  };

  const handleCloseRegisterPopup = () => {
    setIsRegisterSuccess(!isRegisterSuccess);
  };

  // handle click link on RegistrationSuccess popup
  const handleLinkOnRegisterSuccess = () => {
    setHasAccount(true);
    handlePopup();
    handleCloseRegisterPopup();
  };

  // handle user token (checking user has token or not )
  const handleTokenCheck = (token) => {
    const localStorageToken = localStorage.getItem("token");

    if (token || localStorageToken) {
      setSignIn(true);
      mainApi
        .checkUserToken(token || localStorageToken)
        .then((res) => {
          if (res) {
            mainApi
              .getSaveArticle(token || localStorageToken)
              .then((res) => {
                setSavedCards(res.data);
              })
              .catch((err) => console.log(err));
            setAccount(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //useEffect to fetch api data of user and set to CurrentUserContext value(currentUser)
  //
  // if user already login allow user to pass throught to homepage by checking token
  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={[account, setAccount]}>
      <CurrentKeywordContext.Provider value={[keyword, setKeyword]}>
        <CurrentSavedCardsContext.Provider value={[savedCards, setSavedCards]}>
          <PopupWithForm
            isPopupOpened={isPopupOpened}
            onClose={handlePopup}
            onSignin={handleSubmitSignIn}
            onSignup={handleSubmitSignup}
            handleChange={handleSignInChange}
            hasAccount={hasAccount}
            handleHasAccount={handleHasAccount}
            signupError={signupError}
            signinError={signinError}
          />
          <RegistrationSuccess
            isRegisterSuccess={isRegisterSuccess}
            onClose={handleCloseRegisterPopup}
            handleRegistrationLink={handleLinkOnRegisterSuccess}
          />

          <Switch>
            <Route path="/" exact>
              <Header
                onSearchUpdate={handleSearchUpdate}
                onClickSignIn={handleSignInClick}
                onClickSignOut={handleSignOutClick}
                isSignIn={isSignIn}
                inArticleRoute={false}
              />

              {hasResult ? (
                isLoading ? (
                  <Preloader hasResult={true} />
                ) : cards.length > 0 ? (
                  <Main
                    isSignIn={isSignIn}
                    cards={cards}
                    inSavedNews={false}
                    showMore={showMore}
                    handleShowMoreClick={handleShowMoreClick}
                    onSignInNeededClick={handleSignInNeededCardClick}
                    savedCards={savedCards}
                  />
                ) : (
                  <Preloader hasResult={false} />
                )
              ) : (
                ""
              )}
              <About />
              <Footer />
            </Route>

            <ProtectedRoute path="/saved-news" isSignIn={isSignIn} toPath="/">
              <Navigation
                onClickSignIn={handleSignInClick}
                isSignIn={isSignIn}
                onClickSignOut={handleSignOutClick}
                username={account.username}
                inArticleRoute={true}
              />
              <SavedNewsHeader
                username={account.username}
                inSavedNews={true}
                savedCards={savedCards}
              />
              <Footer />
            </ProtectedRoute>
          </Switch>
        </CurrentSavedCardsContext.Provider>
      </CurrentKeywordContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
