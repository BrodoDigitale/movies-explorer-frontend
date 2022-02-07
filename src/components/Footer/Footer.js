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
        <div className="footer__content-wrapper">
          <p className="footer__year">&#169; 2022</p>
          <ul className="footer__links">
            <li>
              <Link
                className="footer__link transition-link"
                to={{ pathname: "https://practicum.yandex.ru/" }}
                target="_blank"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link
                className="footer__link transition-link"
                to={{ pathname: "https://github.com/BrodoDigitale" }}
                target="_blank"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                className="footer__link transition-link"
                to={{ pathname: "https://www.linkedin.com/in/yulia-sensi/" }}
                target="_blank"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
