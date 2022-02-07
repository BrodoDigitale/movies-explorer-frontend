import "./Register.css";
import { AuthForm } from "../AuthForm/AuthForm";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({
      name,
      email,
      password,
    });
    setName("");
    setEmail("");
    setPassword("");
  }
  return (
    <main className="register">
      <AuthForm header="Добро пожаловать!">
        <form className="register__form" onSubmit={handleSubmit}>
          <label>
            <h3 className="register__input-title">Имя</h3>
            <input
              id="userName"
              className="register__input"
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              name="userName"
              required
            />
          </label>
          <label>
            <h3 className="register__input-title">E-mail</h3>
            <input
              id="userEmail"
              className="register__input"
              type="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              name="userEmail"
              required
            />
          </label>
          <label>
            <h3 className="register__input-title">Пароль</h3>
            <input
              id="userPassword"
              className="register__input"
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              name="userPassword"
              required
            />
          </label>
          <div className="register__button-wrapper">
            <button
              className="register__button transition-button"
              type="submit"
            >
              Зарегистрироваться
            </button>
            <Link className="register__link transition-link" to="/signin">
              Уже зарегистрированы?
              <span className="register__link-span transition-link">
                {" "}
                Войти
              </span>
            </Link>
          </div>
        </form>
      </AuthForm>
    </main>
  );
}
