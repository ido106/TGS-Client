import React, { useState } from 'react';
import './UserDetailScreen.css';

window.UserID = null;

const UserDetailScreen = ({ onUserVerified , startSession}) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');

  const handleUserVerified = (userID) => {
    onUserVerified();
    window.UserID = userID;
    startSession(userID);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, ''); // Remove non-digit characters
    const truncated = digitsOnly.slice(0, 4); // Limit the length to 4 characters
    setVerificationCode(truncated);
  };

  const handleSendClick = () => {
    if (validateEmail(email)) {
      // Send the email to the API
      fetch('http://localhost:7025/api/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      })
        .then((response) => {
          if (response.ok) {
            setShowVerification(true);
            setError('');
          } else {
            setError('תקלה בשליחת המייל');
          }
        })
        .catch((error) => {
          // Handle any errors during the API call
          console.error('Error:', error);
          setError('תקלה בשליחת המייל');
        });
    } else {
      setError('אימייל לא תקין');
    }
  };

  const handleVerifyClick = () => {
    if (verificationCode.length === 4) {
      fetch('http://localhost:7025/api/SignIn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, pin: verificationCode }),
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            setError('Error verifying code');
          }
        })
        .then((data) => {
          // Handle the response data
          if (data) {
            if (typeof onUserVerified === 'function') {
              handleUserVerified(data); // Start the session with the userID
            }
          }
        })
        .catch((error) => {
          // Handle any errors during the API call
          console.error('Error:', error);
          setError('Error verifying code');
        });
    } else {
      setError('Invalid verification code');
    }
  };

  const validateEmail = (email) => {
    // Basic email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="user-detail-screen">
      {!showVerification && (
        <div className="input-container">
          <label className="title">התחבר עכשיו</label>
          <label>הזן אימייל</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="yoelyoeli@gmail.com"
          />
          <button onClick={handleSendClick}>שלח</button>
        </div>
      )}
      {showVerification && (
        <div className="input-container">
          <label>הזן את קוד 4 הספרות שנשלח לאימייל שלך</label>
          <input
            type="text"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            placeholder="1234"
            maxLength={4}
          />
          <button onClick={handleVerifyClick}>התחבר</button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserDetailScreen;
