import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Building, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
// import emailjs from '@emailjs/browser';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--input-bg)',
    borderColor: state.isFocused ? 'var(--input-focus)' : 'var(--input-border)',
    borderRadius: '12px',
    padding: '4px',
    minHeight: '50px',
    boxShadow: state.isFocused ? '0 0 0 4px rgba(15, 23, 42, 0.05)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? 'var(--input-focus)' : '#cbd5e1'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#ffffff',
    backdropFilter: 'blur(16px)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    zIndex: 9999,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--primary)'
      : state.isFocused
        ? 'rgba(15, 23, 42, 0.05)'
        : 'transparent',
    color: state.isSelected ? '#fff' : 'var(--text-primary)',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'var(--primary-hover)'
    }
  }),
  singleValue: (provided) => ({ ...provided, color: 'var(--text-primary)' }),
  input: (provided) => ({ ...provided, color: 'var(--text-primary)' }),
  placeholder: (provided) => ({ ...provided, color: 'var(--text-secondary)' })
};

export default function Register({ onNavigate }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React-Select States
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(null);

  // Normal Input States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consent, setConsent] = useState(false);

  // OTP States
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [actualOtp, setActualOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const countryOptions = Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name }));
  const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map(s => ({ value: s.isoCode, label: s.name })) : [];
  const cityOptions = selectedState ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(c => ({ value: c.name, label: c.name })) : [];

  const handleVerifyEmail = async () => {
    if (!email) return alert("Please enter an email first");

    setIsSending(true);
    
    try {
      const response = await fetch('/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpRequested(true);
        setIsSending(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP Send Error:', err);
      setIsSending(false);
      
      // Fallback for local testing if the backend is not reachable
      alert(`Backend unreachable (${err.message}). Using local demo mode for development. Default OTP: 123456`);
      setActualOtp('123456');
      setOtpRequested(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next box
    if (value !== '' && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const verifyOtpCode = async () => {
    const enteredOtp = otp.join('');
    
    // If we are in demo mode (actualOtp is set)
    if (actualOtp && enteredOtp === actualOtp) {
      setOtpVerified(true);
      setOtpRequested(false);
      return;
    }

    setIsSending(true);
    try {
      // PROPOSED: Backend verification
      // If the backend has a /verify-otp endpoint, it should be used here.
      // For now, we compare with actualOtp if set, or attempt a fetch if the user provides the URL.
      
      const response = await fetch('/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      if (response.ok) {
        setOtpVerified(true);
        setOtpRequested(false);
      } else {
        alert("Invalid OTP code. Please try again.");
      }
    } catch (err) {
      console.error('Verification Error:', err);
      // If no verify endpoint exists yet, we fall back to local check if actualOtp was set during demo
      if (actualOtp && enteredOtp === actualOtp) {
        setOtpVerified(true);
        setOtpRequested(false);
      } else {
        alert("Error connecting to verification server. Please ensure the backend is running.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    otpVerified &&
    gender !== '' &&
    dob !== '' &&
    selectedPhoneCode !== null &&
    phoneNo.trim() !== '' &&
    address.trim() !== '' &&
    selectedCountry !== null &&
    selectedState !== null &&
    selectedCity !== null &&
    zip.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    (password === confirmPassword) &&
    consent;

  return (
    <div className="register-container">
      <div className="login-header">
        <h1>Create an Account</h1>
        <p>Please fill out the form below to register</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-grid">

          <div className="form-group full-width">
            <label>Full Name</label>
            <div className="input-icon-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
              <User className={`input-icon ${focusedInput === 'name' ? 'active' : ''}`} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Email ID</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="input-icon-wrapper" style={{ flex: 1 }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  disabled={otpVerified || otpRequested}
                />
                <Mail className={`input-icon ${focusedInput === 'email' ? 'active' : ''}`} />
              </div>
              <button
                type="button"
                onClick={handleVerifyEmail}
                style={{
                  padding: '0 20px',
                  borderRadius: '12px',
                  border: 'none',
                  background: otpVerified ? '#10b981' : 'var(--primary)',
                  color: '#fff',
                  cursor: otpVerified || otpRequested || isSending ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '500',
                  opacity: (otpRequested && !otpVerified) || isSending ? 0.5 : 1,
                  transition: 'all 0.3s'
                }}
                disabled={otpVerified || otpRequested || isSending}
              >
                {otpVerified ? <><CheckCircle2 size={18} /> Verified</> : isSending ? 'Sending...' : 'Verify'}
              </button>
            </div>
          </div>

          {otpRequested && !otpVerified && (
            <div className="form-group full-width" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
              <label>Enter OTP from Email</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="form-input"
                    style={{ width: '56px', textAlign: 'center', padding: '14px 0', fontSize: '20px', borderRadius: '12px' }}
                  />
                ))}
                <button
                  type="button"
                  onClick={verifyOtpCode}
                  style={{
                    padding: '14px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary)'}
                >
                  Submit OTP
                </button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Gender</label>
            <div className="input-icon-wrapper">
              <select
                className="form-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onFocus={() => setFocusedInput('gender')}
                onBlur={() => setFocusedInput(null)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <div className="input-icon-wrapper">
              <input
                type="date"
                className="form-input"
                style={{ WebkitAppearance: 'none' }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onFocus={() => setFocusedInput('dob')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <div className="form-group full-width" style={{ position: 'relative', zIndex: 110 }}>
            <label>Phone Number</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '160px' }}>
                <Select
                  options={Country.getAllCountries().map(c => ({ value: c.phonecode, label: `+${c.phonecode.replace('+', '')} (${c.isoCode})` }))}
                  value={selectedPhoneCode}
                  onChange={setSelectedPhoneCode}
                  styles={customSelectStyles}
                  placeholder="+ Code"
                  isSearchable={true}
                />
              </div>
              <div className="input-icon-wrapper" style={{ flex: 1 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value.replace(/[^0-9]/g, ''))}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                />
                <Phone className={`input-icon ${focusedInput === 'phone' ? 'active' : ''}`} />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
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
          </div>

          <div className="form-group full-width">
            <label>Confirm Password</label>
            <div className="input-icon-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-input"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedInput('confirm_password')}
                onBlur={() => setFocusedInput(null)}
              />
              <Lock className={`input-icon ${focusedInput === 'confirm_password' ? 'active' : ''}`} />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>Passwords do not match.</p>
            )}
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <div className="input-icon-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="123 Main St, Apt 4B"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setFocusedInput('address')}
                onBlur={() => setFocusedInput(null)}
              />
              <MapPin className={`input-icon ${focusedInput === 'address' ? 'active' : ''}`} />
            </div>
          </div>

          <div className="form-group" style={{ position: 'relative', zIndex: 100 }}>
            <label>Country</label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(opt) => {
                setSelectedCountry(opt);
                setSelectedState(null);
                setSelectedCity(null);
              }}
              styles={customSelectStyles}
              placeholder="Search Country..."
            />
          </div>

          <div className="form-group" style={{ position: 'relative', zIndex: 90 }}>
            <label>State</label>
            <Select
              options={stateOptions}
              value={selectedState}
              onChange={(opt) => {
                setSelectedState(opt);
                setSelectedCity(null);
              }}
              styles={customSelectStyles}
              placeholder="Search State..."
              isDisabled={!selectedCountry}
            />
          </div>

          <div className="form-group" style={{ position: 'relative', zIndex: 80 }}>
            <label>City</label>
            <Select
              options={cityOptions}
              value={selectedCity}
              onChange={setSelectedCity}
              styles={customSelectStyles}
              placeholder="Search City..."
              isDisabled={!selectedState}
            />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <div className="input-icon-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="12345"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                onFocus={() => setFocusedInput('zip')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

        </div>

        <div className="checkbox-group mt-4">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="consent">
            I agree to the Terms of Service and Privacy Policy.
          </label>
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? 1 : 0.5,
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s'
          }}
        >
          Create Account
        </button>
        <button type="button" onClick={() => onNavigate('home')} className="social-button" style={{ marginTop: '16px' }}>
          Back to Shop
        </button>
      </form>

      <p className="footer-text">
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Sign in</a>
      </p>
    </div>
  );
}
