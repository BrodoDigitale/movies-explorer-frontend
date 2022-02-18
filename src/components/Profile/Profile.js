import React, { useState, useRef } from "react";
import "./Profile.css";
import { Header } from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../Validation/Validation";

export function Profile(props) {
  //Подписка на контекст юзера
  const currentUser = React.useContext(CurrentUserContext);

  //стейт того, что данные изменились
  const [dataIsChanged, setDataIsChanged] = useState(false);
  //рефы инпутов
  const nameRef = useRef("");
  const emailRef = useRef("");
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userName: nameRef.current.value,
    userEmail: emailRef.currentValue,
  });

  //задаем условие, при котором кнопка активна(данные изменены)
  React.useEffect(() => {
    nameRef.current.value === currentUser.name &&
    emailRef.current.value === currentUser.email
      ? setDataIsChanged(false)
      : setDataIsChanged(true);
  }, [values.userName, values.userEmail, currentUser.email, currentUser.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onUpdateProfile({
        name: nameRef.current.value,
        email: emailRef.current.value,
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
                  placeholder="Введите ваше имя"
                  name="userName"
                  maxLength="30"
                  minLength="2"
                  type="text"
                  defaultValue={currentUser.name}
                  onChange={(e) => handleChange(e)}
                  ref={nameRef}
                  required
                  //деактивация при загрузке
                  readOnly={props.isLoading}
                />
              </label>
              <label className="profile__input-label">
                Почта
                <input
                  className="profile__input"
                  id="userEmail"
                  placeholder="Введите ваш email"
                  name="userEmail"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  defaultValue={currentUser.email}
                  ref={emailRef}
                  required
                  //деактивация при загрузке
                  readOnly={props.isLoading}
                />
              </label>
              <span
                className={`profile__info-message 
             ${!isValid ? `profile__info-message_active` : null}`}
              >
                {errors?.userName}
                {errors?.userEmail}
              </span>
              <span
                className={`profile__info-message 
             ${
               props.isProfileUpdateSuccessful
                 ? `profile__info-message_active-success`
                 : `profile__info-message_active`
             }`}
              >
                {props.isProfileUpdateSuccessful
                  ? `${props.profileUpdateMessage}`
                  : `${props.profileErrorMessage}`}
              </span>
            </div>
          </div>
          <div className="profile__buttons-wrapper">
            <button
              className="profile__button transition-button"
              type="submit"
              aria-label="Редактировать"
              disabled={!isValid || !dataIsChanged}
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
