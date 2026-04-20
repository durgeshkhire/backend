import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [step, setStep] = useState('form'); // 'form', 'otp-verify', 'success'
  const [expectedOtp, setExpectedOtp] = useState('');
  const [emailPreviewUrl, setEmailPreviewUrl] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // SMTP Settings
  const [showSettings, setShowSettings] = useState(false);
  const [smtpUser, setSmtpUser] = useState(localStorage.getItem('aura_smtp_user') || '');
  const [smtpPass, setSmtpPass] = useState(localStorage.getItem('aura_smtp_pass') || '');
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', password: '', otp: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'signup' || (authMode === 'login' && loginMethod === 'otp')) {
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setExpectedOtp(mockOtp);
      setIsSending(true);

      try {
        const response = await fetch('http://localhost:3001/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            otp: mockOtp,
            smtpUser: smtpUser,
            smtpPass: smtpPass 
          })
        });
        const data = await response.json();
        
        setIsSending(false);
        if (data.previewUrl) {
           setEmailPreviewUrl(data.previewUrl);
           toast.success(`Test Email sent! Check the View Email link.`, { duration: 6000 });
        } else if (data.success) {
           setEmailPreviewUrl('');
           toast.success(`OTP has been sent to your real email inbox!`);
        } else {
           toast.error('Failed to send email.');
        }
      } catch(err) {
        setIsSending(false);
        toast.error('Backend server not running. (Forgot to start Node?)');
      }

      setStep('otp-verify');
    } else {
      // Standard password login
      toast.success('Successfully logged in!');
      loginUser(formData);
      setStep('success');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (formData.otp === expectedOtp) {
      toast.success('Account successfully verified!');
      loginUser(formData);
      setStep('success');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const saveSettings = () => {
    localStorage.setItem('aura_smtp_user', smtpUser);
    localStorage.setItem('aura_smtp_pass', smtpPass);
    setShowSettings(false);
    toast.success('SMTP Settings saved locally!');
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-split">
        {/* Image Section */}
        <div className="auth-image-section">
          <img src="/auth_model_1776409885468.png" alt="AURA Premium Bag Model" className="auth-bg-img" />
          <div className="auth-image-overlay">
            <Link to="/" className="back-link"><ArrowLeft size={20} /> Back to Store</Link>
            <div className="auth-quote">
              <h2 className="h2 quote-text">"Elegance is not standing out, but being remembered."</h2>
              <p className="quote-author">— AURA Fall Collection</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            
            {step === 'success' ? (
              <div className="auth-success fade-in text-center">
                <CheckCircle size={64} className="success-icon mb-4" />
                <h1 className="h2 mb-4">{authMode === 'login' ? 'Welcome Back!' : 'Account Created!'}</h1>
                <p className="text-muted mb-4">You have successfully authenticated.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button onClick={() => navigate('/shop')} className="btn btn-primary auth-submit-btn">Go to Shop</button>
                  <button onClick={() => { setStep('form'); setFormData({...formData, otp: ''}); }} className="btn btn-outline auth-submit-btn">Sign Out</button>
                </div>
              </div>
            ) : step === 'otp-verify' ? (
              <div className="auth-otp fade-in">
                <h1 className="h2 mb-4">Verify OTP</h1>
                <p className="text-muted mb-4">We've sent a 6-digit one-time password to <strong>{formData.email || formData.phone}</strong>.</p>
                <form className="auth-form" onSubmit={handleOtpSubmit}>
                  <div className="form-group">
                    <label htmlFor="otp">Enter 6-digit OTP</label>
                    <input 
                      type="text" 
                      id="otp" 
                      placeholder="123456" 
                      maxLength="6" 
                      value={formData.otp} 
                      onChange={handleChange} 
                      required 
                      style={{ letterSpacing: '8px', fontSize: '1.2rem', textAlign: 'center' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary auth-submit-btn">Verify & Continue</button>
                  <button type="button" className="btn btn-outline auth-submit-btn" onClick={() => setStep('form')} style={{ marginTop: '1rem' }}>Back</button>
                  
                  {emailPreviewUrl && (
                    <div style={{ marginTop: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '4px' }}>
                      <p className="text-sm text-muted mb-2"><strong>Demo Mode:</strong> No real SMTP keys configured, so it was sent to an isolated test inbox!</p>
                      <a href={emailPreviewUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                        Click here to read the Email
                      </a>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <>
                <h1 className="h2">{authMode === 'login' ? 'Welcome Back' : 'Create an Account'}</h1>
                <p className="text-muted mb-4">
                  {authMode === 'login' ? 'Enter your details to access your premium account.' : 'Join AURA to save your favorite pieces and track orders.'}
                </p>

                {authMode === 'login' && (
                  <div className="login-method-toggle mb-4">
                    <button type="button" className={loginMethod === 'password' ? 'active' : ''} onClick={() => setLoginMethod('password')}>Password</button>
                    <button type="button" className={loginMethod === 'otp' ? 'active' : ''} onClick={() => setLoginMethod('otp')}>OTP via Email</button>
                  </div>
                )}

                <form className="auth-form" onSubmit={handleFormSubmit}>
                  {authMode === 'signup' && (
                    <div className="signup-grid">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleChange} required />
                      </div>
                      <div className="form-group full-width">
                        <label htmlFor="address">Shipping Address</label>
                        <input type="text" id="address" placeholder="123 Luxury Ave, NY" value={formData.address} onChange={handleChange} required />
                      </div>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="jane@example.com" value={formData.email} onChange={handleChange} required />
                  </div>

                  {(authMode === 'signup' || (authMode === 'login' && loginMethod === 'password')) && (
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                    </div>
                  )}
                  
                  {authMode === 'login' && loginMethod === 'password' && (
                    <div className="form-options">
                      <label className="checkbox-label">
                        <input type="checkbox" /> Remember me
                      </label>
                      <a href="#" className="forgot-link">Forgot Password?</a>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isSending}>
                    {isSending ? 'Sending...' : (authMode === 'login' 
                      ? (loginMethod === 'otp' ? 'Send OTP' : 'Sign In') 
                      : 'Sign Up & Verify')}
                  </button>
                </form>

                <div className="auth-switch">
                  <p className="text-muted">
                    {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <button 
                    className="switch-btn" 
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setStep('form');
                    }}
                  >
                    {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>

                  <button className="settings-trigger text-muted" onClick={() => setShowSettings(true)} type="button">
                    <Settings size={14} /> Dev Settings
                  </button>
                </div>
              </>
            )}

            {/* Settings Modal */}
            {showSettings && (
              <div className="settings-modal-overlay fade-in">
                <div className="settings-modal">
                  <h3 className="h3 mb-2">Dev Setup: SMTP</h3>
                  <p className="text-muted text-sm mb-4">Enter a Google App Password here to automatically route real emails instead of using the test mailbox. Kept only in your browser storage.</p>
                  <div className="form-group mb-2">
                    <label>Gmail Address</label>
                    <input type="email" placeholder="youremail@gmail.com" value={smtpUser} onChange={e => setSmtpUser(e.target.value)} />
                  </div>
                  <div className="form-group mb-4">
                    <label>App Password</label>
                    <input type="password" placeholder="xxxx xxxx xxxx xxxx" value={smtpPass} onChange={e => setSmtpPass(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" onClick={saveSettings} style={{flex: 1}}>Save</button>
                    <button className="btn btn-outline" onClick={() => setShowSettings(false)} style={{flex: 1}}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
