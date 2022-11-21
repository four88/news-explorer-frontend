import './Main.css';
import Card from '../Card/Card.js';

export default function Main() {

  return (
    <section className="main">
      <div className='main__container'>
        <h1 className='main__heading'>
          Search result
        </h1>
        <ul className='main__cards'>
          <Card
            cardDate="November 4, 2020"
            cardTitle="Everyone Needs a Special 'Sit spot' in Nature"
            cardContent="dfakjlfjkadljkalfklfjdjlkajfklajdsfklfdjsalkfjkladfjklajdsklfjaklsdj
            fdaskjlfjlakdfjklajfkljadskfakdlsajfa;from
            fdakjfkdlasjfkldjfkljaklfjdjfa;kljdfakjfkjaklfjadkajf
            fdasklfjdjfaklfjdkladjsfkjakldfjakdfjakajfdkjdfkjkadsjfkadsjfk
            fdasfkljafjajdflkjafkljdlfdaksljfkldjfkldjaskfljkldfjkkfdljaf
            fkdalsjfkldajsfkljaksldfjkaldsfjkdlafjkl;djfkl;fjfdaks;ljfdklfjkadls
            fkadlsjfklsdfjkljfdasfsafdjlk"
            cardSource="TREEHUGEER"
          />
        </ul>
      </div>
    </section>
  )
}
