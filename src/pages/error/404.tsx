import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Error404 = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen flex bg-cover bg-center bg-[url('/images/404.jpg')] max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-black opacity-60 sm:hidden"></div>
            <div className="relative flex flex-col flex-grow items-center md:items-start justify-center text-center md:text-left px-10 md:px-30 py-10 md:py-0 leading-none">

                <h1 className="text-9xl leading-tight text-teal-500 mb-4 font-extrabold font-">
                    404
                </h1>
                <p className="text-7xl text-teal-500 font-extrabold mb-10">
                    ERROR
                </p>
                <p className="text-4xl text-red-500 font-extrabold">Nothing left to do here.</p>
                {user ? (
                    <Link to="/home" className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Go to dashboard
                    </Link>
                ): (
                    <Link to="/" className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Go back to home
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Error404;