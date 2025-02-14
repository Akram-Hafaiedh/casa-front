import { HiOutlineBriefcase, HiOutlineCog, HiOutlineCommandLine, HiOutlineDocumentArrowUp, HiOutlineDocumentText, HiOutlineEllipsisVertical, HiOutlineRocketLaunch, HiOutlineShare } from "react-icons/hi2"
import InfoSection from "../../layouts/Info"
import Hexagon from "../../components/Hexagon"
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

interface RoleCardProps {
    icon: IconType;
    iconProps?: {
        iconClassName?: string;
        iconSize?: number;
        fillClass?: string;
        strokeClass?: string;
        size?: number;
    };
    title: string;
    subtitle: string;
    description: string;
    personCount: number;
    link: string;
} 

const AccountRoles = () => {
    const roles = [
        {
            icon: HiOutlineCog,
            title: "Administrator",
            subtitle: "Full access role",
            description: "Manages system settings and user access, ensures system stability.",
            peopleCount: 1,
            link: "/metronic/tailwind/react/demo1/public-profile/profiles/creator",
            iconProps: {
                fillClass: "fill-primary-light",
                strokeClass: "stroke-primary-clarity",
                iconClassName: "text-primary",
                iconSize: 20,
            },
        },
        {
            icon: HiOutlineBriefcase,
            title: "Employee",
            subtitle: "Default role",
            description: "Manages system settings and user access, ensures system stability.",
            peopleCount: 1,
            link: "/metronic/tailwind/react/demo1/public-profile/profiles/creator",
            iconProps: {
                fillClass: "fill-info-light",
                strokeClass: "stroke-info-clarity",
                iconClassName: "text-info",
                iconSize: 20,
            },
        },
        {
            icon: HiOutlineCommandLine,
            title: "Remote Developer",
            subtitle: "Remote role",
            description: "Provides assistance and resolves customer inquiries and issues.",
            peopleCount: 1,
            link: "/metronic/tailwind/react/demo1/public-profile/profiles/creator",
            iconProps: {
                fillClass: "fill-success-light",
                strokeClass: "stroke-success-clarity",
                iconClassName: "text-success",
                iconSize: 20,
            },
        },
        
    ];
    return (
        <>
            <div className="container-fixed">
                <InfoSection
                    title="Settings - Roles"
                    description="Overview of all team members and roles."
                />
            </div>
            <div className="container-fixed">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    {roles.map((role,index) =>(
                        <RoleCard
                            key={index}
                            icon={role.icon}
                            iconProps={role.iconProps}
                            title={role.title}
                            subtitle={role.subtitle}
                            description={role.description}
                            personCount={role.peopleCount}
                            link={role.link}
                        />
                    ))}

                    {/* Add Role Card */}
                    <button className="card !border-2 border-dashed !border-brand-clarity bg-center bg-[length:600px] bg-no-repeat min-h-[198px]"
                        style={{ backgroundImage: "url(/images/2600x1200/bg-4.png)" }}
                        onClick={() => toast.warning('Feature coming soon')}>
                        <div className="card-body grid items-center">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-center pt-5">
                                    <Hexagon
                                        icon={HiOutlineRocketLaunch}
                                        size={60}
                                        fillClass="fill-brand-light"
                                        strokeClass="stroke-brand-clarity"
                                        iconClassName="text-brand"
                                        iconSize={30}
                                    />
                                </div>
                                <div className="flex flex-col text-center">
                                    <span className="text-lg font-medium text-gray-900 hover:text-primary-active mb-px">
                                        Add New Role
                                    </span>
                                    <span className="text-2sm text-gray-700">
                                        Ignite Professional Adventures
                                    </span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}
export default AccountRoles


const RoleCard : React.FC <RoleCardProps>= ({
    icon,
    iconProps = {},
    title,
    subtitle,
    description,
    personCount,
    link
}) => {
    const [isRoleDropdownOpen, setRoleDropdownOpen] = useState(false);
    return (
        <div className="card flex flex-col gap-5 p-5 lg:p-7.5">
            <div className="flex items-center flex-wrap justify-between gap-1">
                <div className="flex items-center gap-2.5">
                    <Hexagon
                        icon={icon}
                        size={44}
                        {...iconProps}
        
                    />
                        
                    <div className="flex flex-col">
                        <Link className="text-md font-medium text-gray-900 hover:text-primary-active mb-px"
                            to={link}>
                            {title}
                        </Link>
                        <span className="text-2sm text-gray-700">
                           {subtitle}
                        </span>
                    </div>
                </div>
                <div className="menu inline-flex">
                    <div className={`relative menu-item menu-item-dropdown ${isRoleDropdownOpen ? 'show' : ''}`}>
                        <button
                            title="more options"
                            type="button"
                            onClick={() => setRoleDropdownOpen(!isRoleDropdownOpen)}
                            className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                            <HiOutlineEllipsisVertical className="size-5" />
                        </button>
                        {isRoleDropdownOpen && <RoleDropdown />}
                    </div>
                </div>
            </div>
            <p className="text-2sm text-gray-700">
                {description}
            </p>
            <span className="text-2sm text-gray-800">
                {personCount} person{personCount > 1 ? 's' : ''}
            </span>
        </div>
    )
}


const RoleDropdown : React.FC = () => {
    return (
        <div className="menu-dropdown menu-default absolute top-20 min-w-[150px]">
            <div className="menu-item">
                <div className="menu-link">
                    <div className="menu-icon">
                        <HiOutlineDocumentText className="size-5" />
                        {/* <i className="ki-filled ki-document"></i> */}
                    </div>
                    <div className="menu-title">
                        Details
                    </div>
                </div>
            </div>
            
            <div className="menu-item">
                <button type="button" onClick={() => toast.warning('Feature coming soon')} className="menu-link">
                    <div className="menu-icon">
                        {/* <i className="ki-filled ki-share"></i> */}
                        <HiOutlineShare className="size-5" />
                    </div>
                    <div className="menu-title">
                        Share
                    </div>
                </button>
            </div>
            <div className="menu-item">
                <button type="button" className="menu-link" onClick={() => toast.warning('Feature coming soon')}>
                    <div className="menu-icon">
                        <HiOutlineDocumentArrowUp className="size-5" />
                        <i className="ki-filled ki-file-up"></i>
                    </div>
                    <div className="menu-title">
                        Export
                    </div>
                </button>
            </div>
        </div>
    )
}