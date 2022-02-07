import "./Login.css";
import { AuthForm } from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Передача данных инпутов во внешний обработчик
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onLogin({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  }

  return (
    <main className="login">
      <AuthForm header="Рады видеть!">
        <form className="login__form" onSubmit={handleSubmit}>
          <label>
            <h3 className="login__input-title">E-mail</h3>
            <input
              className="login__input"
              id="login__email"
              type="email"
              value={email || ""}
              name="userEmail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <h3 className="login__input-title">Пароль</h3>
            <input
              className="login__input"
              id="login__password"
              type="password"
              name="userPassword"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login__button-wrapper">
            <button className="login__button transition-button" type="submit">
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
