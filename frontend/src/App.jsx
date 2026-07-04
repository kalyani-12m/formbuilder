import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FormView from "./pages/FormView";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("login");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 🌍 PUBLIC FORM ROUTE (NO LOGIN REQUIRED)
  const path = window.location.pathname;

  if (path.startsWith("/form/")) {
    const formId = path.split("/form/")[1];
    return <FormView id={formId} />;
  }

  // 🔐 LOGIN GATE ONLY FOR APP
  if (!isLoggedIn) {
    return (
      <>
        {page === "login" ? (
          <Login
            onLogin={handleLogin}
            onSwitch={() => setPage("register")}
          />
        ) : (
          <Register onSwitch={() => setPage("login")} />
        )}
      </>
    );
  }

  return <Home />;
}