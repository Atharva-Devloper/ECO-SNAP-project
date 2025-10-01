# EcoSnap API Documentation

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "citizen", // or "organization"
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "userType": "citizen"
  }
}
```

---

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "userType": "citizen",
    "citizen": {
      "points": 250,
      "level": 5
    }
  }
}
```

---

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Update Password
```http
PUT /api/auth/updatepassword
Authorization: Bearer <token>
```

**Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

### Forgot Password
```http
POST /api/auth/forgotpassword
```

**Body:**
```json
{
  "email": "user@example.com"
}
```

---

### Reset Password
```http
PUT /api/auth/resetpassword/:resettoken
```

**Body:**
```json
{
  "password": "newpassword123"
}
```

---

## 📝 Report Endpoints

### Get All Reports
```http
GET /api/reports
```

**Query Parameters:**
- `status` - Filter by status (pending, verified, assigned, in-progress, completed, rejected)
- `category` - Filter by category
- `latitude` - Filter by location (requires longitude)
- `longitude` - Filter by location (requires latitude)
- `radius` - Search radius in km (default: 10)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)

**Example:**
```http
GET /api/reports?status=pending&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Illegal Dumping on Main Street",
      "description": "Large pile of construction debris",
      "category": "illegal-dumping",
      "status": "pending",
      "location": {
        "coordinates": [-74.006, 40.7128],
        "formattedAddress": "123 Main St, New York, NY"
      },
      "images": [
        {
          "url": "/uploads/image123.jpg"
        }
      ],
      "user": {
        "_id": "507f1f77bcf86cd799439012",
        "email": "john@example.com",
        "profile": {
          "firstName": "John",
          "lastName": "Doe"
        }
      },
      "upvoteCount": 5,
      "views": 23,
      "createdAt": "2025-10-01T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Report
```http
GET /api/reports/:id
```

---

### Create Report
```http
POST /api/reports
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title` - Report title (required)
- `description` - Description (required)
- `category` - Category (required)
- `location[coordinates]` - [longitude, latitude] (required)
- `location[address][street]` - Street address
- `location[address][city]` - City
- `location[address][state]` - State
- `location[address][zipCode]` - Zip code
- `images` - Image files (max 5)

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('title', 'Illegal Dumping');
formData.append('description', 'Large pile of waste');
formData.append('category', 'illegal-dumping');
formData.append('location[coordinates]', JSON.stringify([-74.006, 40.7128]));
formData.append('images', fileInput.files[0]);

fetch('/api/reports', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

### Update Report
```http
PUT /api/reports/:id
Authorization: Bearer <token>
```

---

### Delete Report
```http
DELETE /api/reports/:id
Authorization: Bearer <token>
```

---

### Upvote Report
```http
PUT /api/reports/:id/upvote
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "upvoted": true,
    "upvoteCount": 6
  }
}
```

---

### Verify Report (Admin Only)
```http
PUT /api/reports/:id/verify
Authorization: Bearer <token>
```

---

### Assign Report to Organization (Admin Only)
```http
PUT /api/reports/:id/assign
Authorization: Bearer <token>
```

**Body:**
```json
{
  "organizationId": "507f1f77bcf86cd799439013"
}
```

---

### Get User's Reports
```http
GET /api/reports/user/:userId
```

---

## 👥 User Endpoints

### Get All Users (Admin Only)
```http
GET /api/users
Authorization: Bearer <token>
```

**Query Parameters:**
- `userType` - Filter by type (citizen, organization, admin)
- `page` - Page number
- `limit` - Results per page

---

### Get Single User
```http
GET /api/users/:id
```

---

### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
```

---

### Delete User (Admin Only)
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

---

### Get User Statistics
```http
GET /api/users/:id/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userType": "citizen",
    "totalReports": 12,
    "reportsByStatus": {
      "pending": 2,
      "verified": 5,
      "completed": 5
    },
    "points": 250,
    "level": 5,
    "badges": ["first-report", "cleanup-hero"],
    "cleanupVerifications": 8
  }
}
```

