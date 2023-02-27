import { useState } from 'react';

import PropTypes from 'prop-types';

import css from '../Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');
  const handleChange = event => {
    const search = event.target.value;
    setSearch(search);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };
  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.Button}>
            <span className={css.ButtonLabel}>Search</span>
          </button>

          <input
            name="search"
            value={search}
            onChange={handleChange}
            className={css.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
