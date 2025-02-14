import { useCallback, useEffect, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { FaMessage } from "react-icons/fa6";
import { SiAbstract } from "react-icons/si";
import { FaEllipsisV } from "react-icons/fa";
import { Project } from "../../types/Project";
import { User } from "../../types/User";
import Loader from "../../components/Loader";

import { HiOutlineClock, HiOutlineRefresh, HiOutlineCheckCircle, HiOutlineArchive } from "react-icons/hi";
import MenuItem from "../../components/menu/MenuItem";
const statusIcons: Record<string, JSX.Element> = {
    1: <HiOutlineClock  className="size-7 text-yellow-500" />,
    2: <HiOutlineRefresh  className="size-7 text-blue-500 animate-spin" />,
    3: <HiOutlineCheckCircle  className="size-7 text-green-500" />,
    4: <HiOutlineArchive  className="size-7 text-gray-500" />,
};

const budgetUsageLabels: Record<number, string> = {
    0: 'Precise Usage',
    1: 'Normal Usage',
    2: 'Extreme Usage',
}

const Layout: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const { projectId } = useParams<{ projectId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [allMembers, setAllMembers] = useState<User[]>([]);

    const navigate = useNavigate();
    const [overviewProject, setOverviewProject] = useState<Project>({
        id: null,
        name: "Sample Project",
        description: "Loading project details...",
        address: "Bahnhofstrasse 1, 8001 Z rich, Switzerland",
        role: {
            name: "Software Engineer",
            id: '1',
            description: ''
        },
        birthday: "1990-01-01",
        id_passport: "1234567890",
        city: "Z rich",
        postal_code: "8001",
        ahv_number: "756.1234.5678.9012",
        documents: {
            "Identity Card": "https://example.com/identity-card.pdf",
            "Passport": "https://example.com/passport.pdf",
            "CV": "https://example.com/cv.pdf",
        },
    });

    const fetchProject = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/projects/${projectId}`);
            if (response.data.status.code == 200) {
                const projectData = response.data.data.project;
                setOverviewProject({...projectData}); 
            } else {
                console.error('Error fetching user data:', response.data.status.message);
                // navigate('/projects');
            }
        } catch (error: unknown) {
            console.error(error);
            // navigate('/projects');
        } finally {
            setLoading(false);
        }
    }, [projectId]);


    const fetchUsers = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/users');
            if(response.data.status.code === 200) {
                setAllMembers(response.data.data.users.data);
            }else{
                console.error('Error fetching users:', response.data.status.message);
                // navigate('/projects');
            };
        } catch (error) {
            console.error(error);
            // navigate('/projects');
        } finally {
            setLoading(false);
        }

    },[])
    
    const updateProject = (updatedProject: Project) => {
        setOverviewProject(updatedProject);
    };

    useEffect(() => {
        fetchProject();
        fetchUsers();
    }, []);

    // if (!overviewProject) {
    //     return <div>Loading...</div>;
    // }
    if (loading)  return <Loader isLoading={loading} />;
    if (!overviewProject) return <div className="text-center py-10">Project not found</div>;
    const {
        name,
        budget,
        budget_usage,
        description,
        status,
        logo_url,
        logo,
        tasks,
      } = overviewProject;
    return (
        <>
            <div className="bg-center bg-cover bg-no-repeat hero-bg bg-[url('/images/hero-bg.png')]">
                <div className="container-fixed">
                    <div className="flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10">
                        <div className="flex items-center justify-center rounded-full border-2 border-success-clarity size-[100px] shrink-0 bg-light">
                            {/* <img src="/metronic/tailwind/react/demo1/media/brand-logos/duolingo.svg" className="size-[50px]" alt="User Icon" /> */}
                            {logo_url ? 
                                <img src={logo_url} className="rounded-full border-3 border-success h-[100px] shrink-0" alt={`${name} Project Icon`} />
                            :
                                <Avatar name={name} size="100" round={true} />
                            }                           
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="text-lg leading-5 font-semibold text-gray-900">
                                {name}
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-600">{description}</div>
                        <div className="flex flex-wrap justify-center gap-1 lg:gap-4.5 text-sm">
                            <div className="flex gap-1.25 items-center text-gray-600">
                                <SiAbstract className="text-xl"/>

                                <span className="font-medium">Bugdet: {budget} ({budgetUsageLabels[budget_usage]})</span>
                            </div>
                            <div className="flex gap-1.25 items-center text-gray-600">
                            {statusIcons[status.id] || <HiOutlineClock  className="size-6 text-gray-400" />}  
                            <span className="font-medium">Status: {status.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fixed">
                <div className="flex items-center flex-wrap md:flex-nowrap lg:items-end justify-between border-b border-b-gray-200 dark:border-b-coal-100 gap-3 lg:gap-6 mb-5 lg:mb-10">
                    <div className="grid">
                        <div className="overflow-x-auto">
                            <div className="menu gap-3">
                                <MenuItem path={`/projects/${projectId}/overview`} label="Overview" />
                                <MenuItem path={`/projects/${projectId}/tasks`} label="Tasks" />
                                <MenuItem path={`/projects/${projectId}/budget`} label="Budget" />
                                <MenuItem path={`/projects/${projectId}/users`} label="Users" />
                                <MenuItem path={`/projects/${projectId}/files`} label="Files" />
                                <MenuItem path={`/projects/${projectId}/activity`} label="Activity" />
                                <MenuItem path={`/projects/${projectId}/settings`} label="Settings" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end grow lg:grow-0 lg:pb-4 gap-2.5 mb-3 lg:mb-0">
                        <button
                            type="button"
                            title="message"
                            className="btn btn-sm btn-icon btn-light">
                            <FaMessage />
                        </button>
                        <div className="menu items-stretch">
                            <div className="menu-item menu-item-dropdown">
                                <div className="menu-toggle btn btn-sm btn-icon btn-light">
                                    <FaEllipsisV />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fixed">
                <Outlet context={{ project: overviewProject, users: allMembers, updateProject }} />
            </div>
        </>
    )
}

export default Layout

