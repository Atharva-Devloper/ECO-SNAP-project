# 📸 EcoSnap - Community-Powered Waste Detection & Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

EcoSnap is a comprehensive two-sided civic-tech platform that connects communities with professional cleaning organizations. Citizens report waste issues through geo-tagged photos, while cleaning companies receive work orders, manage teams, and get compensated for cleanup services.

## 🌟 Features

### 👥 Citizen Features
- **📱 Easy Reporting**: Upload geo-tagged photos of waste issues with detailed descriptions
- **🗺️ Interactive Map**: View all reports on an interactive map with filters and clustering
- **🎯 Geolocation**: Automatic location detection or manual pin placement
- **🏆 Green Points System**: Earn points for valid reports and cleanup confirmations
- **📊 Community Stats**: Track local cleanliness scores and top contributors
- **🔔 Notifications**: Get updates on reported issues and cleanup progress

### 🏢 Cleaning Organization Features
- **📋 Work Order Management**: Receive and manage cleanup assignments from verified reports
- **👷 Team Management**: Assign tasks to cleaning teams and track progress
- **💰 Payment System**: Track earnings and manage invoicing for completed work
- **📱 Mobile App**: Field teams can update job status and upload completion photos
- **📈 Business Dashboard**: View earnings, performance metrics, and service areas
- **⭐ Rating System**: Build reputation through customer feedback and completion rates

### 🏛️ Municipal/Admin Features
- **📋 Report Management**: Review, verify, and assign reports to cleaning organizations
- **📈 Analytics Dashboard**: View comprehensive statistics and trends
- **💳 Payment Processing**: Manage payments to cleaning organizations
- **👥 User Management**: Manage citizen and organization accounts
- **🏆 Gamification**: Set up reward systems and community challenges

## 🏗️ Architecture