---

### Get Leaderboard
```http
GET /api/users/leaderboard?limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "email": "john@example.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "citizen": {
        "points": 450,
        "level": 8,
        "reportsCount": 25
      }
    }
  ]
}
```

---

## 📊 Statistics Endpoints

### Get Dashboard Statistics
```http
GET /api/stats/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalReports": 1234,
      "totalUsers": 850,
      "totalOrganizations": 42,
      "completedReports": 1050,
      "successRate": 85.09
    },
    "reportsByStatus": {
      "pending": 50,
      "verified": 84,
      "assigned": 30,
      "in-progress": 20,
      "completed": 1050
    },
    "reportsByCategory": {
      "general-waste": 450,
      "recyclables": 320,
      "hazardous-waste": 180,
      "organic-waste": 284
    },
    "recentReports": [...]
  }
}
```

---

### Get Report Statistics
```http
GET /api/stats/reports
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reportsOverTime": [
      {
        "_id": "2025-09-01",
        "count": 45
      },
      {
        "_id": "2025-09-02",
        "count": 52
      }
    ],
    "avgResolutionTime": 48,
    "reportsByPriority": {
      "low": 200,
      "medium": 800,
      "high": 200,
      "urgent": 34
    },
    "topReporters": [...]
  }
}
```

---

### Get User Statistics (Admin Only)
```http
GET /api/stats/users
Authorization: Bearer <token>
```

---

### Get Organization Statistics (Admin Only)
```http
GET /api/stats/organizations
Authorization: Bearer <token>
```

---

## 🔒 Authorization Levels

### Public Routes
- GET /api/reports
- GET /api/reports/:id
- GET /api/users/:id
- GET /api/users/:id/stats
- GET /api/users/leaderboard
- GET /api/stats/dashboard
- GET /api/stats/reports
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgotpassword

### Citizen Routes
- POST /api/reports (create report)
- PUT /api/reports/:id (own reports only)
- DELETE /api/reports/:id (own reports only)
- PUT /api/reports/:id/upvote

### Admin Routes
- PUT /api/reports/:id/verify
- PUT /api/reports/:id/assign
- GET /api/users
- DELETE /api/users/:id
- GET /api/stats/users
- GET /api/stats/organizations

---

## 📝 Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "userType": "citizen",
    "profile": {
      "firstName": "Test",
      "lastName": "User"
    }
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Reports
```bash
curl http://localhost:5000/api/reports
```

### Create Report (with token)
```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "title=Test Report" \
  -F "description=Test description" \
  -F "category=general-waste" \
  -F "location[coordinates]=[-74.006,40.7128]" \
  -F "images=@/path/to/image.jpg"
```

---

## 🔑 Environment Variables Required

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecosnap
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
MAX_FILE_UPLOAD=5242880
IMAGE_QUALITY=80
IMAGE_MAX_WIDTH=1200
IMAGE_MAX_HEIGHT=1200
CLIENT_URL=http://localhost:3000
```

---

## 📦 Points System

### Point Awards
- **Report Verified**: +10 points
- **Cleanup Verified by Citizen**: +5 points
- **Report Upvoted**: +1 point (to reporter)

### Levels
Points are automatically converted to levels:
- Level 1: 0-50 points
- Level 2: 51-100 points
- Level 3: 101-200 points
- Level 4: 201-350 points
- Level 5: 351-500 points
- And so on...

---

## 🚀 Quick Start

1. **Start server**: `npm run dev` (from server directory)
2. **Register a user**: POST to `/api/auth/register`
3. **Login**: POST to `/api/auth/login` (get token)
4. **Create report**: POST to `/api/reports` with token
5. **View reports**: GET `/api/reports`

---

**Last Updated**: 2025-10-01
**API Version**: 1.0.0
