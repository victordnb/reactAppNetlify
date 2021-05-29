import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/use-auth";

function RegisterPage() {
  const { register } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    register({ email, password });
    history.push("/tasks");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="email">Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
