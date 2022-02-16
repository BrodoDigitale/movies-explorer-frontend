import "./AboutProject.css";
import { SectionHeader } from "../SectionHeader/SectionHeader";

export function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <SectionHeader title="О проекте" />
      <ul className="aboutProject__description-table">
        <li>
          <h3 className="aboutProject__description-header">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="aboutProject__description-header">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="aboutProject__timeline">
        <p className="aboutProject__timeline-cell aboutProject__timeline-cell_black">
          1 неделя
        </p>
        <p className="aboutProject__timeline-cell aboutProject__timeline-cell_grey">
          4 недели
        </p>
        <p className="aboutProject__timeline-cell">Back-end</p>
        <p className="aboutProject__timeline-cell">Front-end</p>
      </div>
    </section>
  );
}
