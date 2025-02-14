import { Link, useOutletContext } from "react-router-dom";
import { User } from "../../types/User";
import {  HiOutlineEllipsisVertical } from "react-icons/hi2";
import { Project } from "../../types/Project";

const UserProjects: React.FC = () => {
    const user = useOutletContext<User>()
    if ( !user.projects || user.projects.length === 0) return (
        <div className="card p-8 lg:p-12 border-none !shadow-none">
            <div className="card-body">
                <div className="grid justify-center py-5">
                    <img src="/images/illustrations/11.svg"
                        className="dark:hidden max-h-[170px]" alt="" />
                    {/* <img src="/metronic/tailwind/react/demo1/media/illustrations/11-dark.svg"
                        className="light:hidden max-h-[170px]" alt="" /> */}
                </div>
                <div className="text-lg font-medium text-gray-900 text-center">
                    No Projects Yet
                </div>
                <div className="text-sm text-gray-700 text-center gap-1">
                    Begin your journey by creating or joining a project.&nbsp;
                    <Link to="/projects" className="text-primary font-medium hover:text-primary-active">
                        Get Started!
                    </Link>
                </div>
            </div>
        </div>
    )
    return (
        <div className="container-fixed">
            <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
                <div className="flex flex-wrap items-center gap-5 justify-between">
                    <h3 className="text-lg text-gray-900 font-semibold">
                        {user.projects.length} projects
                    </h3>
                </div>
                <div id="projects_list">
                    <div className="flex flex-col gap-5 lg:gap-7.5">
                        {user.projects.map((project:Project) => (                           
                            <div className="card p-7">
                                <div className="flex items-center flex-wrap justify-between gap-5">
                                    
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex items-center justify-center size-14 shrink-0 rounded-lg bg-gray-100">
                                            {project.logo_url ? (
                                                <img src={project.logo_url} className="min-w-12 shrink-0" alt="Logo" />
                                            ): (
                                                <img src="/images/logo-cH-small.svg" className="size-[40px] shrink-0" alt="" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <a href="#" className="text-lg text-gray-900 hover:text-primary-active mb-px">
                                                {project.name}
                                            </a>
                                            <div className="text-sm text-gray-700">
                                                {project.description.split(' ').slice(0, 5).join(' ')} {project.description.split(' ').length >5 ? '...': ''}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 lg:gap-20">
                                        <div className="flex items-center gap-5 lg:gap-14">
                                            { project.status.name.toLowerCase() === 'archived' ? (
                                                <span className="badge badge-light badge-outline">
                                                    Active
                                                </span>
                                            ) : project.status.name.toLowerCase() === 'pending' ? (
                                                <span className="badge badge-warning badge-outline">
                                                    Pending
                                                </span>
                                            ) : project.status.name.toLowerCase() === 'completed' ? (
                                                <span className="badge badge-success badge-outline">
                                                    Completed
                                                </span>
                                            ) : (
                                                <span className="badge badge-danger badge-outline">
                                                    Archived
                                                </span>
                                            )}
                                            
                                            <div className="progress h-1.5 !w-36 progress-primary">
                                                <div className="progress-bar" style={{width: "50%"}}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5 lg:gap-14">
                                            <div className="flex justify-end w-24">
                                                <div className="flex -space-x-2">
                                                    
                                                    { project.members && project.members.slice(0, 3).map((user:User) => (                                                        
                                                        <div className="flex" key={user.id}>
                                                            {user.logo_url ? (
                                                                <img src={user.logo_url} alt="logo"
                                                                    className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                                                />
                                                            ):(
                                                                <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                                                                    {user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}
                                                                </span>
                                                            )}

                                                        </div>
                                                    ))}
                                                    { project.members && project.members.length > 3 && (
                                                        <div className="flex">
                                                            <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse ring-success-light bg-success">
                                                                +{project.members.length - 3}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="menu items-stretch">
                                                <div className="menu-item menu-item-dropdown">
                                                    <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                        <HiOutlineEllipsisVertical />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
