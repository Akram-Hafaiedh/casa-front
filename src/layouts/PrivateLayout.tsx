import { Outlet, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import useAuth from '../hooks/useAuth';
// import Avatar from 'react-avatar';
// import { TbLogout2 } from 'react-icons/tb';
import Sidebar from '../components/Sidebar';
import Header from './headers/Header';

const PrivateLayout: React.FC = () => {
    // const navigate = useNavigate();
    // const { logout, user } = useAuth();

    // const handleLogout = () => {
    //     // Clear authentication state
    //     // logout();
    //     toast.success("You have been logged out.");
    //     navigate('/');
    // };
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="wrapper flex flex-grow p-6 flex-col">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;
