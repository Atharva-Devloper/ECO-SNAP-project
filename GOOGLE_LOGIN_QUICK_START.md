# 🚀 Google Login - Quick Start

## ✅ What's Been Implemented

Google OAuth authentication is now fully integrated in your backend!

### Backend Features:
- ✅ Passport.js Google Strategy configured
- ✅ OAuth routes created (`/api/auth/google` and `/api/auth/google/callback`)
- ✅ User model updated to support Google ID
- ✅ Automatic user creation on first Google sign-in
- ✅ JWT token generation after successful OAuth
- ✅ Email verification automatic for Google users

---

## 🔧 Setup Required (5 minutes)

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Create **OAuth 2.0 credentials**:
   - Authorized origins: `http://localhost:5000`
   - Redirect URI: `http://localhost:5000/api/auth/google/callback`
5. Copy **Client ID** and **Client Secret**

**Detailed guide**: See `/server/GOOGLE_OAUTH_SETUP.md`

### Step 2: Update Environment Variables

Add to `server/.env`:
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Step 3: Restart Server

```bash
cd server
npm run dev
```

---

## 🧪 Test It Now

### Quick Test (Backend Only)

Open in browser:
```
http://localhost:5000/api/auth/google
```

You should:
1. Be redirected to Google sign-in
2. Sign in with your Google account
3. Be redirected back with a token

---

## 📱 Frontend Integration

### Update Your Login Button

In `LoginPage.js`, make the Google button functional:

```javascript
const handleGoogleLogin = () => {
  // Redirect to backend OAuth endpoint
  window.location.href = 'http://localhost:5000/api/auth/google';
};

// Update button
<button onClick={handleGoogleLogin} className="social-btn google-btn">
  <span className="social-icon">🔍</span>
  Continue with Google
</button>
```

### Create Success Handler Page

Create `client/src/pages/auth/GoogleSuccess.js`:

```javascript
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      navigate('/citizen/dashboard');
    } else {
      navigate('/login?error=auth_failed');
    }
  }, []);

  return <div>Signing you in...</div>;
};

export default GoogleSuccess;
```

Add route in `App.js`:
```javascript
<Route path="/auth/google/success" element={<GoogleSuccess />} />
```

---

## 🎯 How It Works

```
1. User clicks "Sign in with Google" button
   ↓
2. Redirects to: http://localhost:5000/api/auth/google
   ↓
3. Google OAuth screen appears
   ↓
4. User signs in with Google
   ↓
5. Google redirects to: /api/auth/google/callback
   ↓
6. Backend:
   - Checks if user exists (by email)
   - Creates new user if doesn't exist
   - Generates JWT token
   ↓
7. Redirects to: http://localhost:3000/auth/google/success?token=JWT
   ↓
8. Frontend saves token and redirects to dashboard
   ↓
9. User is logged in! ✅
```

---

## 📊 What Gets Created in Database

When a user signs in with Google for the first time:

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
  // No password (OAuth users don't need one)
  createdAt: "2025-10-01T..."
}
```

---

## ⚠️ Important Notes

### For Development:
- Use `http://localhost` URLs
- Add your email as test user in Google Console
- OAuth consent screen can be "External" (testing mode)

### For Production:
- Update redirect URIs to your domain
- Publish OAuth consent screen
- Use HTTPS URLs
- Update CLIENT_URL in .env

---

## 🐛 Common Issues

### "redirect_uri_mismatch"
**Fix**: Ensure redirect URI in Google Console is exactly:
```
http://localhost:5000/api/auth/google/callback
```

### "Access blocked"
**Fix**: Add your email as a test user in Google Console

### "User not created"
**Fix**: Check server logs, ensure MongoDB is running

---

## ✅ Quick Checklist

- [ ] Google Cloud project created
- [ ] OAuth credentials obtained
- [ ] GOOGLE_CLIENT_ID added to server/.env
- [ ] GOOGLE_CLIENT_SECRET added to server/.env
- [ ] Server restarted
- [ ] Test OAuth flow in browser
- [ ] Frontend button updated
- [ ] Success handler page created
- [ ] Test complete login flow

---

## 📚 Files Created

1. `/server/src/config/passport.js` - Passport configuration
2. `/server/src/routes/auth.js` - Updated with OAuth routes
3. `/server/src/controllers/authController.js` - OAuth callback handler
4. `/server/src/models/User.js` - Updated with googleId field
5. `/server/GOOGLE_OAUTH_SETUP.md` - Detailed setup guide

---

## 🚀 Next Steps

1. **Get Google credentials** (5 min)
2. **Add to .env** (1 min)
3. **Restart server** (10 sec)
4. **Test backend** (1 min)
5. **Update frontend button** (2 min)
6. **Create success handler** (3 min)
7. **Test complete flow** (1 min)

**Total time: ~15 minutes**

---

**Google Login is ready to use! 🎉**

Just add your Google OAuth credentials and it will work immediately!
