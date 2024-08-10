import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        navigate('/entry');
      } else {
        alert('Sign-up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-title">Sign Up</div>
          <form className="signup-form" onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signup-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="signup-input"
            />
            <button type="submit" className="signup-form-btn">Sign Up</button>
            <div className="signup-buttons-container">
              <div className="signup-apple-login-button">
                <FontAwesomeIcon icon={faApple} className="signup-apple-icon" />
                Continue with Apple
              </div>
              <div className="signup-google-login-button">
                <FontAwesomeIcon icon={faGoogle} className="signup-google-icon" />
                Continue with Google
              </div>
            </div>
            <label className="signup-login-label">Already have an account?</label>
            <span className="signup-login-link" onClick={() => navigate('/')}>Login</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
