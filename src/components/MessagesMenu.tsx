import { HiOutlineEllipsisVertical } from "react-icons/hi2"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { RxCross1 } from "react-icons/rx"


interface MessagesMenuProps {
    onClose: () => void;
}
const MessagesMenu: React.FC<MessagesMenuProps> = ({onClose}) => {
    return (
        <div className="menu-container flex pointer-events-auto">
            <div className="menu-dropdown light:border-gray-300 min-w-[450px]">
                <div>
                    <div className="flex items-center justify-between gap-2.5 text-sm text-gray-900 font-semibold px-5 py-2.5">
                        Chat
                        <button onClick={onClose} className="btn btn-sm btn-icon btn-light btn-clear shrink-0">
                            <RxCross1 />
                            {/* <i className="ki-filled ki-cross"></i> */}
                        </button>
                    </div>
                    <div className="border-b border-b-gray-200"></div>
                    {/* Team  */}
                    <div className="shadow-card border-b border-gray-200 py-2.5">
                        <div className="flex items-center justify-between flex-wrap gap-2 px-5">
                            <div className="flex items-center flex-wrap gap-2">
                                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-11">
                                    <img src="/images/brand-logos/gitlab.svg"
                                        className="size-7" alt=""
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <a className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                                        href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns">
                                        HR Team
                                    </a>
                                    <span className="text-2xs font-medium italic text-gray-500">
                                        Jessy is typing..
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="flex -space-x-2">
                                    <div className="flex">
                                        <img src="/images/avatars/300-4.png"
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img src="/images/avatars/300-1.png"
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img src="/images/avatars/300-2.png"
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse size-6 ring-success-light bg-success">
                                            +10
                                        </span>
                                    </div>
                                </div>
                                <div className="menu">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            <HiOutlineEllipsisVertical />
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Messages */}
                <div className="scrollable-y-auto max-h-[341.8px]">
                    <div className="flex flex-col gap-5 py-5">
                        <div className="flex items-end gap-3.5 px-5">
                            <img src="/images/avatars/300-5.png"
                                className="rounded-full size-9" alt="" 
                            />
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex flex-col bg-gray-100 gap-2.5 p-3 rounded-bl-none text-2sm font-medium text-gray-700">
                                    Hello! <br />
                                    Next week we are closing the project. Do You have questions?
                                </div>
                                <span className="text-2xs font-medium text-gray-500">
                                    14:04
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-3.5 px-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex bg-primary! text-primary-inverse text-2sm font-medium flex-col gap-2.5 p-3 rounded-be-none">
                                    This is excellent news!
                                </div>
                                <div className="flex items-center justify-end relative">
                                    <span className="text-2xs font-medium text-gray-600 me-6">
                                        14:08
                                    </span>
                                    <IoCheckmarkDoneOutline className="text-success" />
                                    {/* <i className="ki-filled ki-double-check text-lg absolute text-success"></i> */}
                                </div>
                            </div>
                            <div className="relative shrink-0">
                                <img src="/images/avatars/300-2.png"
                                    className="rounded-full size-9" alt=""
                                />
                                <span className="size-[4.8px] badge badge-circle badge-success absolute top-7 end-0 transform -translate-y-1/2"></span>
                            </div>
                        </div>
                        <div className="flex items-end gap-3.5 px-5">
                            <img src="/images/avatars/300-4.png"
                                className="rounded-full size-9" alt=""
                            />
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex flex-col bg-gray-100 gap-2.5 p-3 rounded-bl-none text-2sm font-medium text-gray-700">
                                    I have checked the features, can not wait to demo them!
                                </div>
                                <span className="text-2xs font-medium text-gray-500">
                                    14:26
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end gap-3.5 px-5">
                            <img src="/images/avatars/300-1.png"
                                className="rounded-full size-9" alt=""
                            />
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex flex-col bg-gray-100 gap-2.5 p-3 rounded-bl-none text-2sm font-medium text-gray-700">
                                    I have looked over the rollout plan, and everything seems spot on. I am ready on my end and can not wait for the user feedback.
                                </div>
                                <span className="text-2xs font-medium text-gray-500">
                                    15:09
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-3.5 px-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex bg-primary! text-primary-inverse text-2sm font-medium flex-col gap-2.5 p-3 rounded-be-none">
                                    Haven't seen the build yet, I'll look now.
                                </div>
                                <div className="flex items-center justify-end relative">
                                    <span className="text-2xs font-medium text-gray-600 me-6">
                                        15:52
                                    </span>
                                    <IoCheckmarkDoneOutline className="text-gray-400" />
                                    {/* <i className="ki-filled ki-double-check text-lg absolute text-gray-400"></i> */}
                                </div>
                            </div>
                            <div className="relative shrink-0">
                                <img src="/images/avatars/300-2.png"
                                    className="rounded-full size-9" alt=""
                                />
                                <span className="size-[4.8px] badge badge-circle badge-success absolute top-7 end-0 transform -translate-y-1/2"></span>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-3.5 px-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex bg-primary! text-primary-inverse text-2sm font-medium flex-col gap-2.5 p-3 rounded-be-none">
                                    Checking the build now
                                </div>
                                <div className="flex items-center justify-end relative">
                                    <span className="text-2xs font-medium text-gray-600 me-6">
                                        15:52
                                    </span>
                                    <IoCheckmarkDoneOutline className="text-gray-400" />
                                    {/* <i className="ki-filled ki-double-check text-lg absolute text-gray-400"></i> */}
                                </div>
                            </div>
                            <div className="relative shrink-0">
                                <img src="/images/avatars/300-2.png"
                                    className="rounded-full size-9" alt=""
                                />
                                <span className="size-[4.8px] badge badge-circle badge-success absolute top-7 end-0 transform -translate-y-1/2"></span>
                            </div>
                        </div>
                        <div className="flex items-end gap-3.5 px-5">
                            <img src="/images/avatars/300-4.png"
                                className="rounded-full size-9" alt=""
                            />
                            <div className="flex flex-col gap-1.5">
                                <div className="card shadow-none flex flex-col bg-gray-100 gap-2.5 p-3 rounded-bl-none text-2sm font-medium text-gray-700">
                                    Tomorrow, I will send the link for the meeting
                                </div>
                                <span className="text-2xs font-medium text-gray-500">
                                    17:40
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    {/* Join Request */}
                    <div className="flex grow gap-2 p-5 bg-gray-100 mb-2.5" id="join_request">
                        <div className="relative shrink-0">
                            <img src="/images/avatars/300-14.png"
                                className="rounded-full size-8" alt=""
                            />
                            <span className="size-1.5 badge badge-circle bg-gray-400 absolute top-7 end-0.5 ring-1 ring-light transform -translate-y-1/2"></span>
                        </div>
                        <div className="flex items-center justify-between gap-3 grow">
                            <div className="flex flex-col">
                                <div className="flex gap-1 text-2sm mb-px">
                                    <a className="hover:text-primary-active font-semibold text-gray-900"
                                        href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns">
                                        Jane Perez
                                    </a>
                                    <span className="text-gray-600">
                                        wants to join chat
                                    </span>
                                </div>
                                <span className="flex items-center text-2xs font-medium text-gray-500">
                                    1 day ago
                                    <span className="badge badge-circle bg-gray-500 size-1 mx-1.5"></span>
                                    Design Team
                                </span>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="btn btn-light btn-xs" data-dismiss="#join_request">
                                    Decline
                                </button>
                                <button className="btn btn-dark btn-xs">
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Input Section */}
                    <div className="relative grow mx-5 mb-2.5">
                        <img src="/images/avatars/300-2.png"
                            className="rounded-full size-[30px] absolute start-0 top-2/4 -translate-y-2/4 ms-2.5" alt="" 
                        />
                        <input type="text" className="input h-auto py-4 ps-12! bg-transparent"
                            placeholder="Write a message..."
                            value=""
                        />
                        <div className="flex items-center gap-2.5 absolute end-3 top-1/2 -translate-y-1/2">
                            <button className="btn btn-sm btn-icon btn-light btn-clear">
                                <i className="ki-filled ki-exit-up"></i>
                            </button>
                            <button className="btn btn-dark btn-sm">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MessagesMenu