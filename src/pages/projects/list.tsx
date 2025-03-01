import React, { useCallback, useEffect, useState } from 'react';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import InfoSection from '../../layouts/Info';
import { Project } from '../../types/Project';
import ProjectCard from './components/ProjectCard';
import { HiOutlinePlus } from 'react-icons/hi2';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

const ProjectListing: React.FC = () => {
    const axiosInstance = useAxiosInstance();

    const [loading, setLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page (limit)
    const [totalProjects, setTotalProjects] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [statuses, setStatuses] = useState<{ value: number | null; label: string }[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
    
    const [availableMembers, setAvailableMembers] = useState<User[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState<boolean>(false);
    const [currentProjectMembers, setCurrentProjectMembers] = useState<User[]>([]);
    const [tempTitle, setTempTitle] = useState<string>('');
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingMemberProjectId, setEditingMemberProjectId] = useState<string | null>(null);



    const fetchProjects = useCallback(async (page: number = 1, status ?: null | number) => {
        if (page === currentPage && status === selectedStatus && projects.length > 0) return;
        setLoading(true);
        try {
            const params: Record<string, string | number | null> = { page };
            if (status) {
                params.status = status;
            }
            const response = await axiosInstance.get('/projects', { params });
            setProjects((prevProjects) =>
                page === 1 ? [... response.data.data.projects.data] : [...prevProjects, ...response.data.data.projects.data]);
            
            setTotalProjects(response.data.data.totalProjects);
            setItemsPerPage(response.data.data.perPage);
            setHasMore(response.data.data.projects.length === itemsPerPage);
            setTotalPages(response.data.data.totalPages);
            
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    }, [axiosInstance]);


    const fetchStatuses = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/projects/statuses');
            if (response.data.status.code === 200) {
                const statusOptions = response.data.data.project_statuses.map((status: { id: number; name: string }) => ({ value: status.id, label: status.name }));
                statusOptions.unshift({ value: null, label: 'All Projects' });
                setStatuses(statusOptions);
            } else {
                console.error('Error fetching statuses:', response.data.status.message);
            }
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    }, [axiosInstance]);

    useEffect(() => {
        fetchProjects(1, selectedStatus);
        fetchStatuses();
    }, []);

    const fetchAvailableMembers = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/users');
            if (response.data.data.status.code === 200) {
                return response.data.data.users;
                setAvailableMembers(response.data.data.users);
            } else {
                console.error('Error fetching available members:', response.data.status.message);
            }
        } catch (error) {
            console.error('Error fetching available members:', error);
        }
    }, [axiosInstance]);


    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    
    const handleRemoveMember = async (projectId: string, memberId: string) => {
        try {
            const response = await axiosInstance.delete(`/projects/${projectId}/members/${memberId}`);
            if (response.data.status === 200) {
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        Number(projectId) === project.id
                            ? { ...project, members: project.members.filter((member) => member._id !== memberId) }
                            : project
                    )
                );
            }
        } catch (error) {
            console.error('Error removing member from project:', error);
        }
    };

    const handleAddMembers = (projectId: string, selectedUsers: string[]) => {
        fetchAvailableMembers();
        setIsAddMemberModalOpen(true);
        setEditingProjectId(projectId);
        setCurrentProjectMembers(
            projects
                .map((project) => project.members)
                .flat()
                .filter((member) => selectedUsers.includes(member.id))
        );
    };

    const submitAddedMembers = async (projectId: string, selectedUsers: User[]) => {
        try {
            const memberIds = selectedUsers.map((user) => user.id);
            const response = await axiosInstance.put(`/projects/${projectId}/members`, { members: memberIds });
            if (response.data.data.status.code === 200) {
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        Number(projectId) === project.id ? { ...project, members: selectedUsers } : project
                    )
                );
            }
            setCurrentProjectMembers([]);
            setIsAddMemberModalOpen(false);
        } catch (error) {
            console.error('Error adding members to project:', error);
        }
    };
    

    const handleFilterButtonClick = ( selectedStatus: number | null) => {
        setSelectedStatus(selectedStatus)
        fetchProjects(1, selectedStatus);
    }


    return (
        <>
            <div className="container-fixed">
                <div>
                    {/* <div className="flex items-center justify-between">
                        <h1 className="mb-4 text-2xl font-bold">Projects</h1>
                        <Link to="/projects/create" className="px-4 py-2 text-white bg-blue-500 rounded-sm hover:bg-blue-700">Create New Project</Link>
                    </div> */}

                    <InfoSection
                        title="Projects"
                        description="View, create, edit, and delete your projects. Click on a project name to edit its title."
                        actions={[
                            {
                                type: 'link',
                                text: 'Add new project',
                                to: '/projects/create',
                                icon: <HiOutlinePlus />,
                                iconPosition: 'start'
                            },
                        ]}
                        showFilterButton={true}
                        filterButtonTitle="Filter Projects"
                        onFilterButtonClick={(selectedStatus ?: number | null) => handleFilterButtonClick(selectedStatus)}
                        statuses={statuses}
                    />
                    
                </div>
            </div>
            <div className="container-fixed">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="spinner-border text-primary-active" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : projects.length > 0  && projects.map((project) => (
                        <ProjectCard 
                            key={project.id}
                            project={project}
                            onAddMembers={(projectId, memberIds) => handleAddMembers(projectId, memberIds)}
                            onRemoveMember={(memberId, projectId) => handleRemoveMember(projectId, memberId)}
                        />
                    ))}
                </div>

                <Loader isLoading={loading} />
                {!loading && projects.length === 0 && (
                    <div className="flex flex-col items-center gap-5 lg:gap-7.5 p-8 lg:p-12">
                        <img src="/images/illustrations/11.svg"
                            className="dark:hidden max-h-[170px] w-full" alt="" />
                        {/* <img src="/metronic/tailwind/react/demo1/media/illustrations/11-dark.svg"
                            className="light:hidden max-h-[170px] w-full" alt="" /> */}
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
                )}

                { hasMore && !loading && (
                    <div className="flex grow justify-center pt-5 lg:pt-7.5">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            className="btn btn-link"
                            disabled={loading}
                        >
                            'Show more projects'
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectListing;
