import { HiOutlineCog } from "react-icons/hi"
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"
import { RxCross1 } from "react-icons/rx"

interface SearchMenuProps {
    onClose: () => void
}
const SearchMenu: React.FC<SearchMenuProps> = ({onClose}) => {
    return (
        <div role="presentation"
            style={{ zIndex: 100, opacity: 1, display: 'block' }}
            className="base-Modal-root modal">
            <div className="modal-backdrop transition-all duration-300 -z-1 base-Modal-backdrop"
                aria-hidden="true"
                open=""
            ></div>
            <div tabIndex={0} 
                data-testid="sentinelStart"
            ></div>
            <div tabIndex={-1} className="modal-content max-w-[600px] top-[15%]">
                <div className="modal-header py-4 px-5">
                    <HiOutlineMagnifyingGlass className="text-gray-700 text-xl" />
                    <input type="text" name="query" className="input px-0 border-none bg-transparent shadow-none ms-2.5 focus:shadow-none" placeholder="Tap to start search" value="" />
                    <button type="button" title="Clear" onClick={onClose} className="btn btn-sm btn-icon btn-light btn-clear shrink-0">
                        {/* <i className="ki-filled ki-cross"></i> */}
                        <RxCross1 />
                    </button>
                </div>
                <div tabIndex={-1} className="modal-body p-0 pb-5">
                    <div className="base-Tabs-root base-Tabs-horizontal">
                        <div tabIndex={-1} role="tablist" className="base-TabsList-root base-TabsList-horizontal justify-between px-5 mb-2.5 tabs">
                            <div className="flex items-center gap-5">
                                <button tabIndex={-1} type="button" role="tab" aria-selected="false" id=":r2a:" className="base-Tab-root tab" aria-disabled="false" aria-controls=":r2h:">
                                    Mixed
                                </button>
                                <button tabIndex={-1} type="button" role="tab" aria-selected="false" id=":r2b:" className="base-Tab-root tab" aria-disabled="false" aria-controls=":r2i:">
                                    Settings
                                </button>
                                <button tabIndex={0} type="button" role="tab" aria-selected="true" id=":r2c:" className="base-Tab-root base--selected tab active" aria-disabled="false" aria-controls=":r2j:">
                                    Integrations
                                </button>
                                <button tabIndex={-1} type="button" role="tab" aria-selected="false" id=":r2d:" className="base-Tab-root tab" aria-disabled="false" aria-controls=":r2k:">
                                    Users
                                </button>
                                <button tabIndex={-1} type="button" role="tab" aria-selected="false" id=":r2e:" className="base-Tab-root tab" aria-disabled="false" aria-controls=":r2l:">
                                    Docs
                                </button>
                                <button tabIndex={-1} type="button" role="tab" aria-selected="false" id=":r2f:" className="base-Tab-root tab" aria-disabled="false" aria-controls=":r2m:">
                                    Empty
                                </button>
                                <button tabIndex={-1} type="button" role="tab" aria-selected="false" id=":r2g:" className="base-Tab-root tab" aria-disabled="false" aria-controls=":r2n:">
                                    No Results
                                </button>
                            </div>
                            <div className="menu items-stretch">
                                <div className="menu-item menu-item-dropdown">
                                    <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                        {/* <i className="ki-filled ki-setting-2"></i> */}
                                        <HiOutlineCog />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="scrollable-y-auto" style={{ maxHeight: '411px'}}>
                            <div id=":r2h:" role="tabpanel"
                                className="base-TabPanel-root base-TabPanel-hidden"
                                aria-labelledby=":r2a:"
                                hidden=""
                                ></div>
                            <div id=":r2i:" role="tabpanel"
                                className="base-TabPanel-root base-TabPanel-hidden"
                                aria-labelledby=":r2b:" 
                                hidden=""
                                ></div>
                            <div id=":r2j:" role="tabpanel"
                                className="base-TabPanel-root"
                                aria-labelledby=":r2c:"
                                >
                                <div className="menu menu-default p-0 flex-col">
                                    <div className="menu-item">
                                        <div className="menu-link flex items-center justify-between gap-2">
                                            <div className="flex items-center grow gap-2">
                                                <div className="flex items-center justify-center size-10 shrink-0 rounded-full border border-gray-200 bg-gray-100">
                                                    <img src="/images/brand-logos/jira.svg"
                                                        className="size-6 shrink-0" alt="Jira" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <a href="#" className="text-2sm font-semibold text-gray-900 hover:text-primary-active">
                                                        Jira
                                                    </a>
                                                    <span className="text-2xs font-medium text-gray-600">
                                                        Project management
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end shrink-0">
                                                <div className="flex -space-x-2">
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-4.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt="" />
                                                    </div>
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-1.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt="" />
                                                    </div>
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-2.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt="" />
                                                    </div>
                                                    <div className="flex">
                                                        <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse size-6 ring-success-light bg-success">
                                                            +3
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="menu-item">
                                        <div className="menu-link flex items-center justify-between gap-2">
                                            <div className="flex items-center grow gap-2">
                                                <div className="flex items-center justify-center size-10 shrink-0 rounded-full border border-gray-200 bg-gray-100">
                                                    <img src="/images/brand-logos/inferno.svg"
                                                        className="size-6 shrink-0" alt="Inferno" />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <a href="#" className="text-2sm font-semibold text-gray-900 hover:text-primary-active">
                                                        Inferno
                                                    </a>
                                                    <span className="text-2xs font-medium text-gray-600">
                                                        Real-time photo sharing app
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end shrink-0">
                                                <div className="flex -space-x-2">
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-14.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                            />
                                                    </div>
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-12.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                        />
                                                    </div>
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-9.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="menu-item">
                                            <div className="menu-link flex items-center justify-between gap-2">
                                                <div className="flex items-center grow gap-2">
                                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full border border-gray-200 bg-gray-100">
                                                        <img src="/images/brand-logos/evernote.svg"
                                                            className="size-6 shrink-0"
                                                            alt="Evernote"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <a href="#" className="text-2sm font-semibold text-gray-900 hover:text-primary-active">
                                                            Evernote
                                                        </a>
                                                        <span className="text-2xs font-medium text-gray-600">
                                                            Notes management app
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end shrink-0">
                                                    <div className="flex -space-x-2">
                                                        <div className="flex">
                                                            <img src="/images/avatars/300-6.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                        />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="/images/avatars/300-3.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="/images/avatars/300-1.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="/images/avatars/300-8.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="menu-item">
                                            <div className="menu-link flex items-center justify-between gap-2">
                                                <div className="flex items-center grow gap-2">
                                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full border border-gray-200 bg-gray-100">
                                                        <img src="/images/brand-logos/gitlab.svg"
                                                            className="size-6 shrink-0" alt="Gitlab"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <a href="#" className="text-2sm font-semibold text-gray-900 hover:text-primary-active">
                                                            Gitlab
                                                        </a>
                                                    <span className="text-2xs font-medium text-gray-600">
                                                        Version control and CI/CD platform
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end shrink-0">
                                                <div className="flex -space-x-2">
                                                    <div className="flex">
                                                        <img src="/images/avatars/300-18.png"
                                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <img src="/images/avatars/300-17.png"
                                                        className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-item"><div className="menu-link flex items-center justify-between gap-2">
                                    <div className="flex items-center grow gap-2">
                                        <div className="flex items-center justify-center size-10 shrink-0 rounded-full border border-gray-200 bg-gray-100">
                                            <img src="/images/brand-logos/google-webdev.svg"
                                                className="size-6 shrink-0" alt="Google Webdev"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <a href="#" className="text-2sm font-semibold text-gray-900 hover:text-primary-active">
                                                Google Webdev
                                            </a>
                                            <span className="text-2xs font-medium text-gray-600">
                                                Building web experiences
                                            </span>
                                        </div>
                                    </div>
                                <div className="flex justify-end shrink-0">
                                    <div className="flex -space-x-2">
                                        <div className="flex">
                                            <img src="/images/avatars/300-14.png"
                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img src="/images/avatars/300-20.png"
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                        />
                                    </div>
                                    <div className="flex">
                                        <img src="/images/avatars/300-21.png"
                                            className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" alt=""
                                        />
                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id=":r2k:" role="tabpanel"
                            className="base-TabPanel-root base-TabPanel-hidden"
                            aria-labelledby=":r2d:"
                            hidden=""
                        ></div>
                        <div id=":r2l:" role="tabpanel"
                            className="base-TabPanel-root base-TabPanel-hidden"
                            aria-labelledby=":r2e:"
                            hidden=""
                        ></div>
                        <div id=":r2m:" role="tabpanel"
                            className="base-TabPanel-root base-TabPanel-hidden"
                            aria-labelledby=":r2f:"
                            hidden=""
                        ></div>
                        <div id=":r2n:" role="tabpanel"
                            className="base-TabPanel-root base-TabPanel-hidden"
                            aria-labelledby=":r2g:"
                            hidden=""
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <div tabIndex={0} data-testid="sentinelEnd"></div>
    </div>
    )
}
export default SearchMenu