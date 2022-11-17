import './App.css';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';

function App() {
  return (
    <body className="body">
      <Header />
      <Main />
      <About />
      <Footer />
    </body>
  );
}

export default App;
