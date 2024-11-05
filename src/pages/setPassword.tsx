import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaLock } from "react-icons/fa6";


const SetPassword: React.FC = () => {
    const {token} = useParams<{token: string}>()
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    // const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call backend API for authentication
        if (passwordConfirmation === '' || password === '') {
            toast.error("Password and Password Confirmation are required");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/set-password`, { token, password, password_confirmation: passwordConfirmation });
            console.log(response.data.data.status.message);
            if (response.data.data.status.code === 200) {
                toast.success(response.data.data.status.message);
                navigate('/');
            } else {
                toast.error(response.data.data.status.message);
            }
        } catch (error) {
            toast.error("An error occurred setting the password." + error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Side - Login Form */}
            <div className="relative flex flex-col items-center justify-center w-1/2 px-12 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="mb-6 text-3xl font-semibold text-center text-gray-700">Welcome to</h2>
                    <div className="my-10">
                        <img
                            src="/images/logo-c.svg"
                            alt="Analytics"
                            className="mx-auto max-h-[130px]"
                        />
                    </div>
                    <p className="mb-2 font-bold text-center text-green-500">Choose a strong password.</p>
                    <div className="mb-4 text-sm text-center text-gray-400">This account is for personal use only—do not share your credent</div>

                    <form onSubmit={handleSetPassword}>
                        <div className="relative w-full mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full py-3 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute inset-y-0 flex items-center pl-3 left-1">
                                <FaLock className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full py-3 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                            <div className="absolute inset-y-0 flex items-center pl-3 left-1">
                                <FaLock className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <button type="submit"
                            className="w-full py-3 text-white transition duration-200 bg-blue-900 rounded-full mt-9 hover:bg-blue-800"
                        >
                            Set Password
                        </button>
                    </form>
                    <div className="flex items-center justify-center px-8 mt-8">
                        <span className="text-gray-400">
                            Already have an account?
                        <Link to="/" className="text-sm text-blue-500 hover:underline ms-2">
                            Login
                        </Link>
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <p className="absolute left-0 right-0 mt-4 mr-4 text-sm text-center text-gray-400 bottom-10">2023 Casa Group. All rights reserved.</p>

            </div>

            {/* Right Side - Info */}
            <div className="flex items-center justify-center w-1/2 bg-center bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/images/login-bg.jpg')",
                }}>
                <div className="px-8 text-center text-white">
                    {/* Add some mockup image or relevant data */}
                    <div className="my-8">
                        <img
                            src="/images/logo-b.svg"
                            alt="Analytics"
                            className="mx-auto max-h-[375px]"
                        />
                    </div>
                    <p className="max-w-lg mb-4 text-sm">
                        This plateform is for <span className="font-bold">Casa Group</span> employees only, focused on enhancing their teamwork,
                        clear communication and efficient collaboration.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SetPassword;
