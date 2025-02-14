import { Link } from "react-router-dom";
import { User } from "../../types/User";
import { HiOutlineEye, HiPencil, HiTrash } from "react-icons/hi2";

interface ProjectRowProps {
    name: string;
    id: number;
    progress: number;
    members?: User[];
    dueDate: string;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ id, name, progress, members, dueDate }) => (
    <tr className="border-b">
        <td className="text-start">
            <Link className="text-sm font-medium text-gray-900 hover:text-primary"
            to={`/projects/${id}/overview`}>
                {name}
            </Link>
        </td>
        <td>
            <div className="progress progress-primary">
                <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
        </td>
        <td>
            <div className="flex justify-end rtl:justify-start shrink-0">
                <div className="flex -space-x-2">
                    {members && members.length > 0 ? (
                        members.slice(0, 3).map((member, i) => (
                            <div className="flex">
                                <img
                                    key={i}
                                    src={member.logo_url || "/images/avatars/blank.png"}
                                    alt={member.full_name}
                                    className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6"
                                />
                            </div>
                        ))
                    ) : (
                        <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs undefined size-6 text-success-inverse ring-success-light bg-secondary">0</span>
                    )}
                    {members && members.length > 3 && (
                        <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs undefined size-6 text-success-inverse ring-success-light bg-success">

                            {`+${members.length - 3}`}
                        </span>
                    )}
                </div>
            </div> 
        </td>
        <td className="text-sm font-medium text-gray-700">{dueDate}</td>
        <td>
            <Link className="btn btn-sm btn-icon btn-light btn-clear"
            to={`/projects/${id}/overview`}>
                <HiOutlineEye className="size-5" />
            </Link>
        </td>
    </tr>
);

export default ProjectRow;