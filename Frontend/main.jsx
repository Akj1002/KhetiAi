import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import "./src/i18n";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
