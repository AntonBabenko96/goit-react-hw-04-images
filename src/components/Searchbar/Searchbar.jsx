import { Component } from 'react';

import PropTypes from 'prop-types';

import css from '../Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleChange = event => {
    const search = event.target.value;
    this.setState({ search });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { search } = this.state;
    const { onSubmit } = this.props;
    onSubmit(search);

    this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }

  render() {
    return (
      <>
        <header className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.Button}>
              <span className={css.ButtonLabel}>Search</span>
            </button>

            <input
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
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
  }
}
