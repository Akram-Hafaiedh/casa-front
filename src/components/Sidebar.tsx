// src/Sidebar.tsx
import { RxAvatar, RxDashboard, RxFile, RxPerson } from "react-icons/rx";
import { HiOutlineClipboardList, HiOutlineOfficeBuilding, HiOutlineSun, HiOutlineCog, HiOutlineDocumentText, HiOutlineFolder } from 'react-icons/hi';
import { GoMoveToStart } from "react-icons/go";
import useAuth from '../hooks/useAuth';
import MenuItem from './MenuItem';
const Sidebar: React.FC = () => {
    const { user } = useAuth();
    return (
        <aside className="sidebar bg-light border-e border-e-gray-200 fixed top-0 bottom-0 z-20 lg:flex flex-col items-stretch shrink-0">
            
            <div className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0">
                <img src="/images/logo-c2.svg" className="default-logo h-[60px] max-w-none ms-6" alt="Logo" />
                <button type="button" 
                    className="btn btn-icon btn-icon-md size-[30px] rounded-lg border bg-light text-gray-500 hover:text-gray-700 toggle absolute start-full top-2/4 rtl:translate-x-2/4 -translate-x-2/4 -translate-y-2/4 border-gray-200 dark:border-gray-300" aria-label="Toggle sidebar">
                    {/* <i className="ki-filled ki-black-left-line transition-all duration-300 rtl:rotate-180"></i> */}
                    <GoMoveToStart className="transition-all duration-300 rtl:rotate-180" />
                </button>
            </div>
            <div className="sidebar-content flex grow shrink-0 py-5 pe-2">
                <div className="scrollable-y-hover grow shrink-0 flex ps-2 lg:ps-5 pe-1 lg:pe-3 h-[601px]">
                    <div className="menu flex flex-col grow !gap-1">
                        <MenuItem to="/home" icon={RxDashboard} title="Dashboard" isPrefixMatch />
                        <MenuItem to="/users" icon={RxAvatar} title="Employees" />
                        <MenuItem to="/contracts" icon={RxFile} title="Contracts" />
                        <MenuItem to="/customers" icon={HiOutlineFolder} title="Customers" /> 
                        <MenuItem to="/projects" icon={HiOutlineOfficeBuilding} title="Projects" />
                        <MenuItem to="/vacations" icon={HiOutlineSun} title="Vacations" />
                        <MenuItem to="/settings" icon={HiOutlineCog} title="Settings" isPrefixMatch />
                        <MenuItem to="/logs" icon={HiOutlineDocumentText} title="Logs" isPrefixMatch />
                    </div>
                </div>
            </div>
            {/* <div className="p-6">
                <nav className="mt-4 bg-">
                    <ul>
                        <li>
                            <Link to="/home" className={`flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200 ${location.pathname === '/home' ? 'bg-gray-300' : ''}`}>
                                <RxDashboard className="mr-2 text-xl" />
                                DashboardH
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
            </div> */}
        </aside>

    );
};

export default Sidebar;