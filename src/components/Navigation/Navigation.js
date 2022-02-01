import userpic from "../../images/profile-icon.svg";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export function Navigation(props) {
  return (
    <nav className="nav">
    <div className="nav__wrapper">
     <Logo />
      <Link
        className="nav__link nav__link_bold"
        to="/movies"
      >
        Фильмы
      </Link>
      <Link className="nav__link" to="/saved-movies">
        Сохраненные фильмы
      </Link>
      </div>
      <Link
        className="nav__link nav__link_profile"
        to="/profile"
      >
        <p>Аккаунт</p>
        <img src={userpic} alt="иконка юзера" />
      </Link>
      <button
        className="nav__hamburger-menu"
        type="button"
        aria-label="Открыть_меню_навигации"
      />
    </nav>
  );
}
