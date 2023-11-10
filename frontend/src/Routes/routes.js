
//ir agregando segun las paginas que se vayan creando
import About from "../Components/pages/About";
import Home from "../Components/pages/Home";
import IniciarSesion from "../Components/pages/IniciarSesion";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },  
  //ir agregando segun las paginas que se vayan creando
  {id: "about",
  path: "/about",
  Element: About,},

  {id: "iniciarSesion",
  path: "/iniciarSesion",
  Element: IniciarSesion,},

];
