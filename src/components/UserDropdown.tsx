
import { useState } from "react";
import Switch from "./Switch";
import { TbMoonFilled } from "react-icons/tb";
import { HiOutlineBanknotes, HiOutlineBell, HiOutlineCodeBracketSquare, HiOutlineIdentification, HiOutlineTrophy, HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineArrowSmRight, HiOutlineCog, HiOutlineUserCircle } from "react-icons/hi";
import { VscCoffee } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserDropdown = () => {
    const {currentUser, logout} = useAuth();
    const token = localStorage.getItem('token');
    const [darkMode, setDarkMode] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const handleSwitchChange = () => setDarkMode(!darkMode);
    const handleAccountMenuMouseEnter = () => setShowAccountMenu(true);
    const handleAccountMenuMouseLeave = () => setShowAccountMenu(false); 
    

    if (!currentUser) {
        return <Navigate to="/" />
    }
    const handleLogout = () => {
        if (token) logout({token});
    };
    return (
        <div className="menu-container pointer-events-auto">
            <div className="menu-dropdown menu-default light:border-gray-300 w-[200px] md:w-[250px]">
                <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                    <div className="flex items-center gap-2">
                        <img className="size-9 rounded-full border-2 border-success" 
                            src={currentUser.logo_url || "/images/avatars/blank.svg"} 
                            alt="user avatar" />

                        <div className="flex flex-col gap-1.5">
                            <a className="text-sm text-gray-800 hover:text-primary font-semibold leading-none" 
                                href="/metronic/tailwind/react/demo1/account/hoteme/get-stard">
                                {currentUser.full_name}
                            </a>
                            <a href="mailto:c.fisher@gmail.com"
                                className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
                                {currentUser?.email}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="menu-separator"></div>
                <div className="flex flex-col">
                    <div className="menu-item">
                        <Link className="menu-link" 
                            to={`users/${currentUser.id}/overview`}>
                            <div className="menu-icon menu-icon">
                                <HiOutlineIdentification />
                            </div>
                            <div className="menu-title">
                                Public Profile
                            </div>
                        </Link>
                    </div>
                    <div className="menu-item">
                        <a className="menu-link" href="/metronic/tailwind/react/demo1/account/home/user-profile">
                            <div className="menu-icon">
                                <HiOutlineUserCircle />
                            </div>
                            <div className="menu-title">
                                My Profile
                            </div>
                        </a>
                    </div>
                    <div className="menu-item menu-item-dropdown hover:show"
                        onMouseEnter={handleAccountMenuMouseEnter}
                        onMouseLeave={handleAccountMenuMouseLeave}>
                        <div className="menu-link">
                            <div className="menu-icon">
                                <HiOutlineCog />
                            </div>
                            <div className="menu-title">
                                My Account
                            </div>
                            <div className="menu-arrow">
                                <HiOutlineArrowSmRight className="rtl:transform rtl:rotate-180" />
                            </div>
                        </div>
                        {showAccountMenu && <AccountMenu />}
                    </div>
                    <div className="menu-item">
                        <a className="menu-link" href="https://devs.keenthemes.com">
                            <div className="menu-icon">
                                <HiOutlineCodeBracketSquare />
                            </div>
                            <div className="menu-title">
                                Dev Forum
                            </div>
                        </a>
                    </div>
                    
                </div>
                <div className="menu-separator"></div>
                <div className="flex flex-col">
                    <div className="menu-item mb-0.5">
                        <div className="menu-link">
                            <span className="menu-icon">
                                <TbMoonFilled />
                            </span>
                            <span className="menu-title">
                                Dark Mode
                            </span>
                            <Switch
                                isChecked={darkMode}
                                onChange={handleSwitchChange}
                            />
                        </div>
                    </div>
                    <div className="menu-item px-4! py-1.5!">
                        <button type="button" onClick={handleLogout} className="btn btn-sm btn-light justify-center">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDropdown


const AccountMenu : React.FC = () => {
    const [enabledNotifications, setEnabledNotifications] = useState(false);
    const handleSwitchChange = () => setEnabledNotifications(!enabledNotifications);


    return (
        <div className="menu-container pointer-events-auto absolute -left-2 top-[110px]">
            <div className="menu-dropdown menu-default light:border-gray-300 w-[200px] md:w-[220px]">
                <div className="menu-item">
                    <Link className="menu-link" to="/account/get-started">
                        <div className="menu-icon">
                            {/* <i className="ki-filled ki-coffee"></i> */}
                            <VscCoffee />
                        </div>
                        <div className="menu-title">
                            Get Started
                        </div>
                    </Link>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href="/metronic/tailwind/react/demo1/account/home/user-profile">
                        <div className="menu-icon">
                            {/* <i className="ki-filled ki-some-files"></i> */}
                            <HiOutlineIdentification />
                        </div>
                        <div className="menu-title">
                            My Profile
                        </div>
                    </a>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href="/metronic/tailwind/react/demo1/account/billing/basic">
                        <div className="menu-icon">
                            {/* <i className="ki-filled ki-icon"></i> */}
                            <HiOutlineBanknotes />
                        </div>
                        <div className="menu-title">
                            Billing
                        </div>
                        <i className="ki-filled ki-information-2 text-gray-500 text-md"></i>
                    </a>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href="/metronic/tailwind/react/demo1/account/security/overview">
                        <div className="menu-icon">
                            {/* <i className="ki-filled ki-medal-star"></i> */}
                            <HiOutlineTrophy />
                        </div>
                        <div className="menu-title">
                            Security
                        </div>
                    </a>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href="/metronic/tailwind/react/demo1/account/members/teams">
                        <div className="menu-icon">
                            {/* <i className="ki-filled ki-setting"></i> */}
                            <HiOutlineUsers />
                        </div>
                        <div className="menu-title">
                            Members &amp; Roles
                        </div>
                    </a>
                </div>
                <div className="menu-separator"></div>
                <div className="menu-item">
                    <a className="menu-link" href="/metronic/tailwind/react/demo1/account/security/overview">
                        <div className="menu-icon">
                            {/* <i className="ki-filled ki-shield-tick"></i> */}
                            <HiOutlineBell />
                        </div>
                        <div className="menu-title">
                            Notifications
                        </div>
                        <label className="switch switch-sm" htmlFor="check">
                            <span className="sr-only">Enable Notifications</span>
                            <input name="check" type="checkbox" onChange={handleSwitchChange} />
                        </label>
                    </a>
                </div>
            </div>
        </div>
    );
}