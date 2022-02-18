import "./Login.css";
import { AuthForm } from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation/Validation";

export function Login(props) {

  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userEmail: "",
    userPassword: "",
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onLogin({
        email: values.userEmail,
        password: values.userPassword,
      });
    }
  };

  return (
    <main className="login">
      <AuthForm header="Рады видеть!">
        <form className="login__form" onSubmit={handleSubmit}>
          <label>
            <h3 className="login__input-title">E-mail</h3>
            <input
              className="login__input"
              id="userEmail"
              type="email"
              value={values.email}
              name="userEmail"
              onChange={(e) => handleChange(e)}
              required
              readOnly= {props.isLoading}
            />
          </label>
          <label>
            <h3 className="login__input-title">Пароль</h3>
            <input
              className="login__input"
              id="userPassword"
              type="password"
              name="userPassword"
              value={values.login}
              onChange={(e) => handleChange(e)}
              minLength="8"
              required
              readOnly= {props.isLoading}
            />
          </label>
          <div className="login__button-wrapper">
            <span
              className={`login__info-message 
             ${!isValid ? `login__info-message_active` : null}`}
            >
              {errors?.userName}
              {errors?.userEmail}
              {errors?.userPassword}
            </span>
            <span
              className={`login__info-message 
             ${props.loginError ? `login__info-message_active` : null}`}
            >
              {props.loginErrorMessage}
            </span>
            <button
              className="login__button 
            transition-button"
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
            <Link className="login__link transition-link" to="/signup">
              Ещё не зарегистрированы?
              <span className="login__link-span transition-link">
                {" "}
                Регистрация
              </span>
            </Link>
          </div>
        </form>
      </AuthForm>
    </main>
  );
}
