//ir agregando segun las paginas que se vayan creando
import Home from "../Components/pages/Home";
import Detalle from "../Components/pages/products/Detail";
import Galeria from "../Components/pages/products/Galery";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },

  {
    id: "detalle",
    path: "/detalle/:productId",
    Element: Detalle,
  },

  {
    id: "galeria",
    path: "/galeria/:productId",
    Element: Galeria,
  },

];
