// src/Sidebar.tsx
import { RxAvatar, RxDashboard, RxFile } from "react-icons/rx";
import { HiOutlineOfficeBuilding, HiOutlineSun, HiOutlineDocumentText, HiOutlineFolder, HiOutlineArchive } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import MenuItem from './MenuItem';

const Sidebar: React.FC = () => {
    const { user } = useAuth();
    return (
        <aside className="sidebar bg-light border-e border-e-gray-200 fixed top-0 bottom-0 z-10 lg:flex flex-col items-stretch shrink-0">
            
            <div className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0">
                <img src="/images/logo-c2.svg" className="default-logo h-[60px] max-w-none ms-6" alt="Logo" />
                {/* <button type="button" 
                    className="btn btn-icon btn-icon-md size-[30px] rounded-lg border bg-light text-gray-500 hover:text-gray-700 toggle absolute start-full top-2/4 rtl:translate-x-2/4 -translate-x-2/4 -translate-y-2/4 border-gray-200 dark:border-gray-300" aria-label="Toggle sidebar">
                    <GoMoveToStart className="transition-all duration-300 rtl:rotate-180" />
                </button> */}
            </div>
            <div className="sidebar-content flex grow shrink-0 py-5 pe-2">
                <div className="scrollable-y-hover grow shrink-0 flex ps-2 lg:ps-5 pe-1 lg:pe-3 h-[601px]">
                    <div className="menu flex flex-col grow !gap-1">
                        <MenuItem to="/home" icon={RxDashboard} title="Dashboard" isPrefixMatch />
                        {
                            (user?.roles.includes('admin') || user?.roles.includes('developer')) && (
                                <>
                                    <MenuItem to="/users" icon={RxAvatar} title="Employees" />
                                    <MenuItem to="/contracts" icon={RxFile} title="Contracts" />
                                </>
                            )
                        }
                        <MenuItem to="/customers" icon={HiOutlineFolder} title="Customers" /> 
                        <MenuItem to="/projects" icon={HiOutlineOfficeBuilding} title="Projects" />
                        <MenuItem to="/vacations" icon={HiOutlineSun} title="Vacations" />
                        <MenuItem to="/logs" icon={HiOutlineDocumentText} title="Logs" isPrefixMatch />
                        <MenuItem to="/files" icon={HiOutlineArchive} title="Files" />
                    </div>
                </div>
            </div>
        </aside>

    );
};

export default Sidebar;