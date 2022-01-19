import logo from '../../images/logo.svg'

export function Header(props) {
    return(
    <header className="header">
        <div className="header__container">
        <img className="header__logo" src={logo} alt="логотип Место" />
        <div className="header__text-wrapper">
        {props.children}
        </div>
        </div>
    </header>
    )
}
