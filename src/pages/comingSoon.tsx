import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const ComingSoon = () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleNotifyMe = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/notify-me`, { email });
            console.log(response.data);
            if (response.data.status.code !== 200) {
                if(response.data.status.code === 409){
                    setIsSubscribed(true);
                }
                toast.error(response.data.status.message);
            }else {
                toast.success(response.data.status.message);
            }
            
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        }
    }
    
    const handleUnsubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/unsubscribe`, { email });
            console.log(response.data);
            if (response.data.status.code !== 200) {
                toast.error(response.data.status.message);
            }else {
                toast.success(response.data.status.message);
                setIsSubscribed(false);
            }
            
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="grow h-screen w-full">
            <div className="flex flex-col items-center justify-center grow h-[95%]">
                <div className="mb-10">
                    <img src="images/illustrations/22.svg"
                        className="dark:hidden max-h-[160px]"
                        alt="image" />
                    {/* <img src="images/illustrations/19-dark.svg"
                        className="light:hidden max-h-[160px]"
                        alt="image"
                    /> */}
                </div>
                <h3 className="text-2-5xl font-semibold text-gray-900 text-center mb-2">
                    We're Launching Soon 
                </h3>
                <div className="text-md text-center text-gray-700 mb-10">
                    <form onSubmit={isSubscribed ? handleUnsubscribe : handleNotifyMe} className="flex flex-row items-center gap-4">
                        <input type="email" placeholder="Email" className="input" value={email} onChange={handleEmailChange} />
                        <button type="submit" className="btn btn-primary flex justify-center whitespace-nowrap">
                            {isSubscribed ? 'Unsubscribe' : 'Notify me' }
                        </button>
                    </form>
                    <p className="mt-4 text-gray-400">
                        Amazing opportunities ahead, stay tuned!
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ComingSoon;
