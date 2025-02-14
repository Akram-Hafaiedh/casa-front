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
import ProjectCreate from './pages/projects/create';
// import Settings from './pages/settings';
// import ErrorBoundary from './ErrorBoundary';
import Vacations from './pages/vacations/index';
import VacationsListing from './pages/vacations/list';
import SetPassword from './pages/setPassword';
import Logs from './pages/logs';

import CustomerListing from './pages/customers/list';
import CustomerCreate from './pages/customers/create';
import CustomerLayout from './pages/customers/ClientLayout';
import CustomerOverview from './pages/customers/overview';
import CustomerTaxes from './pages/customers/taxes';
import CustomerInsurances from './pages/customers/insurances';
import CustomerAccountings from './pages/customers/accountings';
import CustomerFiles from './pages/customers/files';
import CustomerSettings from './pages/customers/settings';

// import UserDetails from './pages/users/show';
import Error404 from './pages/error/404';
import ContractCreate from './pages/contracts/create';
import ContractEdit from './pages/contracts/edit';
import AccountSettings from './pages/account/settings';
import AccountProfile from './pages/account/profile';

import UserCreate from './pages/users/create';
import UserProjects from './pages/users/projects';
import UserActivity from './pages/users/activity';
import UserDocuments from './pages/users/documents';
import UserLayout from './pages/users/UserLayout';
import UserSettings from './pages/users/settings';
import UserOverview from './pages/users/overview';
import UserContracts from './pages/users/contracts';
import PrivateLayout from './layouts/PrivateLayout';
import Error500 from './pages/error/500';
import ComingSoon from './pages/comingSoon';

import ProjectLayout from './pages/projects/ProjectLayout';
import ProjectOverview from './pages/projects/overview';
import ProjectListing from './pages/projects/list';
import ProjectUsers from './pages/projects/users';
import ProjectBudget from './pages/projects/budget';
import ProjectTasks from './pages/projects/tasks';
import ProjectActivity from './pages/projects/activity';

import AccountSecurity from './pages/account/security';
import AccountRoles from './pages/account/roles';
import { ModalProvider } from './contexts/modalContext';
import GlobalModal from './components/Modal';

import FilesListing from './pages/files/index';
import ProjectSettings from './pages/projects/settings';
import UserVacations from './pages/users/vacations';


const App: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('text-base','header-fixed', 'sidebar-fixed');
    document.title = import.meta.env.VITE_APP_NAME || 'Default App Name';
    return () => {
      document.body.classList.remove('text-base','header-fixed', 'sidebar-fixed');
    };
  }, []);
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <GlobalModal />
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
              <Route path="/users" element={<ProtectedRoute element={<Users />} requiredRole={['admin', 'developer']} />} />
              <Route path="/users/create" element={<ProtectedRoute element={<UserCreate />} requiredRole={['admin', 'developer']} />} />
              <Route path="/users/:userId"element={<ProtectedRoute element={<UserLayout />} requiredRole={['admin', 'developer']} />} >
                <Route path="overview" element={<ProtectedRoute element={<UserOverview />} requiredRole={['admin', 'developer']} />} />
                <Route path="settings" element={<ProtectedRoute element={<UserSettings/>} requiredRole={['admin', 'developer']} />} />
                <Route path="contracts" element={<ProtectedRoute element={<UserContracts />} requiredRole={['admin', 'developer']} />} />
                <Route path="vacations" element={<ProtectedRoute element={<UserVacations />} requiredRole={['admin', 'developer']} />} />
                <Route path="projects" element={<ProtectedRoute element={<UserProjects />} requiredRole={['admin', 'developer']} />} />
                <Route path="activity" element={<ProtectedRoute element={<UserActivity />} requiredRole={['admin', 'developer']} />} />
                <Route path="documents" element={<ProtectedRoute element={<UserDocuments />} requiredRole={['admin', 'developer']} />} />
                {/* <Route path="notifications" element={<ProtectedRoute element={<UserNotifications />} requiredRole={['admin', 'developer']} />} /> */}
              </Route>

              <Route path="/vacations" element={<ProtectedRoute element={<Vacations />} />} />
              <Route path="/vacations/list" element={<ProtectedRoute element={<VacationsListing />} />} />

              <Route path="/projects" element={<ProtectedRoute element={<ProjectListing />} />} />
              <Route path="/projects/create" element={<ProtectedRoute element={<ProjectCreate />} />} />
              <Route path="/projects/:projectId" element={<ProtectedRoute element={<ProjectLayout />} />} >
                <Route path="overview" element={<ProtectedRoute element={<ProjectOverview />} />} />
                <Route path="users" element={<ProtectedRoute element={<ProjectUsers />} />} />
                <Route path="budget" element={<ProtectedRoute element={<ProjectBudget />} />} />
                <Route path="tasks" element={<ProtectedRoute element={<ProjectTasks />} />} />
                <Route path="activity" element={<ProtectedRoute element={<ProjectActivity />} />} />
                <Route path="settings" element={<ProtectedRoute element={<ProjectSettings />} />} />
              </Route>
              <Route path="/files" element={<ProtectedRoute element={<FilesListing />} />} ></Route>

              <Route path="/contracts" element={<ProtectedRoute element={<Contracts />} requiredRole={['admin', 'developer']} />} />
              <Route path="/contracts/create" element={<ProtectedRoute element={<ContractCreate />} requiredRole={['admin', 'developer']} />} />
              <Route path="/contracts/:contractId/edit" element={<ProtectedRoute element={<ContractEdit />} requiredRole={['admin', 'developer']} />} />

              <Route path="/logs" element={<ProtectedRoute element={<Logs />} />} />

              <Route path="/customers" element={<ProtectedRoute element={<CustomerListing />} />} />
              <Route path="/customers/create" element={<ProtectedRoute element={< CustomerCreate />} />} />
              <Route path="/customers/:customerId" element={<ProtectedRoute element={<CustomerLayout />} />} >
                <Route path="/customers/:customerId/overview" element={<ProtectedRoute element={<CustomerOverview />} />} />
                <Route path="/customers/:customerId/taxes" element={<ProtectedRoute element={<CustomerTaxes />} />} />
                <Route path="/customers/:customerId/insurances" element={<ProtectedRoute element={<CustomerInsurances />} />} />
                <Route path="/customers/:customerId/accountings" element={<ProtectedRoute element={<CustomerAccountings />} />} />
                <Route path="/customers/:customerId/files" element={<ProtectedRoute element={<CustomerFiles />} />} />
                <Route path="/customers/:customerId/settings" element={<ProtectedRoute element={<CustomerSettings />} />} />
              </Route>
            

              <Route path="/account/get-started" element={<ProtectedRoute element={<AccountSettings />} />} />
              <Route path="/account/profile" element={<ProtectedRoute element={<AccountProfile />} /> } />
              <Route path="/account/security" element={<ProtectedRoute element={<AccountSecurity />} /> } />
              <Route path="/account/roles" element={<ProtectedRoute element={<AccountRoles />} />} />
            </Route>
            {/* <Route path="/settings" element={<Settings />} /> */}
            {/* <Route path="/users/:userId" element={<ProtectedRoute element={<UserDetails />} requiredRole={['admin', 'developer']} />} /> */}
            {/* <Route path="notifications" element={<ProtectedRoute element={<UserNotifications />} requiredRole={['admin', 'developer']} />} /> */}
            {/* <Route path="/customers" element={<ProtectedRoute element={<CustomerListing />} />} /> */}
            
            <Route path="/404" element={<Error404 />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/500" element={<Error500 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;