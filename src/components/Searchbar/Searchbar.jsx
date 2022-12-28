import { useState } from 'react';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const onChange = event => {
    setText(event.target.value);
  };

  const onSubmitEvent = ev => {
    ev.preventDefault();
    if (!text) return;
    onSubmit({ text });
    setText('');
    return;
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmitEvent}>
        <input
          className={css.serchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
        <button type="submit" className={css.searchButton}>
          &#128269;
        </button>
      </form>
    </header>
  );
};
