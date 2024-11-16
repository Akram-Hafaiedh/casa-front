import { HiMiniEllipsisVertical, HiMiniSquaresPlus, HiOutlineChatBubbleBottomCenterText, HiOutlineLink, HiOutlineSquaresPlus } from "react-icons/hi2";

const ProjectTasks: React.FC = () => {
    return (
        <div className="grid flex-grow grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card grow">
                <div className="card-header">
                    <h3 className="card-title">
                        Yet To Start
                        <span className="text-gray-400 text-md ms-2">2</span>
                    </h3>
                    <button type="button" className="btn btn-light btn-sm">
                        <HiOutlineSquaresPlus />
                    </button>
                </div>
                <div className="card-body lg:pb-7.5">
                    <div className="grid gap-5">
                        <div className="card">
                            <div className="card-body p-5 lg:p-7.5">
                                <div className="flex items-center justify-between mb-3 lg:mb-5">
                                    <div className="badge badge-pill badge-outline badge-sm">
                                        Testing
                                    </div>
                                    <button type="button" className="btn btn-sm btn-icon btn-clear btn-light">
                                        <HiMiniEllipsisVertical />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2.5">
                                    <a className="text-base font-medium text-gray-900 hover:text-primary-active"
                                        href="/metronic/tailwind/react/demo1/account/billing/basic">
                                        Jira
                                    </a>
                                    <span className="text-2sm text-gray-700">
                                        Project management for agile teams, tracking issues and tasks.
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer justify-between items-center py-3.5">
                                <div className="flex -space-x-2">
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-14.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-3.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-19.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-9.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5 mb-3">

                                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                                        <span className="text-gray-900 text-sm leading-none font-medium">
                                            <HiOutlineLink className="size-4" />
                                        </span>
                                        <span className="text-gray-900 text-xs font-medium">
                                            5
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                                        <span className="text-gray-700 text-xs">
                                            <HiOutlineChatBubbleBottomCenterText className='size-4'/> 
                                        </span>
                                        <span className="text-gray-900 text-xs leading-none font-medium">
                                            1
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body p-5 lg:p-7.5">
                                <div className="flex items-center justify-between mb-3 lg:mb-5">
                                    <div className="badge badge-pill badge-outline badge-sm">
                                        Developpement
                                    </div>
                                    <div className="btn btn-sm btn-icon btn-clear btn-light">
                                        <HiMiniEllipsisVertical />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2.5">
                                    <a className="text-base font-medium text-gray-900 hover:text-primary-active"
                                        href="/metronic/tailwind/react/demo1/account/billing/enterprise">
                                        Inferno
                                    </a>
                                    <span className="text-2sm text-gray-700">
                                        Ensures healthcare app compatibility with FHIR standards.
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer justify-between items-center py-3.5">
                                <div className="flex -space-x-2">
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-6.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-23.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img 
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-12.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                                        +10
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5 mb-3">

                                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                                        <span className="text-gray-900 text-sm leading-none font-medium">
                                            <HiOutlineLink className="size-4" />
                                        </span>
                                        <span className="text-gray-900 text-xs font-medium">
                                            5
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                                        <span className="text-gray-700 text-xs">
                                            <HiOutlineChatBubbleBottomCenterText className='size-4'/> 
                                        </span>
                                        <span className="text-gray-900 text-xs leading-none font-medium">
                                            6
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body p-5 lg:p-7.5">
                                <div className="flex items-center justify-between mb-3 lg:mb-5">
                                    <div className="badge badge-pill badge-outline badge-sm">
                                        UI Design
                                    </div>
                                    <button type="button" className="btn btn-sm btn-icon btn-clear btn-light">
                                        <HiMiniEllipsisVertical />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2.5">
                                    <a className="text-base font-medium text-gray-900 hover:text-primary-active"
                                        href="/metronic/tailwind/react/demo1/account/billing/plans">
                                        Evernote
                                    </a>
                                    <span className="text-2sm text-gray-700">
                                        Organizes personal and professional documents, ideas, tasks.
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer justify-between items-center py-3.5">
                                <div className="flex -space-x-2">
                                    <div className="flex">
                                        <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-4.png"
                                            alt="Images"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                            src="/images/avatars/300-2.png"
                                            alt="Images"
                                        />
                                    </div>
                                    <div className="flex">
                                        <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                                        S
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5 mb-3">

                                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                                        <span className="text-gray-900 text-sm leading-none font-medium">
                                            <HiOutlineLink className="size-4" />
                                        </span>
                                        <span className="text-gray-900 text-xs font-medium">
                                            6
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                                        <span className="text-gray-700 text-xs">
                                            <HiOutlineChatBubbleBottomCenterText className='size-4'/> 
                                        </span>
                                        <span className="text-gray-900 text-xs leading-none font-medium">
                                            2
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card grow">
                <div className="card-header">
                    <h3 className="card-title">
                        In Progress
                        <span className="text-gray-400 text-md ms-2">0</span>
                    </h3>
                    <button type="button" className="btn btn-light btn-sm">
                        <HiOutlineSquaresPlus />
                    </button>
                </div>
                <div className="card-body lg:pb-7.5">
                    <div className="grid gap-5">
                        <div className="card !border-2 border-dashed !border-brand-clarity bg-center bg-[length:600px] bg-no-repeat min-h-65"
                            style={{ backgroundImage: `url("/images/2600x1200/bg-4.png")` }}>
                            <div className="card-body p-5 lg:p-7.5">
                                <div className="flex flex-col gap-1 lg:gap-2.5 items-center justify-center w-full h-full">
                                    <div className="relative size-[50px] shrink-0 flex items-center justify-center">
                                        <svg className="w-full h-full stroke-primary-clarity fill-primary-light" fill="none" height="48" viewBox="0 0 44 48" width="44" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506
                                                18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937
                                                39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="#EFF6FF">
                                            </path>
                                            <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506
                                                18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937
                                                39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="#1B84FF" stroke-opacity="0.2">
                                            </path>
                                        </svg>
                                        <HiMiniSquaresPlus className="absolute size-6 ps-px text-primary" />
                                    </div>
                                    <a className="text-lg font-medium text-gray-900 hover:text-primary-active"
                                        href="/metronic/tailwind/react/demo1/account/billing/basic">
                                        Add New Task
                                    </a>
                                    <span className="text-2sm text-gray-700">
                                        Project management for agile teams, tracking issues and tasks.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectTasks;
