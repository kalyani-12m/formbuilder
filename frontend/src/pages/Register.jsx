import { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/auth.css";

export default function Register({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  const res = await registerUser({
    email,
    password,
  });

  if (res.error) alert(res.error);
  else alert("Registered successfully!");
};

  return (
    <div className="auth-container">
      <h2>Register</h2>

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