import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import MyHeader from "./Header.js";
import App from "./App.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <MyHeader />
    <App />
  </StrictMode>
);