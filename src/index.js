import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import MyHeader from "./Header.js";
import Sidebar from "./Sidebar.js";
import App from "./App.js";
import MainContentArea from "./ContentArea.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <MyHeader />
    {/* <Sidebar /> */}
    <App />
    {/* <MainContentArea /> */}
  </StrictMode>
);