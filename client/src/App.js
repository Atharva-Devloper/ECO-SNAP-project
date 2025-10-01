import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

// Import components (to be created)
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner'; 

// Import pages
// Public pages
import LandingPage from './pages/public/LandingPage';
import CitizenFeaturesPage from './pages/public/CitizenFeaturesPage';
import OrganizationFeaturesPage from './pages/public/OrganizationFeaturesPage';
import MunicipalSolutionsPage from './pages/public/MunicipalSolutionsPage';
import PricingPage from './pages/public/PricingPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import DemoPage from './pages/public/DemoPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Citizen pages
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import ReportFormPage from './pages/citizen/ReportFormPage';
import CitizenReportsPage from './pages/citizen/CitizenReportsPage';
import CitizenProfilePage from './pages/citizen/CitizenProfilePage';
import LeaderboardPage from './pages/citizen/LeaderboardPage';

// Organization pages
import OrganizationDashboard from './pages/organization/OrganizationDashboard';
import WorkOrdersPage from './pages/organization/WorkOrdersPage';
import TeamManagementPage from './pages/organization/TeamManagementPage';
import EarningsPage from './pages/organization/EarningsPage';
import OrganizationProfilePage from './pages/organization/OrganizationProfilePage';

// Shared pages
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Import styles
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/citizen-features" element={<CitizenFeaturesPage />} />
                <Route path="/organization-features" element={<OrganizationFeaturesPage />} />
                <Route path="/municipal-solutions" element={<MunicipalSolutionsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/map" element={<MapPage />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Citizen Protected Routes (to be wrapped with ProtectedRoute component) */}
                <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
                <Route path="/citizen/report" element={<ReportFormPage />} />
                <Route path="/citizen/reports" element={<CitizenReportsPage />} />
                <Route path="/citizen/profile" element={<CitizenProfilePage />} />
                <Route path="/citizen/leaderboard" element={<LeaderboardPage />} />
                
                {/* Organization Protected Routes (to be wrapped with ProtectedRoute component) */}
                <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
                <Route path="/organization/work-orders" element={<WorkOrdersPage />} />
                <Route path="/organization/team" element={<TeamManagementPage />} />
                <Route path="/organization/earnings" element={<EarningsPage />} />
                <Route path="/organization/profile" element={<OrganizationProfilePage />} />
                
                {/* Admin Routes (to be wrapped with AdminRoute component) */}
                <Route path="/admin" element={<AdminDashboard />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Toast notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
