import { HiOutlineArrowRight, HiOutlineChevronRight, HiOutlineDocumentText, HiOutlineFolderOpen, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import InfoSection from "../../layouts/Info";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { SiAbstract } from "react-icons/si";
import { Link } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";

const subfolders = {
    users: ["copy_id", "contract", "payrolls"],
    projects: ["project_details", "tasks"],
    customers: ["Orders", "Invoices", "Support"],
};

const List = () => {
    const axiosInstance = useAxiosInstance();
    const fetchFiles = useCallback(async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get('/files', {
                params: { page, limit, search }
            });

            console.log(response.data.data);
            const { user_documents, project_documents, customer_documents, formattedSize, totalFiles } = response.data.data;
            setUsersData(user_documents);
            setProjectsData(project_documents);
            setCustomersData(customer_documents);
            setTotalStorage(formattedSize);
            setTotalItems(totalFiles);
        } catch (error) {
            console.error('Error fetching my files:', error);
        }
    }, [axiosInstance]);
    
    useEffect(() => {
        fetchFiles(1, 10, '');
    }, []);


    const [totalItems, setTotalItems] = useState(0);
    const [totalStorage, setTotalStorage] = useState(0);

    const [customersData, setCustomersData] = useState([]);
    const [projectsData, setProjectsData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    const [filesData, setFilesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<string|null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string|null>(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [empty, setEmpty] = useState(false);

    const [activeFolder, setActiveFolder] = useState<"users" | "projects" | "customers" | null>(null);
    const [subFolder, setSubFolder] = useState<string | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        fetchFiles(1, 10, event.target.value);
    };

    const handleFolderClick = (folder: "users" | "projects" | "customers") => {
        setActiveFolder(folder);
    };

    const handleUserClick = (userId: string, name: string) => {
        setSelectedUser(name);
        setSelectedUserId(userId);
    };

    const handleSubfolderClick = (subfolder: string) => {
        
        setSubFolder(subfolder);

        if (activeFolder === "users") {
            setFilesData(usersData.filter((data) => data.user_id === selectedUserId && data.category === subFolder));
        } else if (activeFolder === "projects") {
            setFilesData(projectsData.filter((data) => data.project_id === selectedProject && data.category === subFolder));
        } else if (activeFolder === "customers") {
            setFilesData(customersData.filter((data) => data.customer_id === selectedCustomer && data.category === subFolder));
        }
        console.log('Files:', filesData);
    };



    const isEmpty = useMemo(() => {
        if (activeFolder === "users") {
            return usersData.length === 0 || (selectedUserId && subFolder && usersData.filter((data) => data.user_id === selectedUserId && data.category === subFolder).length === 0);
        } else if (activeFolder === "projects") {
            return projectsData.length === 0 || (selectedProject && subFolder &&projectsData.filter((data) => data.project_id === selectedProject && data.category === subFolder).length === 0);
        } else if (activeFolder === "customers") {
            return customersData.length === 0 || (selectedCustomer && subFolder && customersData.filter((data) => data.customer_id === selectedCustomer && data.category === subFolder).length === 0);
        }
        return false;
    }, [activeFolder, usersData, projectsData, customersData, selectedUserId, selectedProject, selectedCustomer, subFolder]);

    useEffect(() => {
        console.log('filesData:', filesData);
    }, [subFolder]);

    return (
        <>
            <div className="container-fixed">
                <InfoSection
                    title="Files"
                    description="View all your files on the platform"
                    actions={[
                        {
                            type: 'link',
                            text: 'Upload file',
                            to: '/files/upload',
                            icon: <HiOutlineDocumentText />,
                            iconPosition: 'start'
                        },
                    ]}
                />
            </div>
            <div className="container-fixed">
                <div className="card card-flush py-5 bgi-position-y-center bgi-no-repeat mb-10" 
                    style={{
                        backgroundSize: 'auto 100%',
                        backgroundPositionX: '100%',
                        backgroundPositionY: 'center',
                        backgroundImage: 'url(/images/illustrations/4.svg)',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="card-body">
                        <div className="flex items-center me-7">
                            <div className="symbol symbol-circle mx-5">
                                <div className="symbol-label bg-transparent text-primary border border-secondary border-dashed">
                                    <HiOutlineFolderOpen className="size-7 text-primary" />
                                </div>
                            </div>

                            <div className="d-flex flex-column">
                                <h2 className="text-2-5xl mb-1">File Manager</h2>
                                <div className="text-muted fw-bold">
                                    <a href="#">Home</a>
                                    <span className="mx-3">|</span>
                                    <a href="#">File Manager</a>
                                    <span className="mx-3">|</span>
                                    {totalStorage}
                                    <span className="mx-3">|</span>
                                    {totalItems} items
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-flush">
                    <div className="card-header pt-8">
                        <div className="card-title">
                            <div className="relative">
                                <HiOutlineMagnifyingGlass className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3" />
                                <input 
                                    onChange={handleSearchChange}
                                    value={searchQuery}
                                    className="input input-sm ps-8!"
                                    placeholder="Search Files &amp; Folders"
                                    type="text" 
                                />
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="d-flex justify-content-end align-items-center d-none" data-kt-filemanager-table-toolbar="selected">
                                <div className="fw-bold me-5">
                                    <span className="me-2">3</span>
                                    Files
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="flex flex-stack justify-between">
                            <div className="badge badge-lg badge-light-primary">
                                <div className="flex items-center flex-wrap space-x-1">
                                    <SiAbstract className="text-primary" size={24} onClick={() => setActiveFolder(null)} />
                                        <a href="#" className="text-primary" onClick={(e) => {e.preventDefault(); setActiveFolder(null);setSelectedUser(null); setSelectedProject(null); setSelectedCustomer(null);setSubFolder(null);}} >Casa Group</a>

                                    {activeFolder && (
                                        <>
                                            <HiOutlineChevronRight  className="text-primary" size={24}/>
                                            <a href="#" className="text-primary" onClick={(e) => {e.preventDefault(); setSelectedUser(null); setSelectedProject(null); setSelectedCustomer(null); setSubFolder(null);}} >{activeFolder}</a>
                                        </>
                                    )}

                                    {selectedUser && (
                                        <>
                                            <HiOutlineChevronRight  className="text-primary" size={24}/>
                                            <a href="#" className="text-primary" onClick={(e) => {e.preventDefault();setFilesData([]);setSubFolder(null);}}>{selectedUser}</a>
                                        </>
                                    )}

                                    {selectedProject && (
                                        <>
                                            <HiOutlineChevronRight  className="text-primary" size={24}/>
                                            <a href="#" className="text-primary" onClick={(e) => {e.preventDefault();setFilesData([]);setSubFolder(null);}}>{selectedProject.title}</a>
                                        </>
                                    )}

                                    {selectedCustomer && (
                                        <>
                                            <HiOutlineChevronRight  className="text-primary" size={24}/>
                                            <a href="#" onClick={(e) => {e.preventDefault();setFilesData([]);setSubFolder(null);}}>{selectedCustomer.first_name} {selectedCustomer.last_name}</a>
                                        </>
                                    )}
                                    {subFolder &&(
                                        <>
                                            <HiOutlineChevronRight  className="text-primary" size={24}/>
                                            <a href="#" onClick={(e) => {e.preventDefault()}}>{subFolder === 'copy_id' ? 'identification' : subFolder === 'project_details' ? 'project details' : subFolder}</a>
                                        </>
                                    )}

                                </div>
                            </div>
                            <div className="badge badge-lg badge-primary">
                                <span id="kt_file_manager_items_counter">82 items</span>
                            </div>
                        </div>
                        <div id="kt_file_manager_list_wrapper" 
                            className="dt-container dt-bootstrap5 dt-empty-footer">
                            <div id="" className="table-responsive">
                                <div className="dt-scroll">
                                    <div className="dt-scroll-head overflow-hidden relative border-0 w-full">
                                        <div className="dt-scroll-headInner box-content pr-2">
                                            <table data-kt-filemanager-table="folders" 
                                                className="table align-middle table-row-dashed fs-6 gy-5 dataTable ml-0">
                                                <thead>
                                                    <tr className=" text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                                        <th className="max-w-[350px] dt-orderable-none">
                                                            Name
                                                        </th>
                                                        <th className="dt-orderable-none">
                                                            Size
                                                        </th>
                                                        <th className="dt-orderable-none">
                                                            Last Modified
                                                        </th>
                                                        <th className="dt-orderable-none">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {activeFolder === null && (
                                                        <>
                                                            {/* Initial Folder Categories */}
                                                            <tr onClick={() => handleFolderClick("users")} className="cursor-pointer">
                                                                <td>
                                                                    <div className="flex items-center hover:text-primary">
                                                                        <HiOutlineFolderOpen className="me-2" size={24} />
                                                                        Users
                                                                    </div>
                                                                </td>
                                                                <td>—</td>
                                                                <td>—</td>
                                                                <td>—</td>
                                                            </tr>
                                                            <tr onClick={() => handleFolderClick("projects")} className="cursor-pointer">
                                                                <td>
                                                                    <div className="flex items-center hover:text-primary">
                                                                        <HiOutlineFolderOpen className="me-2" size={24} />
                                                                        Projects
                                                                    </div>
                                                                </td>
                                                                <td>—</td>
                                                                <td>—</td>
                                                                <td>—</td>
                                                            </tr>
                                                            <tr onClick={() => handleFolderClick("customers")} className="cursor-pointer">
                                                                <td>
                                                                    <div className="flex items-center hover:text-primary">
                                                                        <HiOutlineFolderOpen className="me-2" size={24} />
                                                                        Customers
                                                                    </div>
                                                                </td>
                                                                <td>—</td>
                                                                <td>—</td>
                                                                <td>—</td>
                                                            </tr>
                                                        </>
                                                    )}

                                                    {/* Show Data for Active Folder */}
                                                    {activeFolder === "users" &&  !selectedUser && usersData.length > 0 && usersData.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="flex items-center hover:text-primary">
                                                                    <HiOutlineFolderOpen className="me-2" size={24} />
                                                                    <span onClick={() => handleUserClick(data.user_id, data.user_name.replace('-', ' '))} className="fw-bold cursor-pointer">{data.user_name.replace('-', ' ')}</span>
                                                                </div>
                                                            </td>
                                                            <td>{data.formattedSize}</td>
                                                            <td>{data.modified}</td>
                                                            <td>
                                                                <Link to={`/users/${data.user_id}/profile`} className="btn btn-icon btn-light btn-sm me-2"
                                                                    title="View"
                                                                    type="button">
                                                                    <HiOutlineArrowRight />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    {activeFolder === "projects" && !selectedProject && projectsData.length > 0 && projectsData.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="flex items-center hover:text-primary">
                                                                    <HiOutlineFolderOpen className="me-2" size={24} />
                                                                    <Link to={`/projects/${data.project_id}`} className="fw-bold">Project {data.project_id}</Link>
                                                                </div>
                                                            </td>
                                                            <td>{data.formattedSize}</td>
                                                            <td>{data.modified}</td>
                                                            <td>
                                                                <button className="btn btn-icon btn-light btn-sm me-2"
                                                                    title="View"
                                                                    type="button">
                                                                    <HiOutlineArrowRight />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    
                                                    {activeFolder === "customers" && !selectedCustomer && customersData.length > 0 && customersData.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="flex items-center hover:text-primary">
                                                                    <HiOutlineFolderOpen className="me-2" size={24} />
                                                                    <Link to={`/customers/${data.customer_id}`} className="fw-bold">Customer {data.customer_id}</Link>
                                                                </div>
                                                            </td>
                                                            <td>{data.formattedSize}</td>
                                                            <td>{data.modified}</td>
                                                            <td>
                                                                <button className="btn btn-icon btn-light btn-sm me-2"
                                                                    title="View"
                                                                    type="button">
                                                                    <HiOutlineArrowRight />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}



                                                    {activeFolder && (selectedUser || selectedProject || selectedCustomer) && subfolders[activeFolder].map((subfolder, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <a href="#" onClick={(e) => {e.preventDefault(); handleSubfolderClick(subfolder) }} className="flex items-center hover:text-primary cursor-pointer">
                                                                    <HiOutlineFolderOpen className="me-2" size={24} />
                                                                    {subfolder === 'copy_id' ? 'identification' : subfolder === 'project_details' ? 'project details' : subfolder}
                                                                </a>
                                                            </td>
                                                            <td>—</td>
                                                            <td>—</td>
                                                            <td>—</td>
                                                        </tr>
                                                    ))}

                                                    {/* Show Files for Selected User */}
                                                    {activeFolder === "users" && selectedUser && subFolder && filesData.length > 0 && filesData.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="flex items-center hover:text-primary">
                                                                    <HiOutlineDocumentText className="me-2" size={24} />
                                                                    {data.file_name}
                                                                </div>
                                                            </td>
                                                            <td>{data.formattedSize}</td>
                                                            <td>{data.modified}</td>
                                                            <td>
                                                                <button className="btn btn-icon btn-light btn-sm me-2"
                                                                    title="View"
                                                                    type="button">
                                                                    <HiOutlineDownload />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    
                                                    {/* Empty state */}
                                                    { isEmpty? (
                                                        <tr>
                                                            <td colSpan={4} className="dt-empty">
                                                                <div className="flex flex-col justify-center items-center my-8">
                                                                    <img title="No files found" src="/images/illustrations/11.svg" className="max-w-[350px]" />
                                                                    <div className="text-4xl font-extrabold text-dark mb-4">No items found.</div>
                                                                    <div className="text-base">Start creating new folders or uploading a new file!</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : null}

                                                </tbody>
                                            </table>
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
export default List