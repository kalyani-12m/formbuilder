import { useState } from "react";
import { loginUser } from "../services/api";
import "../styles/auth.css";

export default function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });

      if (res?.token) {
        localStorage.setItem("token", res.token);

        alert("Login successful!");

        if (onLogin) onLogin(res.token);
      } else {
        alert(res?.error || "Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
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