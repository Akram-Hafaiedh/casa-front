import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Error500 = () => {
    const { user } = useAuth();
    return (
        <div className="grow h-screen w-full">
            <div className="flex flex-col items-center justify-center grow h-[95%]">
                <div className="mb-10">
                    <img src="images/illustrations/20.svg"
                        className="dark:hidden max-h-[160px]"
                        alt="image" />
                    {/* <img src="images/illustrations/19-dark.svg"
                        className="light:hidden max-h-[160px]"
                        alt="image"
                    /> */}
                </div>
                <span className="badge badge-primary badge-outline mb-3">
                    500 Error
                </span>
                <h3 className="text-2-5xl font-semibold text-gray-900 text-center mb-2">
                    Internal Server Error
                </h3>
                <div className="text-md text-center text-gray-700 mb-10">
                    Server error occurred. Please try again later or&nbsp;
                    <Link className="text-primary font-medium hover:text-primary-active" 
                        to={user ? '/home' : '/'}>
                        {user ? 'Return Home' : 'Login'}
                    </Link> for assistance.
                </div>
                <Link className="btn btn-primary flex justify-center"
                    to="/">
                        Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Error500;