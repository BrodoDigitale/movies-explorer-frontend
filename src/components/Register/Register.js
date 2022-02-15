import "./Register.css";
import { AuthForm } from "../AuthForm/AuthForm";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation/Validation";

export function Register(props) {
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userName: "",
    userEmail: "",
    userPassword: "",
  })

  const handleSubmit =(e) => {
    e.preventDefault();
    if(isValid) {
      props.onRegister({
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
      });
    } 
  }
  return (
    <main className="register">
      <AuthForm header="Добро пожаловать!">
        <form className="register__form" onSubmit={handleSubmit}>
          <label>
            <h3 className="register__input-title">Имя</h3>
            <input
              placeholder="введите ваше имя"
              id="userName"
              className="register__input"
              type="text"
              minLength="2"
              maxLength="18"
              value={values.name}
              onChange={(e) => handleChange(e)}
              name="userName"
              required
            />
          </label>
          <label>
            <h3 className="register__input-title">E-mail</h3>
            <input
              placeholder="ваш email в формате pochta@pochta.com"
              id="userEmail"
              className="register__input"
              type="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
              name="userEmail"
              required
            />
          </label>
          <label>
            <h3 className="register__input-title">Пароль</h3>
            <input
              placeholder="пароль не менее 8 символов"
              id="userPassword"
              className="register__input"
              type="password"
              minLength="8"
              value={values.password}
              onChange={(e) => handleChange(e)}
              name="userPassword"
              required
            />
          </label>
            <span className={`register__info-message 
             ${!isValid ? `register__info-message_active` : null}`}>
            {errors?.userName}{errors?.userEmail}{errors?.userPassword}
            </span>
            <span className={`register__info-message 
             ${props.isRegistrationSuccessful ? 
             `register__info-message_active-success` : 
             props.isRegistrationError ?
             `register__info-message_active` : null}`}>
              {props.userMessage}
            </span>
          <div className="register__button-wrapper">
            <button
              className="register__button transition-button"
              type="submit"
              disabled={!isValid}
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
