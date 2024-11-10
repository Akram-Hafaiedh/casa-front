// src/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaFolder, FaTasks, FaProjectDiagram, FaSun, FaCog, FaFileContract } from 'react-icons/fa';
import { RxDashboard, RxPerson } from "react-icons/rx";
import { IoLogOutOutline } from 'react-icons/io5';
import useAuth from '../hooks/useAuth';
const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    return (
        <aside className="sidebar bg-light border-e border-e-gray-200 fixed top-0 bottom-0 z-20 lg:flex flex-col items-stretch shrink-0">
            
            <div className="sidebar-header">
                <img src="/images/logo-c.svg" className="w-15 mb-10" alt="Logo" />
            </div>
            <div className="sidebar-content">
                
            </div>
            <div className="p-6">
                <nav className="mt-4 bg-">
                    <ul>
                        <li>
                            <Link to="/home" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/home' ? 'bg-gray-300' : ''}`}>
                                <RxDashboard className="mr-2 text-xl" />
                                Dashboard
                            </Link>
                        </li>
                        {user?.role === 'Administrator' && (
                            <li>
                                <Link to="/users" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname.startsWith('/users') ? 'bg-gray-300' : ''}`}>
                                    <RxPerson className="mr-2 text-xl" />
                                    Employees
                                </Link>
                            </li>
                        )}
                        {user?.role === 'Administrator' && (
                            <li>
                                <Link to="/contracts" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname.startsWith('/contracts') ? 'bg-gray-300' : ''}`}>
                                    <FaFileContract className="mr-2" />
                                    Contracts
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/customers" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/customers' || location.pathname === '/customers/create' ? 'bg-gray-300' : ''}`}>
                                <FaFolder className="mr-2" />
                                Customers
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/tasks" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/tasks' ? 'bg-gray-300' : ''}`}>
                                <FaTasks className="mr-2" />
                                Tasks
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/projects" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/projects' ? 'bg-gray-300' : ''}`}>
                                <FaProjectDiagram className="mr-2" />
                                Projects
                            </Link>
                        </li>

                        <li>
                            <Link to="/vacations" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/vacations' ? 'bg-gray-300' : ''}`}>
                                <FaSun className="mr-2" />
                                Vacations
                            </Link>
                        </li>
                        {user?.role === 'Administrator' && (
                            <li>
                                <Link to="/logs" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/logs' ? 'bg-gray-300' : ''}`}>
                                    <IoLogOutOutline className="mr-2" />
                                    Logs
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/settings" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/settings' ? 'bg-gray-300' : ''}`}>
                                <FaCog className="mr-2" />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>

    );
};

export default Sidebar;