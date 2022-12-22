import './SearchForm.css';
import { useContext } from 'react';
import { CurrentKeywordContext } from '../../contexts/CurrentKeywordContext';

export default function SearchForm({
  onSearchUpdate
}) {

  const [keyword, setKeyword] = useContext(CurrentKeywordContext);

  const handleSearchChange = (evt) => {
    setKeyword(evt.target.value)
    console.log(keyword)
  }

  const handleSumbitSearch = (evt) => {
    evt.preventDefault();
    onSearchUpdate(keyword)
  }

  return (
    <form
      className="search_form"
      name="searchForm"
      onSubmit={handleSumbitSearch}
    >
      <fieldset className="search_form__fieldset">
        <label className="search_form__label">
          <input
            className="search_form__input"
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
          className="search_form__button"
        >
          Search
        </button>
      </fieldset>
    </form>
  )
}
