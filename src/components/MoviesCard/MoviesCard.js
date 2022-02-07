import "./MoviesCard.css"

export function MoviesCard(props) {
  
    return(
        <li className="movie">
        <div>
        <img className="movie__img" src={props.image} alt="постер фильма"/>
        <div className="movie__title-wrapper">
            <h2 className="movie__title">{props.nameRU}</h2>
            <button className={`transition-button ${props.button}`} type="button" aria-label="Сохранить">
            </button>
        </div>
        </div>
        <p className="movie__duration">{props.duration}</p>
    </li>
    )
    }