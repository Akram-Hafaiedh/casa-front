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
import Contracts from './pages/contracts/list';
import ProtectedRoute from './routing/ProtectedRoute';
import ProjectDetails from './pages/projects/projectDetails';
import ProjectListing from './pages/projects/list';
import CustomerListing from './pages/customers/list';
import ProjectCreate from './pages/projects/create';
// import Settings from './pages/settings';
// import ErrorBoundary from './ErrorBoundary';
import Vacations from './pages/vacations/index';
import VacationsListing from './pages/vacations/list';
import SetPassword from './pages/setPassword';
import Logs from './pages/logs';

import CustomerCreate from './pages/customers/create';
import UserCreate from './pages/users/create';
// import UserDetails from './pages/users/show';
import Error404 from './pages/error/404';
import ContractCreate from './pages/contracts/create';
import ContractEdit from './pages/contracts/edit';
import Settings from './pages/settings';
import UserProjects from './pages/users/projects';
import UserProfile from './pages/users/profile';
import UserActivity from './pages/users/activity';
import UserDocuments from './pages/users/documents';
import { Layout } from './pages/users/Layout';
import UserContracts from './pages/users/contracts';
import PrivateLayout from './layouts/PrivateLayout';

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
          <Route path="/set-password/:token" element={<SetPassword />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />}/>
            <Route path="/users" element={<ProtectedRoute element={<Users />} requiredRole="Administrator" />} />
            <Route path="/users/create" element={<ProtectedRoute element={<UserCreate />} requiredRole="Administrator" />} />
            <Route path="/users/:userId"element={<ProtectedRoute element={<Layout />} requiredRole="Administrator" />} >
              <Route path="profile" element={<ProtectedRoute element={<UserProfile />} requiredRole="Administrator" />} />
              <Route path="contracts" element={<ProtectedRoute element={<UserContracts />} requiredRole="Administrator" />} />
              <Route path="projects" element={<ProtectedRoute element={<UserProjects />} requiredRole="Administrator" />} />
              <Route path="activity" element={<ProtectedRoute element={<UserActivity />} requiredRole="Administrator" />} />
              <Route path="documents" element={<ProtectedRoute element={<UserDocuments />} requiredRole="Administrator" />} />
              {/* <Route path="notifications" element={<ProtectedRoute element={<UserNotifications />} requiredRole="Administrator" />} /> */}
            </Route>

            <Route path="/vacations" element={<ProtectedRoute element={<Vacations />} />} />
            <Route path="/vacations/list" element={<ProtectedRoute element={<VacationsListing />} />} />

            <Route path="/projects" element={<ProtectedRoute element={<ProjectListing />} />} />
            <Route path="/projects/:projectId" element={<ProtectedRoute element={<ProjectDetails />} />} />
            <Route path="/projects/create" element={<ProtectedRoute element={<ProjectCreate />} />} />

            <Route path="/contracts" element={<ProtectedRoute element={<Contracts />} requiredRole="Administrator" />} />
            <Route path="/contracts/create" element={<ProtectedRoute element={<ContractCreate />} requiredRole="Administrator" />} />
            <Route path="/contracts/:contractId/edit" element={<ProtectedRoute element={<ContractEdit />} requiredRole="Administrator" />} />

            <Route path="/logs" element={<ProtectedRoute element={<Logs />} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings />} requiredRole="Administrator" />} />

            <Route path="/customers" element={<ProtectedRoute element={<CustomerListing />} />} />
            <Route path="/customers/create" element={<ProtectedRoute element={< CustomerCreate />} />} />
          
          </Route>
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/users/:userId" element={<ProtectedRoute element={<UserDetails />} requiredRole="Administrator" />} /> */}
          {/* <Route path="notifications" element={<ProtectedRoute element={<UserNotifications />} requiredRole="Administrator" />} /> */}
         



          {/* <Route path="/customers" element={<ProtectedRoute element={<CustomerListing />} />} /> */}
        
          
          



          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;