import userpic from "../../images/profile-icon.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export function Header(props) {
  const loggedIn = props.loggedIn;

  return (
    <>
      {loggedIn ? (
        <header className="header">
          <div className="header__content-wrapper">
            <Logo />
            <Link className="header__nav-link header__nav-link_bold transition" to="/movies">
              Фильмы
            </Link>
            <Link className="header__nav-link link-transition" to="/saved-movies">
              Сохраненные фильмы
            </Link>
          </div>
          <Link className="header__nav-link header__nav-link_profile transition" to="/profile">
            <p>Аккаунт</p>
            <img src={userpic} alt="иконка юзера" />
          </Link>
          <button
            className="header__hamburger-menu transition"
            type="button"
            aria-label="Открыть_меню_навигации"
          />
        </header>
      ) : (
        <header className="header">
          <Logo />
          <div className="header__content-wrapper">
            <Link className="header__nav-link transition" to="/register">
              Регистрация
            </Link>
            <button
              className="header__login-button transition"
              type="submit"
              aria-label="Войти"
            >
              Войти
            </button>
          </div>
        </header>
      )}
    </>
  );
}
