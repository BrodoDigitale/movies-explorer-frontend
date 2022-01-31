import "./Login.css";
import { AuthForm } from "../AuthForm/AuthForm";

export function Login() {
  return (
    <section className="login">
      <AuthForm
        header="Рады видеть!"
        buttonName="Войти"
        linkText="Ещё не зарегистрированы? "
        linkLead="Регистрация"
        linkTo="/signup"
      >
        <label>
          <h3 className="authForm__input-title">E-mail</h3>
          <input
            className="authForm__input"
            type="email"
            name="userEmail"
            required
          />
        </label>
        <label>
          <h3 className="authForm__input-title">Пароль</h3>
          <input
            className="authForm__input"
            type="password"
            name="userPassword"
            required
          />
        </label>
      </AuthForm>
    </section>
  );
}
