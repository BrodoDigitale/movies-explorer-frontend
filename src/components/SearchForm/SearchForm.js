import "./SearchForm.css"
import React, { useState } from 'react';

export function SearchForm(props) {
    
    const [searchWord, setSearchWord] = useState("");
  
    function handleSearch(e) {
      e.preventDefault();
      props.onSearch(searchWord);
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
                     <input  className="searchForm__switch-checkbox" type="checkbox"/>
                    <p className="searchForm__switch-text">Короткометражки</p>
                </label>
                </div>
            </form>
        </section>
    )
}