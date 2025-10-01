# 🔐 Test Credentials for EcoSnap

## 🚀 Quick Setup

Run this command to create test users in your database:

```bash
cd server
npm run seed:users
```

---

## 👤 Test User Accounts

### 1. ADMIN Account
```
Email: admin@ecosnap.com
Password: admin123
Role: Administrator
```

**Permissions:**
- ✅ Verify reports
- ✅ Assign reports to organizations
- ✅ Manage all users
- ✅ View all statistics
- ✅ Approve organizations

**Use for:**
- Testing admin dashboard
- Verifying citizen reports
- Assigning work orders
- Managing platform

---

### 2. CITIZEN Account
```
Email: citizen@ecosnap.com
Password: citizen123
Role: Citizen
```

**Profile:**
- Name: John Doe
- Points: 150
- Level: 3
- Reports: 15
- Badges: First Report, Cleanup Hero

**Permissions:**
- ✅ Create waste reports
- ✅ Upload photos
- ✅ View map
- ✅ Earn points
- ✅ View leaderboard

**Use for:**
- Testing report creation
- Testing photo upload
- Testing points system
- Testing citizen dashboard

---

### 3. ORGANIZATION Account
```
Email: organization@ecosnap.com
Password: org123
Role: Organization
```

**Company Details:**
- Name: CleanCo Services
- Team Size: 10 members
- Rating: 4.5/5 (25 reviews)
- Status: Verified & Approved
- Service Areas: New York, Brooklyn, Queens

**Permissions:**
- ✅ View assigned work orders
- ✅ Accept/decline assignments
- ✅ Upload completion photos
- ✅ Manage team
- ✅ Track earnings

**Use for:**
- Testing organization dashboard
- Testing work order management
- Testing team assignment
- Testing payment tracking

---

### 4. TEST Account (Generic)
```
Email: test@example.com
Password: test123
Role: Citizen
```

**Use for:**
- Quick testing
- Email verification tests
- General functionality testing

---

## 🧪 How to Use

### Option 1: Seed Database (Recommended)

```bash
# From server directory
cd server
npm run seed:users
```

This will create all test users automatically.

### Option 2: Register Manually

Use the registration endpoint:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "myemail@example.com",
    "password": "mypassword123",
    "userType": "citizen",
    "profile": {
      "firstName": "Your",
      "lastName": "Name"
    }
  }'
```

### Option 3: Login via Frontend

1. Go to http://localhost:3000/login
2. Enter email and password from above
3. Click "Sign In"

---

## 🔑 API Testing

### Login to Get Token

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "citizen@ecosnap.com",
    "password": "citizen123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "citizen@ecosnap.com",
    "userType": "citizen"
  }
}
```

Save the `token` and use it in subsequent requests:

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Test Scenarios

### Scenario 1: Citizen Reports Waste
1. Login as **citizen@ecosnap.com**
2. Create new report with photo
3. View on map
4. Check points earned

### Scenario 2: Admin Verifies Report
1. Login as **admin@ecosnap.com**
2. View pending reports
3. Verify a report
4. Assign to organization

### Scenario 3: Organization Completes Work
1. Login as **organization@ecosnap.com**
2. View assigned work orders
3. Accept work order
4. Mark as completed
5. Upload completion photos

### Scenario 4: Citizen Verifies Cleanup
1. Login as **citizen@ecosnap.com**
2. View completed reports
3. Verify cleanup
4. Earn bonus points
5. Rate organization

---

## 🔄 Reset Test Data

To clear all users and start fresh:

```javascript
// In MongoDB shell or Compass
use ecosnap
db.users.deleteMany({})
```

Then run seed script again:
```bash
npm run seed:users
```

---

## 📧 Email Testing

All test accounts will receive emails for:
- ✅ Welcome email (on first registration)
- ✅ Password reset emails
- ✅ Report verification notifications
- ✅ Work order assignments
- ✅ Cleanup completion notices

Check the email inbox for: **noreply.ecosnap@gmail.com**

---

## 🛡️ Security Notes

⚠️ **These are TEST credentials only!**

- Never use these in production
- Change all passwords before deployment
- Use strong passwords for real users
- Enable rate limiting for login attempts

---

## 📱 Frontend Login URLs

- **Login Page**: http://localhost:3000/login
- **Register Page**: http://localhost:3000/register
- **Citizen Dashboard**: http://localhost:3000/citizen/dashboard
- **Organization Dashboard**: http://localhost:3000/organization/dashboard
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

---

## 🎯 Quick Reference

| Role | Email | Password | Dashboard URL |
|------|-------|----------|---------------|
| Admin | admin@ecosnap.com | admin123 | /admin/dashboard |
| Citizen | citizen@ecosnap.com | citizen123 | /citizen/dashboard |
| Organization | organization@ecosnap.com | org123 | /organization/dashboard |
| Test | test@example.com | test123 | /citizen/dashboard |

---

**Ready to test! 🚀**

Run `npm run seed:users` in the server directory to create all test accounts.
