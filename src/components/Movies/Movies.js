import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchBar } from "../SearchBar/SearchBar";

export function Movies(props) {
    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main>
        <SearchBar/>
        </main>
        <Footer/>
     </>
    )
}