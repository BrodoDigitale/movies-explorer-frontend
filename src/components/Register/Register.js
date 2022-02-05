import "./Register.css";
import { AuthForm } from "../AuthForm/AuthForm";

export function Register() {
  return (
    <section className="register">
      <AuthForm
        header="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        linkText="Уже зарегистрированы? "
        linkLead="Войти"
        linkTo="/signin"
      >
      <form className="register__form">
        <label>
          <h3 className="register__input-title">Имя</h3>
          <input
            className="register__input"
            type="email"
            name="userEmail"
            required
          />
        </label>
        <label>
          <h3 className="register__input-title">E-mail</h3>
          <input
            className="register__input"
            type="email"
            name="userEmail"
            required
          />
        </label>
        <label>
          <h3 className="register__input-title">Пароль</h3>
          <input
            className="register__input"
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