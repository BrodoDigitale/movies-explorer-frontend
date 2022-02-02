import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Logo.css";

export function Logo() {
  return (
    <Link className="logo" to="/">
      <img src={logo} alt="логотип" />
    </Link>
  );
}
