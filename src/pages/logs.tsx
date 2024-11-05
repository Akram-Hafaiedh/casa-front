import HomeLayout from '../layouts/PrivateLayout';
import Sidebar from '../components/Sidebar';
const Logs = () => {
    return (
        <HomeLayout sidebar={<Sidebar />}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Welcome Logs</h1>
                <p className="text-gray-600">Here you can see all the history related to this company</p>
                {/* Add more content or components here */}
            </div>
        </HomeLayout>
    );
}

export default Logs;
