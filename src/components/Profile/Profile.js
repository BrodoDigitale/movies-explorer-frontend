import React from "react";
import "./Profile.css";
import { Header } from "../Header/Header";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from "../Validation/Validation";



export function Profile(props) {

  //Подписка на контекст юзера
  const currentUser = React.useContext(CurrentUserContext);

const { values, isValid, handleChange, errors } = useFormWithValidation({
  userName: "",
  userEmail: "",
});

const handleSubmit = (e) => {
  e.preventDefault();
  if (isValid) {
    props.onUpdateProfile({
      name: values.userName,
      email: values.userEmail,
    });
  }
};

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
                id="userName"
                placeholder={currentUser.name}
                name="userName"
                maxLength="30"
                minLength="2"
                type="text"
                value={values.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label className="profile__input-label">
              Почта
              <input
                className="profile__input"
                id="userEmail"
                placeholder={currentUser.email}
                name="userEmail"
                type="email"
                value={values.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <span className={`profile__info-message 
             ${!isValid ? `profile__info-message_active` : null}`}>
            {errors?.userName}{errors?.userEmail}
            </span>
            <span className={`profile__info-message 
             ${props.isProfileUpdateSuccessful ? 
             `profile__info-message_active-success` : 
             `profile__info-message_active` 
            }` }>
              {props.isProfileUpdateSuccessful ? `${props.profileUpdateMessage}` : `${props.profileErrorMessage}`}
            </span>
          </div>
        </div>
        <div className="profile__buttons-wrapper">
          <button
            className="profile__button transition-button"
            type="submit"
            aria-label="Редактировать"
            disabled={!isValid}
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
