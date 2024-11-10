import { Link } from "react-router-dom";

interface HeaderProps {
    title: string;
    description: string;
    linkText?: string;
    linkTo?: string;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end'; 
}

const InfoSection : React.FC<HeaderProps> = ({title, description, linkText, linkTo, icon, iconPosition}) => {
    return (
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
            <div className="flex flex-col justify-center gap-2">
                <h1 className="text-xl font-medium leading-none text-gray-900">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-sm font-normal text-gray-700">
                    {description}
                </div>
            </div>
            {linkTo && linkText && (
                <div className="flex items-center gap-2.5">
                    <Link to={linkTo} className="btn btn-sm btn-light flex items-center gap-1.5">
                        {icon && iconPosition === 'start' && <span>{icon}</span>}
                        {linkText}
                        {icon && iconPosition === 'end' && <span>{icon}</span>}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default InfoSection