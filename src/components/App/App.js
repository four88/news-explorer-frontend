import './App.css';
import { useState, useEffect } from 'react';
import { CurrentKeywordContext } from '../../contexts/CurrentKeywordContext';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';

function App() {

  const [keyword, setKeyword] = useState("");

  const card = {
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1743&q=80",
    date: "13 Jan 2019",
    title: "Meow",
    content: 'fdkalj;fkldajfkjaklfjkdlafkljakljkjakfakslfjklasdjfklsajf',
    cardSource: 'fkjaldjlkfjdakljfkla'
  }


  const handleSearchUpdate = (evt) => {
    // send keyword to api
    console.log(keyword)
  }

  return (
    <CurrentKeywordContext.Provider value={[keyword, setKeyword]}>
      <div className="body">
        <Header
          onSearchUpdate={handleSearchUpdate}
        />
        <Main
          card={card}
        />
        <About />
        <Footer />
      </div>
    </CurrentKeywordContext.Provider>
  );
}

export default App;
