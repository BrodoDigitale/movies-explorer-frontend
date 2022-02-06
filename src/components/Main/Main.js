import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Promo } from "../Promo/Promo";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";
import { AboutMe } from "../AboutMe/AboutMe";
import { Portfolio } from "../Portfolio/Portfolio";

export function Main(props) {
    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main>
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
        </main>
        <Footer/>
    </>
    )
}