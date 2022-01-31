import "./AuthForm.css";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";


export function AuthForm(props) {
    return (
    <section>
        <Logo />
        <form className="authForm" autoComplete="off">
        <h1 className="authForm__header">{props.header}</h1>
        {props.children}
        </form>
        <button className="authForm__button" type="submit">{props.buttonName}</button>
        <Link className="authForm__link" to={props.linkTo}>
        {props.linkText}
        <span className="authForm__link_lead">{props.linkLead}</span>
        </Link>
    </section>
    )
}