import "./SearchForm.css"
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function SearchForm(props) {
    const location = useLocation();
    const [searchWord, setSearchWord] = useState(props.previousSearchWord);

    function handleSearch(e) {
      e.preventDefault();
      location.pathname === '/movies' ? 
      (props.onSearch(searchWord)) : (props.onSavedMoviesSearch(searchWord));
    }

    return(
        <section className="searchForm">
            <form className="searchForm__form"> 
                <label className="searchForm__panel">
                    <input 
                    type="search"  
                    className="searchForm__input"
                    id="searchForm__movie-input"
                    placeholder="Фильм"
                    aria-label="Искать фильм"
                    value={searchWord||""}
                    name="movieSearchInput"
                    onChange={e => setSearchWord(e.target.value)}
                    required
                    />
                    <button 
                    className="searchForm__button transition-button" 
                    type="submit"
                    onClick={handleSearch}
                    />
                </label>
                <div className="searchForm__switch">
                <label className="searchForm__switch-container" >
                     <input
                     id="short-movies"
                     onChange={props.onToggleSwitchClick}
                     className="searchForm__switch-checkbox" 
                     type="checkbox"
                     checked={location.pathname === '/movies' ? (props.isChecked ? true : false) : (props.savedIsChecked ? true : false)}
                     />
                    <p className="searchForm__switch-text">Короткометражки</p>
                </label>
                </div>
            </form>
        </section>
    )
}