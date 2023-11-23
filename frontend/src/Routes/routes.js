//ir agregando segun las paginas que se vayan creando
import Home from "../Components/pages/Home";
import IniciarSesion from "../Components/pages/IniciarSesion";
import CrearCuenta from "../Components/pages/CrearCuenta";
import Detalle from "../Components/pages/Detalle";
import AdminPanel from "../Components/layout/panel/AdminPanel";
import Galeria from "../Components/pages/Galeria";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },  

  { id: "iniciarSesion", path: "/iniciarSesion", Element: IniciarSesion },

  { id: "crearCuenta", path: "/crearCuenta", Element: CrearCuenta },

  {id: "detalle",
  path: "/detalle",
  Element: Detalle,},

  {id: "galeria",
  path: "/galeria",
  Element: Galeria,},

  { id: "adminPanel", path: "/adminPanel", Element: AdminPanel },
];
