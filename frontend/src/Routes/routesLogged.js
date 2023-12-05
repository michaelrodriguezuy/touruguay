//ir agregando segun las paginas que se vayan creando

import MisReservas from "../Components/pages/users/reservas/Bookings";
import MisFavoritos from "../Components/pages/users/favoritos/Favourites";
import MisDatos from "../Components/pages/users/dataUser/DataUser";

export const routesLogged = [
    {
        id: "booking",
        path: "/booking",
        Element: MisReservas,
    },
    {
        id: "favorite",
        path: "/favorite",
        Element: MisFavoritos,
    }    ,
    {
        id: "data",
        path: "/dataUser",
        Element: MisDatos,
    }

];
