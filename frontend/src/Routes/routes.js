
//ir agregando segun las paginas que se vayan creando
import Home from "../Components/pages/Home";
import IniciarSesion from "../Components/pages/IniciarSesion";
import CrearCuenta from "../Components/pages/CrearCuenta";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },  

  {id: "iniciarSesion",
  path: "/iniciarSesion",
  Element: IniciarSesion,},

  {id: "crearCuenta",
  path: "/crearCuenta",
  Element: CrearCuenta,},

];
