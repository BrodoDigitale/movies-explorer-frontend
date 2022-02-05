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
        <form className="login__form">
        <label>
          <h3 className="login__input-title">E-mail</h3>
          <input
            className="login__input"
            type="email"
            name="userEmail"
            required
          />
        </label>
        <label>
          <h3 className="login__input-title">Пароль</h3>
          <input
            className="login__input"
            type="password"
            name="userPassword"
            required
          />
        </label>
        </form>
      </AuthForm>
    </section>
  );
}
