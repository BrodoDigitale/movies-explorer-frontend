import "./AuthForm.css";
import { Logo } from "../Logo/Logo";


export function AuthForm(props) {
    return (
    <section className="authForm">
        <Logo />
        <h1 className="authForm__header">{props.header}</h1>
        <div className="authForm__form-container">
        {props.children}
        </div>
    </section>
    )
}