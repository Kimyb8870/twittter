import React, { useState } from "react";
import { authService } from "../fbInstance";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email": {
        setEmail(value);
        break;
      }
      case "password": {
        setPassword(value);
        break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          name="password"
          onChange={handleChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Create Account" : "Log In"}
      </span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
      </div>
    </div>
  );
};

export default Auth;
