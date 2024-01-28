// Import necessary modules
import React, { useState } from 'react';import { useHistory } from 'reactrouter-dom';

// Define the Login component
const Login = () => {
  // Initialize state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Use the useHistory hook to programmatically navigate to other pages
  const history = useHistory();

  // Define the handleLogin function to handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Define the login endpoint URL
    const url = 'https://example.com/api/login';

    try {
      // Send a POST request to the login endpoint with the username and password
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      // Parse the response as JSON
      const data = await response.json();

      // If the login was successful, navigate to the gamepage
      if (data.success) {
        navigate('/Home');
      } else {
        // If the login was unsuccessful, display an error message
        setMessage(data.message);
      }
    } catch (error) {
      // If there was an error during the request, log it to the console
      console.error('Error during login:', error);
    }
  };

  // Return the JSX for the Login component
  return (
    <div>
      {/* Display a heading for the login page */}
      <h2>Login</h2>

      {/* Define a form for the user to enter their username and password */}
      <form onSubmit={handleLogin}>
        {/* Display a label and input field for the username */}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />

        {/* Display a label and input field for the password */}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />

        {/* Display a submit button for the form */}
        <button type="submit">Login</button>
      </form>

      {/* If there is an error message, display it */}
      {message && <p>{message}</p>}
    </div>
  );
};

// Export the Login component as the default export
export default Login;