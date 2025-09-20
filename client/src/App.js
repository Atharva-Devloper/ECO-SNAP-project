import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

// Import components (to be created)
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Import pages (to be created)
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ReportFormPage from './pages/reports/ReportFormPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

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
          <div className=\"App\">
            <Header />
            <main className=\"main-content\">
              <Routes>
                {/* Public Routes */}
                <Route path=\"/\" element={<HomePage />} />
                <Route path=\"/login\" element={<LoginPage />} />
                <Route path=\"/register\" element={<RegisterPage />} />
                <Route path=\"/map\" element={<MapPage />} />
                
                {/* Protected Routes (to be wrapped with ProtectedRoute component) */}
                <Route path=\"/dashboard\" element={<DashboardPage />} />
                <Route path=\"/report\" element={<ReportFormPage />} />
                <Route path=\"/profile\" element={<ProfilePage />} />
                
                {/* Admin Routes (to be wrapped with AdminRoute component) */}
                <Route path=\"/admin\" element={<AdminDashboard />} />
                
                {/* 404 Route */}
                <Route path=\"*\" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Toast notifications */}
            <ToastContainer
              position=\"top-right\"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme=\"light\"
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
