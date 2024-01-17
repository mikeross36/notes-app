import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { NotesContextProvider } from "./context/NotesContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotesContextProvider>
  </React.StrictMode>
);
