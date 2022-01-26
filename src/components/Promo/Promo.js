import "./Promo.css"
import promoImg from "../../images/promo-image.svg"

export function Promo() {
    return(
        <section className="promo">
            <div className="promo__content-wrapper" >
            <div className="promo__background-overlay" /> 
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo__button" type="button" aria-label="Узнать больше">Узнать больше</button>
            </div>
            <img className="promo__img" src={promoImg} alt="Изображение земного шара" />
        </section>
    )

}