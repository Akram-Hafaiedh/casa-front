const UserProjects: React.FC = () => {
    return (
        <div className="container-fixed">
            <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
                <div className="flex flex-wrap items-center gap-5 justify-between">
                    <h3 className="text-lg text-gray-900 font-semibold">
                        6 Projects
                    </h3>
                    <div className="btn-tabs" data-tabs="true">
                        <a href="#" className="btn btn-icon" data-tab-toggle="#projects_cards">
                            <i className="ki-filled ki-category"></i>
                        </a>
                        <a href="#" className="btn btn-icon active" data-tab-toggle="#projects_list">
                            <i className="ki-filled ki-row-horizontal"></i>
                        </a>
                    </div>
                </div>
                <div id="projects_list">
                    <div className="flex flex-col gap-5 lg:gap-7.5">
                        <div className="card p-7.5">
                            <div className="flex items-center flex-wrap justify-between gap-5">
                                <div className="flex items-center gap-3.5">
                                    <div className="flex items-center justify-center min-w-12">
                                        <img src="/metronic/tailwind/react/demo1/media/brand-logos/office.svg" className="min-w-12 shrink-0" alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <a href="#" className="text-lg font-medium text-gray-900 hover:text-primary">
                                            Phoenix SaaS
                                        </a>
                                        <div className="text-sm text-gray-700">
                                            Cloud storage and file sharing
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center flex-wrap gap-5 lg:gap-12">
                                    <div className="flex items-center flex-wrap gap-5 lg:gap-14">
                                        <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-gray-300 shrink-0 rounded-md px-2.5 py-2 min-w-24 max-w-auto">
                                            <span className="text-gray-900 text-2sm leading-none font-semibold">
                                                1-3 months
                                            </span>
                                            <span className="text-gray-600 text-xs font-medium">
                                                Duration
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-gray-300 shrink-0 rounded-md px-2.5 py-2 min-w-24 max-w-auto">
                                            <span className="text-gray-900 text-2sm leading-none font-semibold">
                                                Flexible
                                            </span>
                                            <span className="text-gray-600 text-xs font-medium">
                                                Location
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-gray-300 shrink-0 rounded-md px-2.5 py-2 min-w-24 max-w-auto">
                                            <span className="text-gray-900 text-2sm leading-none font-semibold">
                                                $65 hour
                                            </span>
                                            <span className="text-gray-600 text-xs font-medium">
                                                Rate
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-[125px] shrink-0">
                                        <span className="badge badge-md badge-primary badge-outline">
                                            In Progress
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 lg:gap-14">
                                    <div className="grid justify-end min-w-24">
                                        <div className="flex -space-x-2">
                                            <div className="flex">
                                                <img src="/metronic/tailwind/react/demo1/media/avatars/300-4.png" className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7" alt="" />
                                            </div>
                                            <div className="flex">
                                                <img src="/metronic/tailwind/react/demo1/media/avatars/300-1.png" className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7" alt="" />
                                            </div>
                                            <div className="flex">
                                                <img src="/metronic/tailwind/react/demo1/media/avatars/300-2.png" className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7" alt="" />
                                            </div>
                                            <div className="flex">
                                                <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-7 text-primary-inverse ring-primary-light bg-primary">
                                                    S
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="menu items-stretch">
                                        <div className="menu-item menu-item-dropdown">
                                            <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                <i className="ki-filled ki-dots-vertical"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/* Closing the card div */}
                    </div>
                    <div className="flex grow justify-center pt-5 lg:pt-7.5">
                    <a href="#" className="btn btn-link">
                        Show more projects
                    </a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default UserProjects;
