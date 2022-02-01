import "./Header.css";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

export function Header(props) {
  const loggedIn = props.loggedIn;

  return (
    <>
      {loggedIn ? (
        <header className="header">
          <Navigation/>
        </header>
      ) : (
        <header className="header">
          <div className="header__content-wrapper">
          <Logo />
          <div className="header__links">
            <Link className="header__link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__link header__link_black" to="/signin">
              Войти
            </Link>
          </div>
          </div>
        </header>
      )}
    </>
  );
}
