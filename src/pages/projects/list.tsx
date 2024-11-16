import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import HomeLayout from '../../layouts/PrivateLayout';
import { Switch } from '@headlessui/react';
import AddMemberModal from '../../components/modals/AddMemberModal';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import InfoSection from '../../layouts/Info';



interface Member {
    id: string;
    email: string;
}
interface Task {
    id: string;
    name: string;
    description: string;
    assignedTo: string;
    status: string;
    priority: string;
    dueDate: string;
    createdDate: string;
    updatedDate: string;
}
interface Project {
    id: string;
    name: string;
    owner: string;
    members: Member[];
    description: string;
    tasks: Task[];
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    createdDate: string;
    updatedDate: string;
}
const ProjectListing: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState<boolean>(false);
    const [currentProjectMembers, setCurrentProjectMembers] = useState<Member[]>([]);
    const [tempTitle, setTempTitle] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingMemberProjectId, setEditingMemberProjectId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page (limit)
    const [totalPages, setTotalPages] = useState<number>(1);


    const fetchProjects = useCallback(async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get('/projects', {
                params: { page, limit, search }
            });
            setProjects(response.data.data.projects);
            setFilteredProjects(response.data.data.projects);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }, [axiosInstance]);


    useEffect(() => {
        fetchProjects(currentPage, itemsPerPage, searchQuery);
    }, [currentPage, itemsPerPage, searchQuery]);

    const togglePrivacy = async (projectId: string, currentPrivacy: boolean) => {
        try {
            const response = await axiosInstance.put(`/projects/${projectId}`, { isPrivate: !currentPrivacy });
            if (response && response.data.status === 200) {
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === projectId ? { ...project, isPrivate: !currentPrivacy } : project
                    )
                );
            }
        } catch (error) {
            console.error('Error updating project privacy:', error);
        }
    };

    const getInitials = (name: string) => {
        const words = name.split(' ');
        let initials = '';
        for (let i = 0; i < words.length; i++) {
            initials += words[i][0];
        }
        return initials.toUpperCase();
    }
    const handleAddMemberClick = (projectId: string) => {
        setEditingMemberProjectId(projectId);
        setCurrentProjectMembers(projects.find(project => project._id === projectId)?.members || []);
        setIsAddMemberModalOpen(true);
    };


    const handleTitleClick = (projectId: string, currentTitle: string) => {
        setEditingProjectId(projectId); // Set the project ID in editing mode
        setTempTitle(currentTitle); // Store the current title temporarily
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempTitle(event.target.value); // Update temporary title as user types
    };

    const handleTitleBlur = async (projectId: string) => {
        await saveProjectTitle(projectId);
    };

    const handleTitleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>, projectId: string) => {
        if (event.key === 'Enter') {
            await saveProjectTitle(projectId);
        }
    };

    const saveProjectTitle = async (projectId: string) => {
        try {
            await axiosInstance.put(`/projects/${projectId}`, { name: tempTitle });
            // Update local project title after saving
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project._id === projectId ? { ...project, name: tempTitle } : project
                )
            );
            setEditingProjectId(null); // Exit editing mode after saving
        } catch (error) {
            console.error('Error saving project title:', error);
        }
    };

    const handleRemoveMember = async (memberId: string, projectId: string) => {
        try {
            const projectToUpdate = projects.find(project => project._id === projectId);
            if (!projectToUpdate) return;

            const updatedMembers = projectToUpdate.members.filter(member => member._id !== memberId);
            const response = await axiosInstance.put(`/projects/${projectId}`, { members: updatedMembers });
            if (response && response.data.status === 200) {
                // Update the local state with the new list of members
                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project._id === projectId ? { ...project, members: updatedMembers } : project
                    )
                );
            }
        } catch (error) {
            console.error('Error removing member from project:', error);
        }
    }

    const handleAddMembers = async (selectedUsers: Member[]) => {
        if (!editingMemberProjectId) return;
        try {
            const memberIds = selectedUsers.map(user => user._id);
            console.log(memberIds);

            const response = await axiosInstance.put(`/projects/${editingMemberProjectId}`, { members: memberIds });
            console.log(response);
            if (response && response.data.status === 200) {
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === editingMemberProjectId ? { ...project, members: selectedUsers } : project
                    )
                );
            }
        } catch (error) {
            console.error('Error adding members to project:', error);
        } finally {
            setEditingMemberProjectId(null);
        }
    }
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchProjects(page, itemsPerPage, searchQuery);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchProjects(currentPage, itemsPerPage, query);
    };

    return (
        <>
            <div className="container-fixed">
                <div>
                    {/* <div className="flex items-center justify-between">
                        <h1 className="mb-4 text-2xl font-bold">Projects</h1>
                        <Link to="/projects/create" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Create New Project</Link>
                    </div> */}

                    <InfoSection
                        title="Projects"
                        description="View, create, edit, and delete your projects. Click on a project name to edit its title."
                        linkTo='/projects/create'
                        linkText="Add new project"
                    />
                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="container-fixed">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="card p-7.5">
                        <div className="flex items-center justify-between mb-3 lg:mb-6">
                            <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                                <img alt="" className="" src="images/brand-logos/plurk.svg"/>
                            </div>
                            <span className="badge badge-primary badge-outline">
                                In Progress
                            </span>
                        </div>
                        <div className="flex flex-col mb-3 lg:mb-6">
                            <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                                Phoenix SaaS
                            </a>
                            <span className="text-sm font-medium text-gray-600">
                                Real-time photo sharing app
                            </span>
                        </div>
                        <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                            <span className="text-sm font-medium text-gray-500">
                                Start:
                                <span className="text-sm font-semibold text-gray-700">
                                Mar 06
                                </span>
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                                End:
                                <span className="text-sm font-semibold text-gray-700">
                                Dec 21
                                </span>
                            </span>
                        </div>
                        <div className="progress h-1.5 progress-primary mb-4 lg:mb-8">
                            <div className="progress-bar" style={{width: '55%'}}></div>
                        </div>
                        <div className="flex -space-x-2">
                            <div className="flex">
                                <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                    src="images/avatars/300-4.png"
                                    alt="Images"
                                />
                            </div>
                            <div className="flex">
                                <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                    src="images/avatars/300-2.png"
                                    alt="Images"
                                />
                            </div>
                            <div className="flex">
                                <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                                S
                                </span>
                            </div>
                        </div>
                    </div>

                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/telegram.svg"/>
                </div>
                <span className="badge badge-success badge-outline">
                    Completed
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    Radiant Wave
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Short-term accommodation marketplace
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 09
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 23
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-success mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '100%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                        src="images/avatars/300-24.png"
                    />
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                        src="images/avatars/300-7.png"
                    />
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/kickstarter.svg"/>
                </div>
                <span className="badge badge-outline">
                    Upcoming
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    Dreamweaver
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Social media photo sharing
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 05
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 12
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-gray-300 mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '100%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-21.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-1.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-2.png"/>
                </div>
                <div className="flex">
                    <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse ring-success-light bg-success">
                    +10
                    </span>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/quickbooks.svg"/>
                </div>
                <span className="badge badge-primary badge-outline">
                    In Progress
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    Horizon Quest
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Team communication and collaboration
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 03
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 11
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-primary mb-4 lg:mb-8">
                <div className="progress-bar" style={{ width : '19%' }}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-1.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-2.png"/>
                </div>
                <div className="flex">
                    <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-danger-inverse ring-danger-light bg-danger">
                    M
                    </span>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/google-analytics.svg"/>
                </div>
                <span className="badge badge-outline">
                    Upcoming
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    Golden Gate Analytics
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Note-taking and organization app
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 22
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 14
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-gray-300 mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '100%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-5.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-17.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-16.png"/>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                    <div className="flex items-center justify-between mb-3 lg:mb-6">
                        <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                            <img alt="" className="" src="images/brand-logos/google-webdev.svg"/>
                        </div>
                        <span className="badge badge-success badge-outline">
                            Completed
                        </span>
                    </div>
                    <div className="flex flex-col mb-3 lg:mb-6">
                        <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                            Celestial SaaS
                        </a>
                        <span className="text-sm font-medium text-gray-600">
                            CRM App application to HR efficienty
                        </span>
                    </div>
                    <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                        <span className="text-sm font-medium text-gray-500">
                            Start:
                            <span className="text-sm font-semibold text-gray-700">
                            Mar 14
                            </span>
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                            End:
                            <span className="text-sm font-semibold text-gray-700">
                            Dec 25
                            </span>
                        </span>
                    </div>
                    <div className="progress h-1.5 progress-success mb-4 lg:mb-8">
                        <div className="progress-bar" style={{width: '100%'}}>
                        </div>
                    </div>
                    <div className="flex -space-x-2">
                        <div className="flex">
                            <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-6.png"/>
                        </div>
                        <div className="flex">
                            <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-23.png"/>
                        </div>
                        <div className="flex">
                            <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-12.png"/>
                        </div>
                        <div className="flex">
                            <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                            +10
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card p-7.5">
                    <div className="flex items-center justify-between mb-3 lg:mb-6">
                        <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                            <img alt="" className="" src="images/brand-logos/figma.svg"/>
                        </div>
                        <span className="badge badge-outline">
                            Upcoming
                        </span>
                    </div>
                    <div className="flex flex-col mb-3 lg:mb-6">
                        <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                            Nexus Design System
                        </a>
                        <span className="text-sm font-medium text-gray-600">
                            Online discussion and forum platform
                        </span>
                    </div>
                    <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                        <span className="text-sm font-medium text-gray-500">
                            Start:
                            <span className="text-sm font-semibold text-gray-700">
                            Mar 17
                            </span>
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                            End:
                            <span className="text-sm font-semibold text-gray-700">
                            Dec 08
                            </span>
                        </span>
                    </div>
                    <div className="progress h-1.5 progress-gray-300 mb-4 lg:mb-8">
                        <div className="progress-bar" style={{width: '100%'}}></div>
                    </div>
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
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/btcchina.svg"/>
                </div>
                <span className="badge badge-primary badge-outline">
                    In Progress
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    Neptune App
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Team messaging and collaboration
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 09
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 23
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-primary mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '35%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-21.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-32.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-2.png"/>
                </div>
                <div className="flex">
                    <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse ring-success-light bg-success">
                    +1
                    </span>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/patientory.svg"/>
                </div>
                <span className="badge badge-outline">
                    Upcoming
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    SparkleTech
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Meditation and relaxation app
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 14
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 21
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-gray-300 mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '100%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-4.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-2.png"/>
                </div>
                <div className="flex">
                    <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse ring-success-light bg-success">
                    K
                    </span>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/jira.svg"/>
                </div>
                <span className="badge badge-success badge-outline">
                    Completed
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    EmberX CRM
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Commission-free stock trading
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 01
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 13
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-success mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '100%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-12.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-20.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-3.png"/>
                </div>
                <div className="flex">
                    <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-success-inverse ring-success-light bg-success">
                    +5
                    </span>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/plastic-scm.svg"/>
                </div>
                <span className="badge badge-outline">
                    Upcoming
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    LunaLink
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Meditation and relaxation app
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 14
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 21
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-gray-300 mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '100%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-16.png"/>
                </div>
                </div>
                </div>
                <div className="card p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div className="flex items-center justify-center size-[50px] rounded-lg bg-gray-100">
                    <img alt="" className="" src="images/brand-logos/perrier.svg"/>
                </div>
                <span className="badge badge-primary badge-outline">
                    In Progress
                </span>
                </div>
                <div className="flex flex-col mb-3 lg:mb-6">
                <a className="text-lg font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                    TerraCrest App
                </a>
                <span className="text-sm font-medium text-gray-600">
                    Video conferencing software
                </span>
                </div>
                <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
                <span className="text-sm font-medium text-gray-500">
                    Start:
                    <span className="text-sm font-semibold text-gray-700">
                    Mar 22
                    </span>
                </span>
                <span className="text-sm font-medium text-gray-500">
                    End:
                    <span className="text-sm font-semibold text-gray-700">
                    Dec 28
                    </span>
                </span>
                </div>
                <div className="progress h-1.5 progress-primary mb-4 lg:mb-8">
                <div className="progress-bar" style={{width: '55%'}}>
                </div>
                </div>
                <div className="flex -space-x-2">
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-4.png"/>
                </div>
                <div className="flex">
                    <img className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]" src="images/avatars/300-9.png"/>
                </div>
                <div className="flex">
                    <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                    F
                    </span>
                </div>
                </div>
                </div>
                </div>
                <div className="flex grow justify-center pt-5 lg:pt-7.5">
                    <a className="btn btn-link" href="#">
                        Show more projects
                    </a>
                </div>
            </div>
                        {/* Pagination Controls */}
                        {/* <div className="flex items-center justify-between mt-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div> */}


            {/* {!projects.length && (
                <div className="container-fixed">
                    <div className="card p-8 lg:p-12">
                        <div className="card-body">
                            <div className="grid justify-center py-5">
                                <img src="/images/illustrations/11.svg"
                                    className="max-h-[170px]" alt=""
                                />
                            </div>
                            <div className="text-lg font-medium text-gray-900 text-center">
                                Upload Item to Get Started
                            </div>
                            <div className="text-sm text-gray-700 text-center gap-1">
                                Begin by crafting your inaugural list in minutes.&nbsp;
                            <a className="text-sm font-medium link"
                                href="/metronic/tailwind/react/demo1/account/billing/plans">
                                    Get Started!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default ProjectListing;
