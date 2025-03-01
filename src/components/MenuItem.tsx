import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom"
interface MenuItemProps {
    to: string;
    icon: IconType;
    title: string;
    isPrefixMatch?: boolean;
}

const MenuItem : React.FC<MenuItemProps>= ({to, icon: Icon, title, isPrefixMatch = false}) => {
    const location = useLocation();
    const isActive = isPrefixMatch ? location.pathname.startsWith(to) : location.pathname === to;

    return (
        <div className={`menu-item` + (isActive ? ' active' : '')}>
            <Link  
                to={to}
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px]! pe-[10px]! py-[6px]!">
                <div className="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px] h-[28px]">
                    <Icon className="text-xl" />
                </div>
                <div className="menu-title text-md! font-semibold text-gray-800 menu-item-active:text-primary menu-link-hover:!text-primary">
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default MenuItem