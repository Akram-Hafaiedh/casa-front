import { Link, useLocation } from "react-router-dom";

interface MenuItemProps {
    path: string;
    label: string;
}

const MenuItem : React.FC<MenuItemProps> = ({path, label}) => {
    const location = useLocation();
    const isActive = location.pathname.includes(path);
    return (
        <div 
            className={`menu-item border-b-2 border-b-transparent menu-item-active:border-b-primary menu-item-here:border-b-primary 
            ${isActive ? 'active show here' : ''}
        `}>
            <Link className="menu-link gap-1.5 pb-2 lg:pb-4 px-2" to={path}>
                <div className="menu-title text-nowrap font-medium  text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-item-here:text-primary menu-item-here:font-semibold menu-item-show:text-primary menu-link-hover:text-primary">
                    {label}
                </div>
            </Link>
        </div>
    )
}

export default MenuItem;