import "./AboutMe.css"
import { Link } from "react-router-dom";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import studentPic from "../../images/Yulia.jpg"
import { student } from "../../utils/utils";



export function AboutMe() {
    return(
        <section className="aboutMe">
            <div className="aboutMe__wrapper">
            <SectionHeader title="Студент"/>
            <div className="aboutMe__info-wrapper">
            <div className="aboutMe__text-wrapper">
            <h3 className="aboutMe__name">{student.name}</h3>
            <p className="aboutMe__title">{student.title}, {student.age}</p>
            <p className="aboutMe__description">{student.description}</p>
            <nav>
            <ul className="aboutMe__links">
                <li><Link className="aboutMe__link" to={{ pathname: "https://github.com/BrodoDigitale"}} target="_blank">Github</Link></li>
                <li><Link className="aboutMe__link" to={{ pathname: "https://www.linkedin.com/in/yulia-sensi/"}} target="_blank">LinkedIn</Link></li>
            </ul>
        </nav>
            </div>
            <img className="aboutMe__photo" src={studentPic} alt="Фото студента"/>
            </div>
            </div>
        </section>
    )
}