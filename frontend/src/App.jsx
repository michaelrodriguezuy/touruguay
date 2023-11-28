import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes/routes";
import { routesLogged } from "./Routes/routesLogged";
import Navbar from "./Components/layout/navbar/Navbar";
import Footer from "./Components/layout/footer/Footer";
import IniciarSesion from "./Components/pages/login/IniciarSesion";
import AdminPanel from "./Components/pages/panel/AdminPanel";
import "./App.css";
import "./index.css";
import CrearCuenta from "./Components/pages/registro/CrearCuenta";
import ProtectedAdmin from "./Routes/ProtectedAdmin";
import ProtectedUsers from "./Routes/ProtectedUsers";

library.add(fas);

function App() {
  return (
    <Routes>
      {/* Todos */}
      <Route element={<Navbar />}>
        <Route element={<Footer />}>
          <Route path="IniciarSesion" element={<IniciarSesion />} />
          <Route path="CrearCuenta" element={<CrearCuenta />} />
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
          {/* Users logueados*/}
          <Route element={<ProtectedUsers />}>
            {routesLogged.map(({ id, path, Element }) => (
              <Route key={id} path={path} element={<Element />} />
            ))}
          </Route>

          {/* Admin logueados*/}
          <Route element={<ProtectedAdmin />}>
            <Route path="AdminPanel" element={<AdminPanel />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
