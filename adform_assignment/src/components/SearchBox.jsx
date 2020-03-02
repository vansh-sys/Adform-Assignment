import React from 'react';
import '../index.css';
import Translations from '../translations/constants';

const SearchBox = (props) => (
  <input
    type="text"
    onChange={props.onSearch}
    name={Translations.lowerName}
    placeholder={Translations.searchPlaceholder}
    className="search-box"
  />
);

export default SearchBox;
