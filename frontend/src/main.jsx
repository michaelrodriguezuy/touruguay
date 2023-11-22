import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { DataContextComponent } from "../src/Components/context/Context.jsx";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";

library.add(fas);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataContextComponent>
        <App />
      </DataContextComponent>
    </BrowserRouter>
  </React.StrictMode>
);
