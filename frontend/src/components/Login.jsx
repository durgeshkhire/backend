import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter both email and password");

    setIsLoggingIn(true);
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successful login
        onNavigate('home');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error('Login Error:', err);
      // Fallback for demo/development if backend is offline
      alert(`Backend unreachable (${err.message}). Entering demo mode.`);
      onNavigate('home');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-icon-wrapper">
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              disabled={isLoggingIn}
              required
            />
            <Mail className={`input-icon ${focusedInput === 'email' ? 'active' : ''}`} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-icon-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              disabled={isLoggingIn}
              required
            />
            <Lock className={`input-icon ${focusedInput === 'password' ? 'active' : ''}`} />
            <button
              type="button"
              className="input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>

        <button type="submit" className="login-button" disabled={isLoggingIn}>
          {isLoggingIn ? 'Signing In...' : 'Sign In'}
        </button>
        <button type="button" onClick={() => onNavigate('home')} className="social-button" style={{ marginTop: '16px' }}>
          Back to Shop
        </button>
      </form>



      <p className="footer-text">
        Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Register</a>
      </p>
    </div>
  );
}