```
ecosnap-waste-detection/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── services/       # API calls and external services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # Global state management
│   │   ├── utils/          # Helper functions
│   │   └── assets/         # Static assets
│   └── public/
├── server/                 # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Helper functions
│   └── uploads/            # File upload storage
├── docs/                   # Documentation
├── design/                 # Figma designs and assets
├── scripts/                # Utility scripts
└── tests/                  # Test files
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Component-based UI library
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **React Query** - Data fetching and caching
- **Leaflet** - Interactive maps
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **Multer** - File upload handling
- **Sharp** - Image processing

### DevOps & Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecosnap-waste-detection.git
   cd ecosnap-waste-detection
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Environment Setup**
   
   Create `.env` files in both server and client directories:
   
   **Server (.env)**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/ecosnap
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   
   # File Upload
   MAX_FILE_UPLOAD=5242880
   IMAGE_QUALITY=80
   IMAGE_MAX_WIDTH=1200
   IMAGE_MAX_HEIGHT=1200
   
   # CORS
   CLIENT_URL=http://localhost:3000
   
   # Email (optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   
   # Geocoding (optional)
   GEOCODER_PROVIDER=mapquest
   GEOCODER_API_KEY=your-geocoder-api-key
   ```
   
   **Client (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MAP_API_KEY=6fe19b6b588c44ad6abbf215f5c6aff2039e88dfdbe987da9b79774b64895ca5
   REACT_APP_DEFAULT_LAT=40.7128
   REACT_APP_DEFAULT_LNG=-74.0060
   REACT_APP_DEFAULT_ZOOM=13
   REACT_APP_APP_NAME=EcoSnap
   REACT_APP_MAX_FILE_SIZE=5242880
   ```

4. **Start Development Servers**
   ```bash
   npm run dev
   ```
   
   This starts both frontend (http://localhost:3000) and backend (http://localhost:5000)

### Individual Commands

```bash
# Install dependencies
npm run install:client    # Frontend only
npm run install:server    # Backend only

# Development
npm run client:dev        # Frontend only
npm run server:dev        # Backend only

# Production
npm run build            # Build frontend
npm start               # Start production server

# Testing
npm test                # Run all tests
npm run test:client     # Frontend tests only
npm run test:server     # Backend tests only

# Linting
npm run lint           # Lint all code
npm run lint:fix       # Fix linting issues
```

## 📚 API Documentation

**Complete API Reference**: See [API_DOCUMENTATION.md](./server/API_DOCUMENTATION.md)

### Authentication Endpoints (8 total)
```
POST /api/auth/register          # User registration
POST /api/auth/login             # User login
GET  /api/auth/me                # Get current user
PUT  /api/auth/updatedetails     # Update user details
PUT  /api/auth/updatepassword    # Change password
POST /api/auth/forgotpassword    # Request password reset
PUT  /api/auth/resetpassword/:token  # Reset password
POST /api/auth/logout            # User logout
```

### Report Endpoints (10 total)
```
GET    /api/reports              # Get all reports (with filters)
POST   /api/reports              # Create new report (with image upload)
GET    /api/reports/:id          # Get single report
PUT    /api/reports/:id          # Update report
DELETE /api/reports/:id          # Delete report
PUT    /api/reports/:id/upvote   # Upvote/unvote report
PUT    /api/reports/:id/verify   # Verify report (admin)
PUT    /api/reports/:id/assign   # Assign to organization (admin)
GET    /api/reports/user/:userId # Get user's reports
```

### User Endpoints (6 total)
```
GET    /api/users                # Get all users (admin)
GET    /api/users/:id            # Get user profile
PUT    /api/users/:id            # Update user
DELETE /api/users/:id            # Delete user (admin)
GET    /api/users/:id/stats      # Get user statistics
GET    /api/users/leaderboard    # Get leaderboard (top users by points)
```

### Stats Endpoints (4 total)
```
GET /api/stats/dashboard         # Dashboard overview stats
GET /api/stats/reports           # Report analytics & trends
GET /api/stats/users             # User analytics (admin)
GET /api/stats/organizations     # Organization analytics (admin)
```

**Total: 28 API Endpoints** | **Testing Guide**: [TEST_API.md](./server/TEST_API.md)

## 📱 Features Implementation Guide

### 🔐 Authentication Flow
1. User registration with email validation
2. JWT token-based authentication
3. Protected routes and middleware
4. Role-based access control (User/Admin)

### 📋 Report Creation
1. Photo upload with compression
2. Geolocation capture (auto/manual)
3. Category selection and description
4. Form validation and submission

### 🗺️ Interactive Map
1. Leaflet map integration
2. Marker clustering for performance
3. Filter by category, status, date
4. Click markers to view report details

### 🏆 Points System (Fully Implemented)
- **+10 points** for verified reports (auto-awarded)
- **+5 points** for cleanup confirmations (auto-awarded)
- **Leaderboard** - Real-time rankings by points
- **User levels** - Automatic level progression
- **Statistics tracking** - Reports count, verifications, badges

## 🧪 Testing

### Running Tests
```bash
npm test                    # All tests
npm run test:client        # Frontend tests
npm run test:server        # Backend tests
npm run test:watch         # Watch mode
```

### Test Coverage
- Unit tests for components and utilities
- Integration tests for API endpoints
- E2E tests for critical user flows

## 📈 Development Progress

### ✅ Week 1-2: Foundation & Design (100%)
- [x] Project setup and architecture
- [x] Design system and wireframes
- [x] Database schema design
- [x] API endpoint planning

### ✅ Week 3-4: Backend Development (100%)
- [x] Authentication system (JWT, password reset)
- [x] Database models (User, Report, WorkOrder, Review)
- [x] File upload functionality (Multer + Sharp)
- [x] API endpoints implementation (28 endpoints)
- [x] Middleware (auth, upload, error handling, validation)
- [x] Points system logic

### ✅ Week 5-6: Frontend Development (100% Structure)
- [x] React components and pages (24 pages)
- [x] Map integration (Leaflet)
- [x] Form handling and validation setup
- [x] State management setup (React Query + Context)

### ⏳ Week 7: Integration & Features (In Progress)
- [ ] Frontend-backend integration
- [x] Points system implementation (backend)
- [ ] Admin dashboard (frontend connection)
- [ ] Notification system

### ⏳ Week 8: Testing & Deployment (Pending)
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Deployment setup
- [ ] Documentation completion

**Current Status**: ~65% Complete | Backend 100% ✅ | Frontend Structure 100% ✅ | Integration 0% ⏳

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build folder to hosting service
```

### Backend (Render/Railway)
```bash
# Set environment variables
# Deploy server code
```

### Database (MongoDB Atlas)
```bash
# Create cluster and database
# Update connection string in environment
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier configurations
- Follow React best practices
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenStreetMap for map data
- Leaflet for mapping library
- Create React App for project bootstrapping
- Express.js community for backend framework

## 📞 Support & Documentation

### Documentation Files
- **[API Documentation](./server/API_DOCUMENTATION.md)** - Complete API reference with examples
- **[API Testing Guide](./server/TEST_API.md)** - Testing commands and workflows
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Project status and overview
- **[Design System](./design/DESIGN_SYSTEM.md)** - UI/UX specifications
- **[Wireframes](./design/WIREFRAMES.md)** - Page layouts and flows
- **[Figma Guide](./design/FIGMA_GUIDE.md)** - Design workflow guide

### Support
For support and questions:
- Create an issue on GitHub
- Check documentation files above
- Review API examples in TEST_API.md

### Quick Links
- **Backend API**: http://localhost:5000/api
- **Frontend App**: http://localhost:3000
- **Health Check**: http://localhost:5000/api/health

---

**Made with ❤️ for a cleaner environment** 🌱

**Project Status**: Backend 100% Complete ✅ | Frontend Structure Ready ✅ | Integration In Progress ⏳
