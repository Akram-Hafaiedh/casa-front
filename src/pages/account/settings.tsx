import { HiOutlineArrowTrendingUp, HiOutlineBanknotes, HiOutlineBellAlert, HiOutlineEllipsisVertical, HiOutlineIdentification, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineSwatch, HiOutlineTv, HiOutlineUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";

const AccountSettings: React.FC = () => {
    return (
        <>

            <div className="container-fixed">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-badge text-2xl link"></i> */}
                                <HiOutlineIdentification className="size-6 link" />

                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    to="/account/profile">
                                    Personal info
                                </Link>
                                <span className="text-2sm text-gray-700 leading-5">
                                    We're open to partnerships, guest posts, promo bannersand more.
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                <HiOutlineShieldCheck className="size-6 link" />
                                {/* <i className="ki-filled ki-security-user text-2xl link"></i> */}
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    to="/account/security">
                                    Login &amp; Security
                                </Link>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Safeguarding your information with strong authentication measures.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-cheque text-2xl link"></i> */}
                                <HiOutlineBanknotes className="size-6 link" />
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    href="/metronic/tailwind/react/demo1/account/home/get-started/account/billing/basic">
                                        Billing &amp; Payments
                                </a>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Simplify payments today with secure, user-friendly transaction processes.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-notification-on text-2xl link"></i> */}
                                <HiOutlineBellAlert className="size-6 link" />

                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    href="/metronic/tailwind/react/demo1/account/notifications">
                                    Notifications
                                </a>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Keep updated with important notices and event reminders.
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-user text-2xl link"></i> */}
                                <HiOutlineUserGroup className="size-6 link" />
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    to="/account/roles">
                                    Members, Teams & Roles
                                </Link>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Efficient management of members, teams, and roles.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-mouse-square text-2xl link"></i> */}
                                <HiOutlineSparkles className="size-6 link" />
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    href="/metronic/tailwind/react/demo1/account/appearance">
                                    Appearance
                                </a>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Transforming your online presence with flawless appearance.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-desktop-mobile text-2xl link"></i> */}
                                <HiOutlineTv className="size-6 link" />
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    href="/metronic/tailwind/react/demo1/account/home/get-started">
                                    Devices
                                </a>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Stay ahead with the latest devices and innovations news
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-color-swatch text-2xl link"></i> */}
                                <HiOutlineSwatch className="size-6 link" />
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    href="/metronic/tailwind/react/demo1/account/invite-a-friend">
                                    Brand
                                </a>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Trending brand designs, identities, and logos.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5 lg:p-7.5 lg:pt-7">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-2">
                                {/* <i className="ki-filled ki-chart-line-star text-2xl link"></i> */}
                                <HiOutlineArrowTrendingUp  className="size-6 link" />
                                <div className="menu items-stretch">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiOutlineEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a className="text-base font-medium leading-none text-gray-900 hover:text-primary-active"
                                    href="/metronic/tailwind/react/demo1/account/activity">
                                    Activity
                                </a>
                                <span className="text-2sm text-gray-700 leading-5">
                                    Central Hub for Personal Customization.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountSettings;
