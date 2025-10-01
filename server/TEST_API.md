# API Testing Guide

## Quick Test Commands

### 1. Test Server Health
```bash
curl http://localhost:5000/api/health
```

### 2. Register a Test User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"userType\":\"citizen\",\"profile\":{\"firstName\":\"Test\",\"lastName\":\"User\"}}"
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**Save the token from response!**

### 4. Get Current User (with token)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Get All Reports
```bash
curl http://localhost:5000/api/reports
```

### 6. Get Dashboard Stats
```bash
curl http://localhost:5000/api/stats/dashboard
```

### 7. Get Leaderboard
```bash
curl http://localhost:5000/api/users/leaderboard
```

---

## PowerShell Test Commands

### Register User
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
    userType = "citizen"
    profile = @{
        firstName = "Test"
        lastName = "User"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Login
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### Get Current User
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Headers $headers
```

### Create Report (with image)
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

$form = @{
    title = "Test Report"
    description = "This is a test waste report"
    category = "general-waste"
    'location[coordinates]' = '[-74.006,40.7128]'
    'location[address][city]' = "New York"
    'location[address][state]' = "NY"
}

# If you have an image file:
# $form.images = Get-Item "C:\path\to\image.jpg"

Invoke-RestMethod -Uri "http://localhost:5000/api/reports" -Method Post -Headers $headers -Form $form
```

### Get All Reports
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/reports"
```

### Get Dashboard Stats
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/stats/dashboard"
```

---

## Testing Checklist

### ✅ Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Get current user info
- [ ] Update user details
- [ ] Change password
- [ ] Forgot password flow

### ✅ Reports
- [ ] Create report (without image)
- [ ] Create report (with image)
- [ ] Get all reports
- [ ] Get single report
- [ ] Update own report
- [ ] Delete own report
- [ ] Upvote report
- [ ] Filter reports by status
- [ ] Filter reports by category
- [ ] Search reports by location

### ✅ Users
- [ ] Get user profile
- [ ] Get user statistics
- [ ] View leaderboard
- [ ] Update profile

### ✅ Statistics
- [ ] Get dashboard stats
- [ ] Get report statistics
- [ ] View trends over time

### ✅ Admin Functions (requires admin user)
- [ ] Verify report
- [ ] Assign report to organization
- [ ] Get all users
- [ ] Delete user
- [ ] View organization stats

---

## Expected Responses

### Successful Registration
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@example.com",
    "userType": "citizen"
  }
}
```

### Successful Login
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@example.com",
    "userType": "citizen",
    "citizen": {
      "points": 0,
      "level": 1
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## Common Issues & Solutions

### Issue: "Not authorized to access this route"
**Solution**: Make sure you're including the Bearer token in the Authorization header

### Issue: "User with this email already exists"
**Solution**: Use a different email or login with existing credentials

### Issue: "Validation failed"
**Solution**: Check that all required fields are provided with correct data types

### Issue: "Route not found"
**Solution**: Verify the endpoint URL is correct and the server is running

### Issue: "MongoDB connection error"
**Solution**: Ensure MongoDB is running on your system

---

## Next Steps After Testing

1. **Frontend Integration**: Update your React components to use these endpoints
2. **Error Handling**: Add proper error handling in frontend
3. **Loading States**: Show loading indicators during API calls
4. **Token Management**: Store JWT token securely (localStorage or httpOnly cookies)
5. **File Upload**: Implement image upload in report form
6. **Real-time Updates**: Consider adding WebSocket for live updates

---

**All endpoints are now functional and ready for frontend integration!** 🎉
