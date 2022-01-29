import "./Footer.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__header-wrapper">
          <h3 className="footer__header">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h3>
        </div>
        <div className="footer__links-wrapper">
          <p>&#169; 2022</p>
          <nav>
            <ul className="footer__nav">
              <li>
                <Link className="footer__nav-link" to="#">
                  Яндекс.Практикум
                </Link>
              </li>
              <li>
                <Link className="footer__nav-link" to="#">
                  Github
                </Link>
              </li>
              <li>
                <Link className="footer__nav-link" to="#">
                  Facebook
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
