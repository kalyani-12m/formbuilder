import { useState } from "react";
import { loginUser } from "../services/api";
import "../styles/auth.css";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  const res = await loginUser({
    email,
    password,
  });

  if (res.user) {
    localStorage.setItem("user", JSON.stringify(res.user));
    alert("Login successful!");
    onLogin(res.user);
  } else {
    alert(res.error);
  }
};

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)}
/>

      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p
        onClick={() => onSwitch && onSwitch()}
        style={{ cursor: "pointer" }}
      >
        New user? Register
      </p>
    </div>
  );
}