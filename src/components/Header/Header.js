import './Header.css';
import Navigation from '../Navigation/Navigation'
export default function Header(
  onSubmit,
  handleSearchChange
) {

  return (
    <header className="header">
      <Navigation />
      <div className="header__container-content">
        <h1 className="header__quote">
          What's going on in the world?
        </h1>
        <p className="header__content">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <form
          className="header__form_search"
          name="searchForm"
          onSubmit={onSubmit}
        >
          <fieldset className="header__fieldset">
            <label className="header__label">
              <input
                className="header__input_search"
                name="inputSearch"
                id="header-search"
                placeholder="Enter topic"
                minLength="2"
                maxLength="40"
                onChange={handleSearchChange}
                required
              />
            </label>
            <button
              type="submit"
              className="header__button_search"
            >
              Search
            </button>

          </fieldset>
        </form>
      </div>
    </header>
  )
}
