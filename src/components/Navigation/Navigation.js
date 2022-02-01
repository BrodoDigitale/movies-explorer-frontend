import userpic from "../../images/profile-icon.svg";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";

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
        className="nav__profile-link"
        to="/profile"
      >
        <p>Аккаунт</p>
        <img src={userpic} alt="иконка юзера" />
      </Link>
      <HamburgerMenu/>
    </nav>
  );
}
