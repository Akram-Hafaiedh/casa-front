import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import ForgotPassword from './pages/forgotPassword';
import { AuthProvider } from './contexts/authContext';
import Users from './pages/users/list';
import ProtectedRoute from './routing/ProtectedRoute';
import ProjectDetails from './pages/projects/projectDetails';
import ProjectListing from './pages/projects/list';
import CustomerListing from './pages/customers/list';
import ProjectCreate from './pages/projects/create';
// import Settings from './pages/settings';
import ErrorBoundary from './ErrorBoundary';
import Vacations from './pages/vacations/index';
import VacationsListing from './pages/vacations/list';
import SetPassword from './pages/setPassword';
import Logs from './pages/logs';

import CustomerCreate from './pages/customers/create';
import UserCreate from './pages/users/create';
import UserDetails from './pages/users/show';
import Error404 from './pages/error/404';

const App: React.FC = () => {
  useEffect(() => {
    document.title = import.meta.env.VITE_APP_NAME || 'Default App Name';
  }, []);
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/set-password/:token" 
            element={
              <ErrorBoundary>
                <SetPassword />
              </ErrorBoundary>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/users" element={<ProtectedRoute element={<Users />} requiredRole="Administrator" />} />
          <Route path="/users/create" element={<ProtectedRoute element={<UserCreate />} requiredRole="Administrator" />} />
          <Route path="/users/:userId" element={<ProtectedRoute element={<UserDetails />} requiredRole="Administrator" />} />
          {/* <Route path="/customers" element={<ProtectedRoute element={<CustomerListing />} />} /> */}
          <Route path="/projects" element={<ProtectedRoute element={<ProjectListing />} />} />
          <Route path="/customers"
            element={
              <ErrorBoundary>
                <ProtectedRoute element={<CustomerListing />} />
              </ErrorBoundary>
            }
          />
          <Route path="/customers/create" element={<ProtectedRoute element={< CustomerCreate />} />} />
          <Route path="/projects/:projectId" element={<ProtectedRoute element={<ProjectDetails />} />} />
          <Route path="/projects/create" element={<ProtectedRoute element={<ProjectCreate />} />} />
          <Route path="/vacations" element={<ProtectedRoute element={<Vacations />} />} />
          <Route path="/vacations/list" element={<ProtectedRoute element={<VacationsListing />} />} />
          <Route path="/logs" element={<ProtectedRoute element={<Logs />} />} />
          <Route path="/404" element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;