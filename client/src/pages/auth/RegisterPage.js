import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import '../../styles/auth.css';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'citizen';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: userType,
    phone: '',
    organization: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.agreeToTerms) {
      toast.error('You must agree to the Terms of Service');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        phone: formData.phone,
        ...(formData.userType === 'organization' && { organization: formData.organization })
      };

      const result = await register(userData);
      
      if (result.success) {
        toast.success('Registration successful! Please check your email for verification.');
        navigate('/login');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <div className="auth-content">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <h2>🌍 EcoSnap</h2>
            </Link>
            <h1>Join EcoSnap</h1>
            <p>Create your account and start making a difference in your community</p>
          </div>

          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${formData.userType === 'citizen' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userType: 'citizen' }))}
            >
              👥 Citizen
            </button>
            <button
              type="button"
              className={`user-type-btn ${formData.userType === 'organization' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userType: 'organization' }))}
            >
              🏢 Organization
            </button>
          </div>

          <form className="auth-form register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
            </div>

            {formData.userType === 'organization' && (
              <div className="form-group">
                <label htmlFor="organization">Organization Name</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your organization name"
                  required
                  autoComplete="organization"
                />
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="social-btn google-btn">
              <span className="social-icon">🔍</span>
              Sign up with Google
            </button>
            <button className="social-btn facebook-btn">
              <span className="social-icon">📘</span>
              Sign up with Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h3>
              {formData.userType === 'citizen' ? 'For Citizens' : 'For Organizations'}
            </h3>
            <p>
              {formData.userType === 'citizen'
                ? 'Help make your community cleaner by reporting waste issues and earning rewards.'
                : 'Join our network of cleaning professionals and grow your business with verified work orders.'}
            </p>
            <div className="auth-features">
              {formData.userType === 'citizen' ? (
                <>
                  <div className="auth-feature">
                    <span className="feature-icon">📱</span>
                    <span>Report waste with photos</span>
                  </div>
                  <div className="auth-feature">
                    <span className="feature-icon">🏆</span>
                    <span>Earn green points</span>
                  </div>
                  <div className="auth-feature">
                    <span className="feature-icon">🤝</span>
                    <span>Connect with neighbors</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="auth-feature">
                    <span className="feature-icon">📋</span>
                    <span>Receive work orders</span>
                  </div>
                  <div className="auth-feature">
                    <span className="feature-icon">💰</span>
                    <span>Earn from cleanups</span>
                  </div>
                  <div className="auth-feature">
                    <span className="feature-icon">⭐</span>
                    <span>Build your reputation</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
