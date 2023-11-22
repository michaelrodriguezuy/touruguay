//ir agregando segun las paginas que se vayan creando

import Reserva from "../Components/pages/users/reservas/Reserva";
import Favoritos from "../Components/pages/users/favoritos/Favoritos";

export const routesLogged = [
    {
        id: "booking",
        path: "/booking",
        Element: Reserva,
    },
    {
        id: "favorite",
        path: "/favorite",
        Element: Favoritos,
    }    
];
