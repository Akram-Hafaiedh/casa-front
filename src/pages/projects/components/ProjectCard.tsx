import moment from "moment";
import { Project } from "../../../types/Project"
import { getInitials } from "../../../helpers/format";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    project : Project
    onAddMembers: (projectId: string, memberIds: string[]) => void;
    onRemoveMember: (projectId: string, memberIds: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEditTitle, onAddMember, onRemoveMember}) => {
    return (
        <div className="card p-7.5">
            <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    {project.logo_url ? (
                        <img src={project.logo_url} alt={`${project.name} logo`} className="size-[40px]" />
                    ) : (
                        <img src="/images/logo-cH-small.svg" alt="Default logo" className="size-[40px]" />
                    )}
                </div>
                
                <span className={`badge badge-${project.status.id === 1 ? 'primary' : project.status.id === 2 ? 'warning' : project.status.id === 3 ? 'success' : 'danger'} badge-outline`}>
                    {project.status.name}
                </span>
            </div>
            <div className="flex flex-col mb-3 lg:mb-6">
                <Link to={`/projects/${project.id}/overview`} className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px">
                    {project.name}
                </Link>
                <span className="text-sm font-medium text-gray-600">
                    {`${project.description.split(' ').slice(0, 40).join(' ')}${project.description.split(' ').length > 40 ? '...' : ''}`}
                </span>
            </div>
            <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Due: <span className="ml-2 text-sm font-semibold text-gray-700">{moment(project.due_date).format('D MMMM YYYY')}</span>
                </span>
            </div>
            <div className="progress h-1.5 progress-primary mb-4 lg:mb-8">
                <div className="progress-bar" style={{ width: '55%' }}></div>
            </div>
            {project.members && project.members.length > 0 && (
                <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((user, index) => (
                        <div key={index} className="flex">
                            {user.logo_url ? (
                                <img
                                    src={user.logo_url}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                />
                            ) : (
                                <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                                    {getInitials(`${user.first_name} ${user.last_name}`)}
                                </span>
                            )}
                        </div>
                    ))}
                    {project.members.length > 3 && (
                        <div className="flex" onClick={() => onAddMembers(project.id, project.members.map((member) => member.id))}>
                            <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse ring-success-light bg-success">
                                +{project.members.length - 3}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default ProjectCard