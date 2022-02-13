import "./MoviesCard.css";
import { Link } from "react-router-dom";
import React from "react";

export function MoviesCard(props) {

  const thisMovie = props.movieCard
  //Стейт лайка карточки
  const [isLiked, setIsLiked] = React.useState(false);
  //удаление карточки
  const unlike = () => {
    setIsLiked(false);
    props.onUnlike(thisMovie);
  };
  //сохранение карточки
  const like = () => {
    setIsLiked(true);
    props.onLike(thisMovie);
  };
 // определяем - применить удаление или сохранение
  function handleClick() {
    isLiked ? unlike() : like();
  }
  //при отрисовке сохраненных карточек задаем им сразу лайк
  //а если это отрисовка после поиска определяем статус лайка карточки
  
  React.useEffect(() => {
    if(!isLiked) {
        const someCard = props.savedMovies.find((likedMovie) => likedMovie.movieId === thisMovie.id)
        if(someCard) {
            //если айди карточки есть в сохраненных, то она лайкнута
            setIsLiked(true)
        } else {
            //если не нашли айди 
            setIsLiked(false)
    } 
  }
 }, []);


  const buttonClassName = `transition-button ${props.button} ${
    isLiked ? `${props.button}_active` : null
  }`;

  return (
    <li className="movie">
      <Link
        className="movie__img-link"
        to={{ pathname: `${props.trailer}` }}
        target="_blank"
      >
        <img className="movie__img" src={props.image} alt="постер фильма" />
      </Link>
      <div className="movie__title-wrapper">
        <h2 className="movie__title">{props.nameRU}</h2>
        <button
          className={buttonClassName}
          onClick={handleClick}
          type="button"
        ></button>
      </div>
      <p className="movie__duration">{props.duration}</p>
    </li>
  );
}
