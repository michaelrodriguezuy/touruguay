import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
        </Route>
      </Route>
      <Route path="IniciarSesion" element={<IniciarSesion />} />
      <Route path="CrearCuenta" element={<CrearCuenta />} />

      {/* Users logueados*/}
      <Route element={<ProtectedUsers />}>
        <Route element={<Navbar />}>
          <Route element={<Footer />}>
            {routesLogged.map(({ id, path, Element }) => (
              <Route key={id} path={path} element={<Element />} />
            ))}
          </Route>
        </Route>
      </Route>

      {/* Admin logueados*/}
      <Route element={<ProtectedAdmin />}>
        <Route element={<Navbar />}>
          <Route element={<Footer />}>
            <Route path="AdminPanel" element={<AdminPanel />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
