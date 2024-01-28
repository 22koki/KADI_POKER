import React, { useState } from 'react';
// Define the Signup component
const Signup = () => {
  // Set up state variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSignup = async (event) => {
    event.preventDefault();

    // Try to sign up the user with the provided username and password
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // If the signup was successful, redirect the user to the homepage
      if (response.ok) {
        setMessage('Signup successful! Redirecting to homepage...');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        // If the signup failed, display an error message
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      // If there was a network error, display the error message
      console.error('Error during signup:', error);
      setMessage('An error occurred during signup. Please try again later.');
    }
  };

  // Handle changes to the username input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle changes to the password input field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Render the signup form
  return (
    <div>
      {/* Display a heading for the signup form */}
      <h2>Signup</h2>

      {/* Render a form with a username input field, a password input field, and a submit button */}
      <form onSubmit={handleSignup}>
        {/* Display a label for the username input field */}
        <label>
          Username:
          {/* Render an input field for the username, and update the state variable when the user types in it */}
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />

        {/* Display a label for the password input field */}
        <label>
          Password:
          {/* Render an input field for the password, and update the state variable when the user types in it */}
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />

        {/* Render a submit button for the form */}
        <button type="submit">Sign Up</button>
      </form>

      {/* Display the message state variable, if it's set */}
      {message && <p>{message}</p>}
    </div>
  );
};

// Export the Signup component as the default export of this module
export default Signup;