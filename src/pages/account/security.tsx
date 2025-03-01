import { HiArrowRightStartOnRectangle, HiDocumentMagnifyingGlass, HiOutlineChatBubbleLeftRight, HiOutlineCheckCircle, HiOutlinePencilSquare, HiOutlineShieldCheck } from "react-icons/hi2"
import InfoSection from "../../layouts/Info"
import { useState } from "react"

const AccountSecurity: React.FC = () => {
    const [TFA, setTFA] = useState(false)
    const [receiptAlert, setReceiptAlert] = useState(false);
    const handleTFAChange = () => setTFA(!TFA)
    const handleReceiptAlert = () => setReceiptAlert(!receiptAlert);
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
                            <div className="card">
                                <div className="card-body px-10 py-7.5 lg:pe-12.5">
                                    <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-6 md:gap-10 p-2.5">
                                        <div className="flex flex-col items-start gap-3 md:max-w-[60%]">
                                            <h2 className="text-1.5xl font-semibold text-gray-900">
                                                Essential Personal Security Tips for Enhanced Safety
                                            </h2>
                                            <p className="text-sm font-normal text-gray-700 leading-5.5 mb-2.5">
                                                Transform your living space beautifully with our Restyle Your Space: Soft Goods Makeover Ideas tutorial
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                <div className="flex items-center gap-1.5 pe-7.5">
                                                    <HiOutlineCheckCircle className="size-5 text-success" />
                                                    <span className="text-sm text-gray-900 text-nowrap">
                                                        Strong Passwords
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 pe-7.5">
                                                    <HiOutlineCheckCircle className="size-5 text-success shrink-0" />
                                                    <span className="text-sm text-gray-900 text-nowrap">
                                                        Two-Factor Authentication
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 pe-7.5">
                                                    <HiOutlineCheckCircle className="size-5 text-success" />
                                                    <span className="text-sm text-gray-900 text-nowrap">
                                                        Budget-Friendly
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 pe-7.5">
                                                    <HiOutlineCheckCircle className="size-5 text-success" />
                                                    <span className="text-sm text-gray-900 text-nowrap">
                                                        Fresh Look
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <img src="/images/illustrations/5.svg" className="block dark:hidden max-h-36" alt="" />
                                            <img src="/images/illustrations/5-dark.svg" className="hidden dark:block max-h-36" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer justify-center!">
                                    <a className="btn btn-link" href="/metronic/tailwind/react/demo1/account/security/overview">
                                        Review Security Tips
                                    </a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-group flex items-center justify-between py-4 gap-2.5">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative size-[50px] shrink-0">
                                            <svg className="w-full h-full stroke-gray-300 fill-gray-100" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                                                    18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                                                    39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="">
                                                </path>
                                                <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                                    18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                                    39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="">
                                                </path>
                                            </svg>
                                            <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                                {/* <i className="ki-filled ki-shield-tick text-1.5xl text-gray-500"></i> */}
                                                <HiDocumentMagnifyingGlass className="size-6 text-gray-500"  />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900">
                                                Show up in search results
                                            </span>
                                            <span className="text-2sm text-gray-700">
                                                Control your visibility by choosing if you appear in search results.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="switch switch-sm">
                                            <input title="TFA" type="checkbox" name="TFA" checked={TFA} onChange={handleTFAChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-group flex items-center justify-between py-4 gap-2.5">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative size-[50px] shrink-0">
                                            <svg className="w-full h-full stroke-gray-300 fill-gray-100" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                                                    18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                                                    39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="">
                                                </path>
                                                <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                                    18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                                    39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="">
                                                </path>
                                            </svg>
                                            <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                            <i className="ki-filled ki-exit-right text-1.5xl text-gray-500"></i>
                                                <HiOutlineChatBubbleLeftRight  className="size-6 text-gray-500"  />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900">
                                                Manage Read Receipts for Messages
                                            </span>
                                            <span className="text-2sm text-gray-700">
                                                Enable or disable read receipts for private messages.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="switch switch-sm">
                                            <input title="receiptAlert" type="checkbox" name="receiptAlert" checked={receiptAlert} onChange={handleReceiptAlert} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card min-w-full">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Authentication
                                    </h3>
                                </div>
                                <div className="card-table scrollable-x-auto pb-3">
                                    <table className="table align-middle text-sm text-gray-500">
                                        <tbody>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    Password
                                                </td>
                                                <td className="text-gray-700 font-normal">
                                                    Password last changed 2 months ago
                                                </td>
                                                <td className="text-end">
                                                    <a href="#" className="btn btn-sm btn-icon btn-icon-lg link">
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-normal">
                                                    2FA
                                                </td>
                                                <td className="text-gray-700 font-normal">
                                                    To be set
                                                </td>
                                                <td className="text-end">
                                                    <a href="#" className="btn btn-link btn-sm">
                                                        Setup
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Sign-in with</td>
                                                <td>
                                                    <div className="flex items-center gap-2.5">
                                                        <a href="#" className="flex items-center justify-center size-8 bg-light rounded-full border border-gray-300">
                                                            <img src="/images/brand-logos/google.svg" className="size-4" alt="" />
                                                        </a>
                                                        <a href="#" className="flex items-center justify-center size-8 bg-light rounded-full border border-gray-300">
                                                            <img src="/images/brand-logos/facebook.svg" className="size-4" alt="" />
                                                        </a>
                                                        <a href="#" className="flex items-center justify-center size-8 bg-light rounded-full border border-gray-300">
                                                            <img src="/images/brand-logos/apple-black.svg" className="block dark:hidden size-4" alt="" />
                                                            <img src="/images/brand-logos/apple-white.svg" className="hidden dark:block size-4" alt="" />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="text-end">
                                                    <a href="#" className="btn btn-sm btn-icon btn-icon-lg link">
                                                        <HiOutlinePencilSquare />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-group flex items-center justify-between py-4 gap-2.5">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative size-[50px] shrink-0">
                                            <svg className="w-full h-full stroke-gray-300 fill-gray-100" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                                                    18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                                                    39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="">
                                                </path>
                                                <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                                    18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                                    39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="">
                                                </path>
                                            </svg>
                                            <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                                {/* <i className="ki-filled ki-shield-tick text-1.5xl text-gray-500"></i> */}
                                                <HiOutlineShieldCheck className="size-6 text-gray-500"  />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900">
                                                Enforce two-step verification
                                            </span>
                                            <span className="text-2sm text-gray-700">
                                                Add an extra layer of security with two-step verification.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="switch switch-sm">
                                            <input title="TFA" type="checkbox" name="TFA" checked={TFA} onChange={handleTFAChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-group flex items-center justify-between py-4 gap-2.5">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative size-[50px] shrink-0">
                                            <svg className="w-full h-full stroke-gray-300 fill-gray-100" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                                                    18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                                                    39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="">
                                                </path>
                                                <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                                    18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                                    39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="">
                                                </path>
                                            </svg>
                                            <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                            <i className="ki-filled ki-exit-right text-1.5xl text-gray-500"></i>
                                                <HiArrowRightStartOnRectangle className="size-6 text-gray-500"  />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900">
                                                Logout everyone
                                            </span>
                                            <span className="text-2sm text-gray-700">
                                                Instantly sign out all users from all devices.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <a href="#" className="btn btn-sm btn-light btn-outline">
                                            Logout everyone
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col gap-5 lg:gap-7.5">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Block List
                                    </h3>
                                </div>
                                <div className="card-body flex flex-col gap-5">
                                    <div className="text-sm text-gray-800">
                                        Users on the block list are unable to send chat requests or messages to you.
                                    </div>
                                    <div className="input-group">
                                        <input className="input" placeholder="Block new user" type="text" value="" />
                                        <span className="btn btn-primary">
                                            Add
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex items-center justify-between gap-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="">
                                                    <img src="/images/avatars/gray/1.png"
                                                        className="h-9 rounded-full" alt="" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <a className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900 hover:text-primary"
                                                        href="/metronic/tailwind/react/demo1/public-profile/teams">
                                                        Esther Howard
                                                    </a>
                                                    <span className="text-2sm text-gray-700">
                                                        6 commits
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <a href="#" className="btn btn-sm btn-icon btn-clear btn-light">
                                                    <i className="ki-filled ki-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="">
                                                    <img src="/images/avatars/gray/2.png" className="h-9 rounded-full" alt=""/>
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <a className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900 hover:text-primary"
                                                        href="/metronic/tailwind/react/demo1/public-profile/teams">
                                                        Tyler Hero
                                                    </a>
                                                    <span className="text-2sm text-gray-700">
                                                        29 commits
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <a href="#" className="btn btn-sm btn-icon btn-clear btn-light">
                                                    <i className="ki-filled ki-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="">
                                                    <img src="/images/avatars/gray/3.png"
                                                        className="h-9 rounded-full" alt="" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <a className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900 hover:text-primary"
                                                        href="/metronic/tailwind/react/demo1/public-profile/teams">
                                                        Arlene McCoy
                                                    </a>
                                                    <span className="text-2sm text-gray-700">
                                                        34 commits
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <a href="#" className="btn btn-sm btn-icon btn-clear btn-light">
                                                    <i className="ki-filled ki-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="">
                                                    <img src="/images/avatars/gray/4.png"
                                                        className="h-9 rounded-full" alt="" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <a className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900 hover:text-primary"
                                                        href="/metronic/tailwind/react/demo1/public-profile/teams">
                                                        Cody Fisher
                                                    </a>
                                                    <span className="text-2sm text-gray-700">
                                                        1 commit
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <a href="#" className="btn btn-sm btn-icon btn-clear btn-light">
                                                    <i className="ki-filled ki-trash"></i>
                                                </a>
                                            </div>
                                        </div>
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
export default AccountSecurity