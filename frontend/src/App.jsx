import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/routes";

import Navbar from "./Components/layout/navbar/Navbar";

import Footer from "./Components/layout/footer/Footer";
import Home from "./Components/pages/Home";
library.add(fas);

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route element={<Footer />}>
         
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}

        </Route>
      </Route>      
    </Routes>
  );
}

export default App;
