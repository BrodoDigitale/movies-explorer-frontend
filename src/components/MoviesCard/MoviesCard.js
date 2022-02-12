import "./MoviesCard.css"
import { Link } from "react-router-dom";
import React from "react";

export function MoviesCard(props) {
     //Стейт лайка карточки
  const [isLiked, setIsLiked] = React.useState(false)
  const likeHandler =() => {setIsLiked(!isLiked)}
    function handleClick() {
        likeHandler()
    }  
    const buttonClassName = (
        `transition-button ${props.button} ${isLiked ? `${props.button}_active` : null}`
      ); 

    return(
        <li className="movie">
        <Link className="movie__img-link" to={{pathname: `${props.trailer}`}} target="_blank">
        <img className="movie__img" src={props.image} alt="постер фильма"/>
        </Link>
        <div className="movie__title-wrapper">
            <h2 className="movie__title">{props.nameRU}</h2>
            <button className={buttonClassName} onClick={handleClick} type="button">
            </button>
        </div>
        <p className="movie__duration">{props.duration}</p>
    </li>
    )
    }