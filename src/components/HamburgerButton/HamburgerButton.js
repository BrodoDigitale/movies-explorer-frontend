import "./HamburgerButton.css";
import { Link } from "react-router-dom";
import userpic from "../../images/profile-icon.svg";

export function HamburgerButton(props) {
  return (
    <>
      <button
        className="hamburgerButton transition-button"
        type="button"
        aria-label="Открыть_меню_навигации"
        onClick={props.onHamburgerButtonClick}
      ></button>
      <div className={`hamburgerMenu ${props.isOpen ? 'hamburgerMenu_opened' : null}`}>
        <button
          className="hamburgerMenu__close-button transition-button"
          type="button"
          area-label="Закрыть"
          onClick={props.onClose}
        />
        <div className="hamburgerMenu__wrapper">
          <div className="hamburgerMenu__links-wrapper">
            <Link className="hamburgerMenu__link " to="/">
              Главная
            </Link>
            <Link className="hamburgerMenu__link " to="/movies">
              Фильмы
            </Link>
            <Link className="hamburgerMenu__link" to="/saved-movies">
              Сохраненные фильмы
            </Link>
          </div>
          <Link className="hamburgerMenu__profile-link transition-link" to="/profile">
          <p>Аккаунт</p>
          <img src={userpic} alt="иконка юзера" />
        </Link>
        </div>
      </div>
    </>
  );
}
