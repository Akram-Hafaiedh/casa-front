import { HiArrowRightStartOnRectangle, HiCamera, HiOutlineEllipsisVertical, HiOutlinePencilSquare, HiOutlineXMark } from "react-icons/hi2"
import InfoSection from "../../layouts/Info"
import moment from "moment"

const AccountProfile = () => {
    const address = '123 Main Street, New York';
    return (
        <>
            <div className="container-fixed">
                <InfoSection 
                    title="Settings - Account Profile"
                    description="Central Hub for Personal Customization"
                />
            </div>
            <div className="container-fixed">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="col-span-2">
                        <div className="flex flex-col gap-5 lg:gap-7.5">
                            <div className="card min-w-full">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h3 className="card-title">Personnal Info</h3>
                                    </div>
                                </div>
                                <div className="card-table scrollable-x-auto pb-3">
                                    <table className="table align-middle text-sm text-gray-500" id="personal_info_table">
                                        <tbody>
                                            <tr>
                                                <td className="py-2 min-w-28 text-gray-600 font-normal">
                                                    Photo
                                                </td>
                                                <td className="py-2 text-gray700 font-normal min-w-32 text-2sm">
                                                    150x150px JPEG, PNG Image
                                                </td>
                                                <td className="py-2 text-center">
                                                    <div className="flex justify-center items-center">
                                                        <input className="hidden" type="file" accept="image/*" />
                                                        <div className="image-input size-16">
                                                            <div className="btn btn-icon btn-icon-xs btn-light shadow-default absolute z-1 !size-5 -top-0.5 -end-0.5 !rounded-full">
                                                                {/* <i className="ki-filled ki-cross"></i> */}
                                                                <HiOutlineXMark className="size-6" />
                                                            </div>
                                                            <span className="tooltip" id="image_input_tooltip">
                                                                Click to remove or revert
                                                            </span>
                                                            <div className="image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300"
                                                                style={{ backgroundImage: "url('/images/avatars/blank.png')"}}>
                                                                <img src="/images/avatars/300-2.png" alt="avatar" />
                                                                <div className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-dark-clarity absolute">
                                                                    <HiCamera className="fill-light opacity-80" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="min-w-56 text-gray-600 font-normal">
                                                    Name
                                                </td>
                                                <td className="min-w-48 w-full text-gray-800 font-normal">
                                                    Cody Fisher
                                                </td>
                                                <td className="min-w-16 text-center">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        {/* <i className="ki-filled ki-notepad-edit"></i> */}
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    Phone number
                                                </td>
                                                <td className="text-gray-800 font-normal">
                                                    +1 555-1234
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        {/* <i className="ki-filled ki-notepad-edit"></i> */}
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    ID / Passport
                                                </td>
                                                <td className="text-gray-800 font-normal">
                                                    123456789
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        {/* <i className="ki-filled ki-notepad-edit"></i> */}
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-gray-600 font-normal">
                                                    Gender
                                                </td>
                                                <td className="py-3 text-gray-700 text-sm font-normal">
                                                    Male
                                                </td>
                                                <td className="py-3 text-center">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    Birthday
                                                </td>
                                                <td className="text-gray-800 font-normal">
                                                    {moment('01/01/1990').format('DD MMMM YYYY')}
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    VAT number
                                                </td>
                                                <td className="text-gray-800 font-normal">
                                                    <span className="badge badge-sm badge-outline badge-danger">
                                                        Missing Details
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-link btn-sm">
                                                        Add
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    Address
                                                </td>
                                                <td className="text-gray-800 font-normal">
                                                    {address ? address : 'You have no address yet'} 
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        {/* <i className="ki-filled ki-notepad-edit"></i> */}
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="card min-w-full">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h3>Account Settings</h3>
                                    </div>
                                </div>
                                <div className="card-table scrollable-x-auto pb-3">
                                    <table className="table align-middle text-sm text-gray-500" id="account_settings_table">
                                        <tbody>
                                            <tr>
                                                <td className="py-2 min-w-36 text-gray-600 font-normal">
                                                    Email
                                                </td>
                                                <td className="py-2 min-w-60">
                                                    <a href="#" className="text-gray-800 font-normal text-sm hover:text-primary-active">
                                                        jasontt@studio.co
                                                    </a>
                                                </td>
                                                <td className="py-2 max-w-16 text-end">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 text-gray-600 font-normal">
                                                    Password
                                                </td>
                                                <td className="py-2 text-gray-700 font-normal">
                                                    Password last changed 2 months ago
                                                </td>
                                                <td className="py-2 text-end">
                                                    <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card min-w-full">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Trusted Devices
                                    </h3>
                                    <div className="menu items-stretch">
                                        <div className="menu-item menu-item-dropdown">
                                            <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                                <HiOutlineEllipsisVertical />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-table scrollable-x-auto">
                                    <div className="scrollable-auto">
                                        <table className="table align-middle text-gray-600 font-medium text-2sm">
                                            <tbody>
                                                <tr>
                                                    <td className="min-w-48 w-48">
                                                        <div className="flex items-center gitem gap-2.5">
                                                            <img src="/images/brand-logos/chrome.svg" className="h-6" alt="image" />
                                                            <div className="flex flex-col">
                                                                <div className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px">
                                                                    Chrome
                                                                </div>
                                                                <div className="flex gap-1.5">
                                                                    <span className="text-xs text-gray-700">
                                                                        Seville, Spain
                                                                    </span>
                                                                    <img src="/images/flags/spain.svg" className="h-3.5 rounded-full" alt="image" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="min-w-32 text-gray-700 font-normal">
                                                        MacOS 12.19.6<br />Active: Today at 9:03 AM
                                                    </td>
                                                    <td className="!pr-7.5 min-w-16 text-end">
                                                        <a href="#" className="btn btn-sm btn-icon btn-light btn-clear">
                                                            <HiArrowRightStartOnRectangle />
                                                            {/* <i className="ki-filled ki-exit-right"></i> */}
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="min-w-48 w-48">
                                                        <div className="flex items-center gitem gap-2.5">
                                                            <img src="/images/brand-logos/chrome.svg" className="h-6" alt="image" />
                                                            <div className="flex flex-col">
                                                                <div className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px">
                                                                    Chrome
                                                                </div>
                                                                <div className="flex gap-1.5">
                                                                    <span className="text-xs text-gray-700">
                                                                        Lyon, France
                                                                    </span>
                                                                    <img src="/images/flags/france.svg"
                                                                        className="h-3.5 rounded-full" alt="image" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="min-w-32 text-gray-700 font-normal">
                                                        Android 14.35<br />Active: Mar 18 at 9:03 AM
                                                    </td>
                                                    <td className="!pr-7.5 min-w-16 text-end">
                                                        <a href="#" className="btn btn-sm btn-icon btn-light btn-clear">
                                                            {/* <i className="ki-filled ki-exit-right"></i> */}
                                                            <HiArrowRightStartOnRectangle />
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer justify-center">
                                    <a href="#" className="btn btn-link">
                                        Manage Trusted Devices
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col gap-5 lg:gap-7.5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="flex flex-wrap justify-center gap-2 py-1">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className="text-gray-900 text-2xl lg:text-2.5xl font-semibold">
                                                397
                                            </span>
                                            <span className="text-gray-700 text-sm font-normal">
                                                Releases
                                            </span>
                                        </div>
                                        <span className="sm:ms-8 sm:ps-8 border-s border-s-gray-200"></span>
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className="text-gray-900 text-2xl lg:text-2.5xl font-semibold">
                                                89k
                                            </span>
                                            <span className="text-gray-700 text-sm font-normal">
                                                Earnigns
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Connections
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <div className="flex flex-wrap gap-2.5 xl:me-16">
                                        <img src="/images/avatars/300-1.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-2.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-3.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-5.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-6.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-11.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-7.png" className="rounded-full h-[36px]" alt="" />
                                        <img src="/images/avatars/300-12.png" className="rounded-full h-[36px]" alt="" />
                                    </div>
                                </div>
                                <div className="card-footer justify-center">
                                    <a className="btn btn-link" href="/metronic/tailwind/react/demo1/account/members/teams">
                                        Join Our Team
                                    </a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Skills
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <div className="flex flex-wrap gap-2.5 mb-2">
                                        <span className="badge badge-sm badge-gray-200">
                                            Web Design
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            Code Review
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            Figma
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            Product Development
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            Webflow
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            AI
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            noCode
                                        </span>
                                        <span className="badge badge-sm badge-gray-200">
                                            Management
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AccountProfile