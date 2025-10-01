# 🔐 Google OAuth Setup Guide

## Overview

Google OAuth allows users to sign in with their Google account instead of creating a new password.

---

## 🚀 Setup Steps

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"** or select existing project
3. Name it "EcoSnap" (or your preferred name)
4. Click **"Create"**

### Step 2: Enable Google+ API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

### Step 3: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (for testing) or **"Internal"** (for organization)
3. Click **"Create"**

**Fill in the form:**
- **App name**: EcoSnap
- **User support email**: your-email@gmail.com
- **App logo**: (optional)
- **App domain**: http://localhost:3000 (for development)
- **Authorized domains**: localhost
- **Developer contact**: your-email@gmail.com

4. Click **"Save and Continue"**

**Scopes:**
5. Click **"Add or Remove Scopes"**
6. Select:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
7. Click **"Update"** → **"Save and Continue"**

**Test users** (for External apps):
8. Add your email as a test user
9. Click **"Save and Continue"**

### Step 4: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Select **"Web application"**

**Configure:**
- **Name**: EcoSnap Web Client
- **Authorized JavaScript origins**:
  - `http://localhost:3000`
  - `http://localhost:5000`
- **Authorized redirect URIs**:
  - `http://localhost:5000/api/auth/google/callback`

4. Click **"Create"**
5. **Copy** the **Client ID** and **Client Secret**

---

## ⚙️ Configure Your Application

### Update server/.env

Add these lines to your `server/.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### Update client/.env

Add this line to your `client/.env` file:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

---

## 🧪 Test Google Login

### Backend Test

1. **Restart your server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Test the OAuth flow**:
   - Open browser: `http://localhost:5000/api/auth/google`
   - You should be redirected to Google sign-in
   - After signing in, you'll be redirected back with a token

### Frontend Integration

Update your Login page button to redirect to the OAuth endpoint:

```javascript
// In LoginPage.js
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:5000/api/auth/google';
};

// Button
<button onClick={handleGoogleLogin} className="social-btn google-btn">
  <span className="social-icon">🔍</span>
  Continue with Google
</button>
```

---

## 📱 How It Works

### Flow Diagram

```
User clicks "Sign in with Google"
    ↓
Frontend redirects to: /api/auth/google
    ↓
Backend redirects to Google OAuth
    ↓
User signs in with Google
    ↓
Google redirects back to: /api/auth/google/callback
    ↓
Backend creates/finds user in database
    ↓
Backend generates JWT token
    ↓
Redirects to: /auth/google/success?token=JWT_TOKEN
    ↓
Frontend extracts token and saves it
    ↓
User is logged in!
```

---

## 🎯 Frontend Success Handler

Create a success page to handle the OAuth callback:

```javascript
// client/src/pages/auth/GoogleSuccess.js
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Save token
      localStorage.setItem('token', token);
      setToken(token);
      
      // Redirect to dashboard
      navigate('/citizen/dashboard');
    } else {
      // No token, redirect to login with error
      navigate('/login?error=google_auth_failed');
    }
  }, [searchParams, navigate, setToken]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Signing you in...</h2>
      <p>Please wait while we complete your Google sign-in.</p>
    </div>
  );
};

export default GoogleSuccess;
```

Add route in App.js:
```javascript
<Route path="/auth/google/success" element={<GoogleSuccess />} />
```

---

## 🔒 Security Notes

### Development vs Production

**Development:**
- Use `http://localhost:3000` and `http://localhost:5000`
- Test with your personal Google account

**Production:**
- Update authorized origins to your domain: `https://yourdomain.com`
- Update redirect URI: `https://yourdomain.com/api/auth/google/callback`
- Update CLIENT_URL in .env: `https://yourdomain.com`
- Verify OAuth consent screen is published

### Best Practices

1. **Never commit** `.env` files to Git
2. **Use environment variables** for all sensitive data
3. **Validate** user data from Google
4. **Rate limit** OAuth endpoints
5. **Monitor** failed login attempts

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"

**Solution**: Make sure the redirect URI in Google Console exactly matches:
```
http://localhost:5000/api/auth/google/callback
```

### Error: "Access blocked: This app's request is invalid"

**Solution**: 
1. Check OAuth consent screen is configured
2. Add your email as a test user (for External apps)
3. Verify scopes are added (email, profile)

### Error: "User not found" or "Invalid token"

**Solution**:
1. Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in .env
2. Restart server after updating .env
3. Clear browser cookies and try again

### Users can't sign in

**Solution**:
1. Verify Google+ API is enabled
2. Check OAuth consent screen status
3. For External apps, add users to test users list
4. Check server logs for detailed errors

---

## 📊 Database Schema

Users created via Google OAuth will have:

```javascript
{
  googleId: "1234567890",
  email: "user@gmail.com",
  userType: "citizen",
  profile: {
    firstName: "John",
    lastName: "Doe",
    avatar: "https://lh3.googleusercontent.com/..."
  },
  isEmailVerified: true,
  // No password field (OAuth users don't need passwords)
}
```

---

## 🔄 Linking Existing Accounts

If a user already has an account with the same email:
- The Google ID will be added to their existing account
- They can use either password or Google to sign in
- Profile picture from Google will be saved

---

## ✅ Verification Checklist

- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Client ID and Secret added to server/.env
- [ ] Client ID added to client/.env
- [ ] Server restarted
- [ ] Frontend button redirects to `/api/auth/google`
- [ ] Success handler page created
- [ ] Test login works
- [ ] User created in database
- [ ] JWT token generated and saved

---

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [OAuth 2.0 Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)

---

**Google OAuth is now ready! 🎉**

Users can sign in with their Google account without creating a password.
