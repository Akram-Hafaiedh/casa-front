import { useEffect, useState } from "react";
import { HiOutlineChatBubbleBottomCenterText, HiOutlineEnvelope, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import UserDropdown from "../../components/UserDropdown";
const Header = () =>{
    const [isScrolling, setIsScrolling] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
    return (
        <header className={`header fixed top-0 z-10 start-0 end-0 flex items-stretch shrink-0 bg-white${isScrolling ? ' shadow-sm' : ''}`}>
            <div className="flex justify-between items-stretch lg:gap-4 container-fixed">
                <div></div>
                <div className="flex items-center gap-2 lg:gap-3.5">
                    {/* Search */}
                    <button type="button" title="search" className="btn btn-icon btn-icon-lg size-9 !rounded-full hover:bg-primary-light hover:text-primary text-gray-500">
                        <HiOutlineMagnifyingGlass />
                    </button>
                    {/* Messages */}
                    <div className="menu">
                        <div className="menu-item menu-item-dropdown">
                            <div className="menu-toggle btn btn-icon btn-icon-lg size-9 !rounded-full hover:bg-primary-light hover:text-primary dropdown-open:bg-primary-light dropdown-open:text-primary text-gray-500">
                                <HiOutlineChatBubbleBottomCenterText />
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="menu">
                        <div className="menu-item menu-item-dropdown">
                               <div className="menu-toggle btn btn-icon btn-icon-lg relative cursor-pointer size-9 !rounded-full hover:bg-primary-light hover:text-primary dropdown-open:bg-primary-light dropdown-open:text-primary text-gray-500">
                                <HiOutlineEnvelope />
                            </div>
                        </div>
                    </div>
                    {/* Profile */}
                    <div className="menu">
                        <div className="menu-item menu-item-dropdown relative">
                            <div className="menu-toggle btn btn-icon !rounded-full" onClick={toggleUserMenu} data-kt-menu-trigger="click">
                                <img className="size-9 !rounded-full border-2 border-success shrink-0" src="/images/300-2.png" alt="" />
                            </div>
                            {isUserMenuOpen && <UserDropdown />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header