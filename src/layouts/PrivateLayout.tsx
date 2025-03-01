import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from './headers/Header';

const PrivateLayout: React.FC = () => {

    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="wrapper flex grow p-6 flex-col">
                <Header />
                <main className="relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;
