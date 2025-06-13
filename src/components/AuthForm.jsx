import React, { useState } from "react";
import { login, signup } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

export default function AuthForm({ isSignup }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await signup(user);
        alert("Signup success");
        navigate("/login");
      } else {
        const res = await login(user);
        localStorage.setItem("token", res.data.token);
        alert("Login success");
        navigate("/employees");
      }
    } catch {
      alert(`${isSignup ? "Signup" : "Login"} failed`);
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSubmit}>{isSignup ? "Signup" : "Login"}</button>

      <p>
        {isSignup ? (
          <>Already have an account? <Link to="/login">Login</Link></>
        ) : (
          <>Don't have an account? <Link to="/signup">Register</Link></>
        )}
      </p>
    </div>
  );
}
