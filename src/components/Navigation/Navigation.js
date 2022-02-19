import React, { useEffect } from 'react';
import userpic from "../../images/profile-icon.svg";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { HamburgerButton } from "../HamburgerButton/HamburgerButton";

export function Navigation() {
//Стейт гамбургер меню
const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);
//Открытие меню
function openHamburgerMenu() {
  setIsHamburgerMenuOpen(true)
}
//Закрытие по нажатию на кнопку
function closeHamburgerMenu () {
  setIsHamburgerMenuOpen(false)
}
//Закрытие по нажатию на esc
    useEffect(() => {
      const closeByEscape = (e) => {
        if (e.key === 'Escape') {
          closeHamburgerMenu();
        }
      }
      document.addEventListener('keydown', closeByEscape)
      //!!clean up функция через return
      return () => document.removeEventListener('keydown', closeByEscape)
  }, [])
//Закрытие по нажатию на свободное место за попапом
  useEffect(() => {
    const closeByClick = (e) => {
      if (e.target.classList.contains('hamburgerMenu')) {
        closeHamburgerMenu();
      }
      e.stopPropagation()
    }
    document.addEventListener('click', closeByClick)
    return () => document.removeEventListener('click', closeByClick)
}, [])

  return (
    <nav className="nav">
    <div className="nav__wrapper">
     <Logo />
      <Link
        className="nav__link"
        to="/movies"
      >
        Фильмы
      </Link>
      <Link className="nav__link" to="/saved-movies">
        Сохраненные фильмы
      </Link>
      </div>
      <Link
        className="nav__profile-link transition-link"
        to="/profile"
      >
        <p>Аккаунт</p>
        <img src={userpic} alt="иконка юзера" />
      </Link>
      <HamburgerButton
       isOpen={isHamburgerMenuOpen}
       onHamburgerButtonClick={openHamburgerMenu}
       onClose={closeHamburgerMenu}
      />
    </nav>
  );
}
