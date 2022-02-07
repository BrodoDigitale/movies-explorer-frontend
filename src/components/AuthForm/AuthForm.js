import "./AuthForm.css";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";


export function AuthForm(props) {
    return (
    <section className="authForm">
        <Logo />
        <h1 className="authForm__header">{props.header}</h1>
        <div className="authForm__form-container">
        {props.children}
        </div>
        <div className="authForm__button-wrapper">
        <button className="authForm__button transition-button" type="submit">{props.buttonName}</button>
        <Link className="authForm__link transition-link" to={props.linkTo}>
        {props.linkText}
        <span className="authForm__link-span transition-link">{props.linkLead}</span>
        </Link>
        </div>
    </section>
    )
}