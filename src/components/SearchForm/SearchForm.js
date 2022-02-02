import "./SearchForm.css"

export function SearchForm() {
    return(
        <section className="searchForm">
            <form className="searchForm__form"> 
                <label className="searchForm__panel">
                    <input 
                    type="search"  
                    className="searchForm__input" 
                    placeholder="Фильм"
                    aria-label="Искать фильм"
                    />
                    <button className="searchForm__button" type="submit"/>
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