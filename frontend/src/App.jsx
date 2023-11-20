import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/routes";
import "./index.css"
import Navbar from "./Components/layout/navbar/Navbar";
import Footer from "./Components/layout/footer/Footer";
import Home from "./Components/pages/Home";
import IniciarSesion from "./Components/pages/IniciarSesion";

library.add(fas);

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route element={<Home />} />
        <Route element={<Footer />}>
          <Route path='IniciarSesion' element={<IniciarSesion />} />

          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
