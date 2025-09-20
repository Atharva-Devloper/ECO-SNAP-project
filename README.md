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
   MONGODB_URI=mongodb://localhost:27017/ecosnap
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   
   # File Upload
   MAX_FILE_UPLOAD=1000000
   FILE_UPLOAD_PATH=./uploads
   
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
   REACT_APP_MAP_API_KEY=your-map-api-key
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

### Authentication Endpoints
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user
POST /api/auth/logout       # User logout
```

### Report Endpoints
```
GET    /api/reports         # Get all reports (with filters)
POST   /api/reports         # Create new report
GET    /api/reports/:id     # Get single report
PATCH  /api/reports/:id     # Update report (admin/owner)
DELETE /api/reports/:id     # Delete report (admin/owner)
```

### User Endpoints
```
GET    /api/users           # Get all users (admin)
GET    /api/users/:id       # Get user profile
PATCH  /api/users/:id       # Update user profile
GET    /api/users/:id/stats # Get user statistics
```

### Stats Endpoints
```
GET /api/stats/dashboard    # General dashboard stats
GET /api/stats/reports      # Report statistics
GET /api/stats/users        # User statistics
```

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

### 🏆 Points System
- +10 points for verified reports
- +5 points for cleanup confirmations
- +2 points for report verification
- Leaderboard and user rankings

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

## 📈 Development Timeline

### Week 1-2: Foundation & Design
- [x] Project setup and architecture
- [ ] Figma designs and wireframes
- [ ] Database schema design
- [ ] API endpoint planning

### Week 3-4: Backend Development
- [ ] Authentication system
- [ ] Database models and relationships
- [ ] File upload functionality
- [ ] API endpoints implementation

### Week 5-6: Frontend Development
- [ ] React components and pages
- [ ] Map integration and functionality
- [ ] Form handling and validation
- [ ] State management setup

### Week 7: Integration & Features
- [ ] Frontend-backend integration
- [ ] Points system implementation
- [ ] Admin dashboard
- [ ] Notification system

### Week 8: Testing & Deployment
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Deployment setup
- [ ] Documentation completion

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

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: your-email@example.com
- Documentation: [Link to docs]

---

**Made with ❤️ for a cleaner environment** 🌱
