import React from "react";
import "./Profile.css";
import { Header } from "../Header/Header";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



export function Profile(props) {
//Задание стейта 

const [userEmail, setUserEmail] = React.useState("");
const [userName, setUserName] = React.useState("");

//Подписка на контекст юзера
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(currentUser.userName);
    setUserEmail(currentUser.userEmail);
  }, [currentUser]);

//Управление полями
function userNameHandleChange(e) {
    setUserName(e.target.value);
  }
  function userEmailHandleChange(e) {
    setUserEmail(e.target.value);
  }

function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateProfile({
      name: userName,
      email: userEmail,
    });
  }
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
      <form className="profile" onSubmit={handleSubmit}>
        <div className="profile__wrapper">
          <h1 className="profile__header">Привет, {currentUser.name}!</h1>
          <div className="profile__inputs-wrapper">
            <label className="profile__input-label">
              Имя
              <input
                className="profile__input"
                id="profile__name"
                placeholder={currentUser.name}
                name="userName"
                maxLength="30"
                minLength="2"
                type="text"
                value={userName||""}
                onChange={userNameHandleChange}
                required
              />
            </label>
            <label className="profile__input-label">
              Почта
              <input
                className="profile__input"
                id="profile__email"
                placeholder={currentUser.email}
                name="userEmail"
                type="email"
                value={userEmail||""}
                onChange={userEmailHandleChange}
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
            onClick={props.handleUpdateProfile}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_red transition-button"
            type="submit"
            aria-label="Выйти из аккаунта"
            onClick={props.handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
      </main>
    </>
  );
}
