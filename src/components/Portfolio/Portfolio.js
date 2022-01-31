import "./Portfolio.css";
import { Link } from "react-router-dom";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import arrow from "../../images/portfolio-arrow.svg";

export function Portfolio() {
  return (
    <section className="portfolio">
     <div className="portfolio__wrapper">
      <SectionHeader title="Портфолио" modificator="sectionHeader_portfolio"/>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link className="portfolio__list-link" to="https://brododigitale.github.io/how-to-learn/">
            <p className="portfolio__list-text">Статичный сайт</p>
            <img
              className="portfolio__list-icon"
              src={arrow}
              alt="стрелка для перехода по ссылке"
            />
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__list-link" to="https://brododigitale.github.io/russian-travel/">
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <img
              className="portfolio__list-icon"
              src={arrow}
              alt="стрелка для перехода по ссылке"
            />
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__list-link" to="https://github.com/BrodoDigitale/react-mesto-api-full">
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <img
              className="portfolio__list-icon"
              src={arrow}
              alt="стрелка для перехода по ссылке"
            />
          </Link>
        </li>
      </ul>
      </div>
    </section>
  );
}
