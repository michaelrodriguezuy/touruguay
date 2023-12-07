//ir agregando segun las paginas que se vayan creando

import MisReservas from "../Components/pages/users/reservas/Bookings"; //CORREGIR
import MisFavoritos from "../Components/pages/users/favoritos/Favourites";
import MisDatos from "../Components/pages/users/dataUser/DataUser";
import Reserva from "../Components/pages/users/reservas/Booking";
import Confirmacion from "../Components/pages/users/reservas/Confirmacion";

export const routesLogged = [
    {
        id: "bookings",
        path: "/bookings",
        Element: MisReservas,
    },
    {
        id: "favorite",
        path: "/favorite",
        Element: MisFavoritos,
    },
    {
        id: "data",
        path: "/dataUser",
        Element: MisDatos,
    },

    {
        id: "booking/id",
        path: "/booking/:productId",
        Element: Reserva,
    },
    {
        id: "booking/id/confirm",
        path: "/booking/:productId/confirm",
        Element: Confirmacion,
    },

];
