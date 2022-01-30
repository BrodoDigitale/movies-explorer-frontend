import "./SearchBar.css"


export function SearchBar() {
    return(
        <section className="searchBar">
            <form className="searchBar__form"> 
                <label className="searchBar__panel">
                    <input 
                    type="search"  
                    className="searchBar__input" 
                    placeholder="Фильм"
                    aria-label="Искать фильм"
                    />
                    <button className="searchBar__button" type="submit"/>
                </label>
                <div className="searchBar__switch">
                <label className="searchBar__switch-container" >
                     <input  className="searchBar__switch-checkbox" type="checkbox"/>
                    <p className="searchBar__switch-text">Короткометражки</p>
                </label>
                </div>
            </form>
        </section>
    )
}