import React from "react";
import "./Profile.css";
import { Header } from "../Header/Header";

export function Profile(props) {
  const [userName, setUserName] = React.useState("Незнакомец");
  const [userEmail, setUSerEmail] = React.useState("some.mailbox@gmail.com");

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="profile">
        <div className="profile__wrapper">
          <h1 className="profile__header">Привет, {userName}!</h1>
          <div className="profile__inputs-wrapper">
            <label className="profile__input-label">
              Имя
              <input
                className="profile__input"
                placeholder={userName}
                name="userName"
                maxLength="30"
                minLength="2"
                type="text"
                required
              />
            </label>
            <label className="profile__input-label">
              Почта
              <input
                className="profile__input"
                placeholder={userEmail}
                name="userEmail"
                type="email"
                required
              />
            </label>
          </div>
        </div>
        <div className="profile__buttons-wrapper">
          <button
            className="profile__button transition-button"
            type="submit"
            aria-label="Редактировать"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_red transition-button"
            type="submit"
            aria-label="Редактировать"
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}
