// src/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    return (
        <div>
            <ul>
                <li>
                    <Link to="/home" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/home' ? 'bg-gray-300' : ''}`}>Home</Link>
                </li>
                {user?.role === 'Administrator' && (
                    <li>
                        <Link to="/users" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname.startsWith('/users') ? 'bg-gray-300' : ''}`}>Employees</Link>
                    </li>
                )}
                <li>
                    <Link to="/customers" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/customers' || location.pathname === '/customers/create' ? 'bg-gray-300' : ''}`}>Customers</Link>
                </li>
                <li>
                    <Link to="/tasks" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/tasks' ? 'bg-gray-300' : ''}`}>Tasks</Link>
                </li>
                <li>
                    <Link to="/projects" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/projects' ? 'bg-gray-300' : ''}`}>Projects</Link>
                </li>

                <li>
                    <Link to="/vacations" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/vacations' ? 'bg-gray-300' : ''}`}>Vacations</Link>
                </li>
                {user?.role === 'Administrator' && (
                    <li>
                        <Link to="/logs" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/logs' ? 'bg-gray-300' : ''}`}>Logs</Link>
                    </li>
                )}
                <li>
                    <Link to="/settings" className={`block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/settings' ? 'bg-gray-300' : ''}`}>Settings</Link>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
