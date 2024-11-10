import { FaMagnifyingGlass } from "react-icons/fa6"
import { Link } from "react-router-dom"

const UserDocuments : React.FC = () => {
    return (
        <div className="container-fixed space-y-5 lg:space-y-7.5">
            <div className="flex items-center justify-between gap-2.5 flex-wrap mb-7.5">
                <h3 className="text-md text-gray-900 font-medium">
                    Showing 15 Users
                </h3>
                <div className="flex items-center flex-wrap gap-2.5">
                    <div className="flex">
                        <label className="input input-sm">
                            {/* <i className="ki-filled ki-magnifier"></i> */}
                            <FaMagnifyingGlass />
                            <input 
                                placeholder="Search"
                                type="text"
                                value=""
                            />
                        </label>
                    </div>
                    <Link to="#" className="btn btn-sm btn-outline btn-primary">
                        File Manager
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5">
                <div className="card flex flex-col items-center p-5 lg:py-10">
                    <div className="mb-3.5">
                        <div className="size-20 relative">
                            <img src="/images/folder-document.svg"
                                className="" alt="Folder Image" />
                            {/* <div className="flex size-2.5 bg-success rounded-full absolute bottom-0.5 start-16 transform -translate-y-1/2"></div> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                        <a href="#" className="hover:text-primary-active text-base leading-5 font-medium text-gray-900">
                            Accountings
                        </a>
                    </div>
                    <span className="text-gray-700 text-sm hover:text-primary-active">
                        7 Files
                    </span>
                </div>
                <div className="card flex flex-col items-center p-5 lg:py-10">
                    <div className="mb-3.5">
                        <div className="size-20 relative">
                            <img src="/images/folder-document.svg"
                                className="" alt="Folder Image" />
                            {/* <div className="flex size-2.5 bg-success rounded-full absolute bottom-0.5 start-16 transform -translate-y-1/2"></div> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                        <a href="#" className="hover:text-primary-active text-base leading-5 font-medium text-gray-900">
                            Taxes
                        </a>
                    </div>
                    <a href="#" className="text-gray-700 text-sm hover:text-primary-active">
                        3 Files
                    </a>
                </div>
                <div className="card flex flex-col items-center p-5 lg:py-10">
                    <div className="mb-3.5">
                        <div className="size-20 relative">
                            <img src="/images/folder-document.svg"
                                className="" alt="Folder Image" />
                            {/* <div className="flex size-2.5 bg-success rounded-full absolute bottom-0.5 start-16 transform -translate-y-1/2"></div> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                        <a href="#" className="hover:text-primary-active text-base leading-5 font-medium text-gray-900">
                            Payrolls
                        </a>
                    </div>
                    <a href="#" className="text-gray-700 text-sm hover:text-primary-active">
                        60 FIles
                    </a>
                </div>
            </div>            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5">
                <div className="card flex flex-col items-center p-5 lg:py-10">
                    <div className="mb-3.5">
                        <div className="size-20 relative">
                            <img src="/images/pdf.svg"
                                className="" alt="Folder Image" />
                            {/* <div className="flex size-2.5 bg-success rounded-full absolute bottom-0.5 start-16 transform -translate-y-1/2"></div> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                        <a href="#" className="hover:text-primary-active text-base leading-5 font-medium text-gray-900">
                            Contract
                        </a>
                    </div>
                    <span className="text-gray-700 text-sm hover:text-primary-active">
                        3 days ago
                    </span>
                </div>
            </div>
            <div className="flex grow justify-center pt-5 lg:pt-7.5">
                <a className="btn btn-link" href="/metronic/tailwind/react/demo1/account/home/user-profile">
                    Show more Users
                </a>
            </div>
        </div>
    )
}

export default UserDocuments