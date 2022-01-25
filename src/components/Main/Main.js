import "./Main.css"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Promo } from "../Promo/Promo";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";
import { AboutMe } from "../AboutMe/AboutMe";
import { Portfolio } from "../Portfolio/Portfolio";

export function Main(props) {
    return(
    <main className="main">
        <Header 
        loggedIn = {props.loggedIn}
        />
        <Promo/>
    </main>
    )
}