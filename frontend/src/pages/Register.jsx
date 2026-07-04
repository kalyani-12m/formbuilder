import { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/auth.css";

export default function Register({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await registerUser({ username, password });

      if (res?.error) {
        alert(res.error);
        return;
      }

      alert("Registered successfully!");

      if (onSwitch) onSwitch(); // SAFE CALL
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

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

      <button onClick={handleRegister}>Register</button>

      <p
        onClick={() => onSwitch && onSwitch()}
        style={{ cursor: "pointer" }}
      >
        Already have an account? Login
      </p>
    </div>
  );
}