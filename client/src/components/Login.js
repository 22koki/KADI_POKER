import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        // Store the username in localStorage
        localStorage.setItem('username', username);

        // Redirect to the home page after successful login
        navigate('/Home');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Login</h2>
      </div>
      <div className='card-body'>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        {/* Add the button to lead to EditPassword */}
        <Link to="/editPassword">
          <button>Edit Password</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
