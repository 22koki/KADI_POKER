import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password do not match.");
      return;
    }

    // Check if the username is empty or has less than 3 characters
    if (!username || username.length < 3) {
      setMessage(
        "Username cannot be empty and must have at least 3 characters."
      );
      return;
    }

    // Check if the username contains only digits
    if (/^\d+$/.test(username)) {
      setMessage("Username cannot consist solely of integers.");
      return;
    }

    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        // Save username in local storage
        localStorage.setItem("username", username);

        // Redirect to the game page
        window.location.href = "/Home";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Signup</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSignup}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <br />
          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
