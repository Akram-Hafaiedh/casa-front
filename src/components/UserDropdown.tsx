
import { useState } from "react";
import Switch from "./Switch";
import { TbMoonFilled } from "react-icons/tb";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { HiOutlineArrowSmRight, HiOutlineCog, HiOutlineUserCircle } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa6";

const UserDropdown = () => {
    const [darkMode, setDarkMode] = useState(false);
    const handleSwitchChange = () => setDarkMode(!darkMode)   
    return (
        <div className="menu-container pointer-events-auto">
            <div className="menu-dropdown menu-default light:border-gray-300 w-[200px] md:w-[250px]">
                <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                    <div className="flex items-center gap-2">
                        <img className="size-9 rounded-full border-2 border-success" src="/images/300-2.png" alt="" />
                        <div className="flex flex-col gap-1.5">
                            <a className="text-sm text-gray-800 hover:text-primary font-semibold leading-none" 
                                href="/metronic/tailwind/react/demo1/account/hoteme/get-stard">
                                Cody Fisher
                            </a>
                            <a href="mailto:c.fisher@gmail.com"
                                className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
                                c.fisher@gmail.com
                            </a>
                        </div>
                    </div>
                    <span className="badge badge-xs badge-primary badge-outline">
                        Pro
                    </span>
                </div>
                <div className="menu-separator"></div>
                <div className="flex flex-col">
                    <div className="menu-item">
                        <a className="menu-link" href="/metronic/tailwind/react/demo1/public-profile/profiles/default">
                            <div className="menu-icon menu-icon">
                                <FaRegAddressCard />
                            </div>
                            <div className="menu-title">
                                Public Profile
                            </div>
                        </a>
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
                    <div className="menu-item menu-item-dropdown">
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
                    <div className="menu-item !px-4 !py-1.5">
                        <a className="btn btn-sm btn-light justify-center">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDropdown