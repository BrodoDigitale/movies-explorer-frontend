import "./MoviesCard.css"

export function MoviesCard(props) {
  
    return(
        <li className="movie">
        <div  className="movie__img" style={{ backgroundImage: `url(${props.image})` }} />
        <div className="movie__title-wrapper">
            <h2 className="movie__title">{props.nameRU}</h2>
            <button className={props.button} type="button" aria-label="Сохранить">
            </button>
        </div>
        <p className="movie__duration">{props.duration}</p>
    </li>
    )
    }