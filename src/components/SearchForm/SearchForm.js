import './SearchForm.css';

export default function SearchForm(
  onSumbitSearch,
  handleSearchChange
) {


  return (
    <form
      className="search__form"
      name="searchForm"
      onSubmit={onSumbitSearch}
    >
      <fieldset className="search__fieldset">
        <label className="search__label">
          <input
            className="search__input"
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
          className="search__button"
        >
          Search
        </button>

      </fieldset>
    </form>
  )
}
