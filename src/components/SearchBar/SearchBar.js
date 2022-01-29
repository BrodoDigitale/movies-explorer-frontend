import "./SearchBar.css"


export function SearchBar() {
    return(
        <div className="SearchBar">
            <form className="SearchBar__form"> 
                <label>
                    <input 
                    type="search"  
                    className="SearchBar__input" 
                    placeholder="Фильм"
                    aria-label="Искать фильм"
                    />
                    <button className="SearchBar__button" type="submit"/>
                </label>
                <label form className="SearchBar__switch">
                     <input type="checkbox"/>
                    <p>короткометражки</p>
                </label>
            </form>
        </div>
    )
}