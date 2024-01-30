import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEditPassword = async () => {
    try {
      const response = await axios.patch(`http://localhost:5555/edit_password/${username}`, {
        new_password: newPassword,
      });

      setMessage(response.data.message);

      if (response.data.message === 'Password updated successfully') {
        // Redirect to another page (replace '/redirect-path' with your desired path)
        navigate('/Home');
      }
    } catch (error) {
      setMessage('Error occurred while updating password.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Password</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleEditPassword}>Update Password</button>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default EditPassword;
