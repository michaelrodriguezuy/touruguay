import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from './Components/context/dataContext'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";
import AuthContextComponent from "./Components/context/AuthContext.jsx";

library.add(fas);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextComponent >
      <DataProvider>
        <App />
      </DataProvider>
    </AuthContextComponent>
    </BrowserRouter>
  </React.StrictMode>
);
