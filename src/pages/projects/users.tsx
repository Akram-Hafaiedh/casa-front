import { HiMagnifyingGlass, HiOutlineTrash } from "react-icons/hi2"
import { Link, useOutletContext } from "react-router-dom";
import { Project } from "../../types/Project";
import { User } from "../../types/User";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import Avatar from "react-avatar";

const ProjectUsers: React.FC = () => {
    const { project, users: allMembers } = useOutletContext<{ project: Project; users: User[] }>();
    const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
    const [error, setError] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const { openModal, closeModal } = useModal();
    const [filters, setFilters] = useState({
        status: 'all',
        timestamp: 'latest',
        query: '',
    });
    const [teamMembers, setTeamMembers] = useState<User[]>([]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, query: e.target.value });
    };

    const handleAddMember = (newMember: User) => {
        setTeamMembers([...teamMembers, newMember]);
    };

    const handleRemoveMember = (member: User) => {
        setTeamMembers(teamMembers.filter((m) => m.email !== member.email));
    };



    const handleAddUsers = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to add users to the project
        closeModal();
    };

    const handleInputChange = ( value: string) => {
        setEmailInput(value);

        setFilteredMembers(
            allMembers.filter((member) =>
                member.first_name.toLowerCase().includes(value.toLowerCase()) ||
                member.last_name.toLowerCase().includes(value.toLowerCase()) ||
                member.email.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleSelectMember = ( member: User) => {
        if (teamMembers.some((tm) => tm.email === member.email)) {
            setError('This member is already part of the team.');
        } else {
            setTeamMembers([...teamMembers, member]);
            setEmailInput('');
            setFilteredMembers([]);
            setError('');
        }
    };

    const handleAddMemberClick  = (member: User) => {
        if (teamMembers.some((member) => member.email === emailInput)) {
            setError('This email is already a member.');
            return;
        }
        if(!emailInput.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        handleAddMember(member);

        setTeamMembers([...teamMembers, member]);
        setError('');
        setEmailInput('');
    };

    const handleOpenUsersModal = () => {
        openModal({
            title: 'Add Project Users',
            content: (
                <form onSubmit={handleAddUsers}>
                    <div className="modal-body my-5">
                        <div className="grid gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-gray-900 font-semibold text-2sm">
                                    Share via email
                                </label>
                                <div className="flex flex-center gap-2.5">
                                    <label className="input">
                                        <input 
                                            onChange={(e) => handleInputChange(e.target.value)} 
                                            type="text"
                                            value={emailInput}
                                            placeholder="Enter email address"
                                        />
                                    </label>
                                    <button onClick={() => handleAddMemberClick} type="button" className="btn btn-primary">
                                        Add
                                    </button>
                                </div>
                                <div className="relative">
                                    {/* Dropdown for filtering */}
                                    {filteredMembers.length > 0 && (
                                        <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-md mt-1 w-full max-h-48 overflow-y-auto">
                                            {filteredMembers.map((member) => (
                                                <div
                                                    key={member.email}
                                                    onClick={() => handleSelectMember(member)}
                                                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                                                >
                                                    { member.logo ? (
                                                        <img
                                                            src={member.logo}
                                                            alt={member.first_name + " " + member.last_name}
                                                            className="rounded-full w-8 h-8"
                                                        />
                                                    ) : (
                                                        <Avatar name={member.first_name + " " + member.last_name} size="40" round={true} textSizeRatio={3}  />
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-semibold">{member.first_name} {member.last_name}</p>
                                                        <p className="text-xs text-gray-600">{member.email}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-gray-900 font-semibold text-2sm">
                                    Team Members
                                </label>
                                <div className="scrollable-y-auto max-h-[150px]">
                                    {teamMembers.map((member, index) => (
                                        <div key={index} className="flex items-center flex-wrap gap-2 py-2">
                                            <div className="flex items-center grow gap-2.5">
                                                {member.logo ? (
                                                    <img src={member.logo}
                                                        className="rounded-full size-9 shrink-0"
                                                        alt="avatar"
                                                    />
                                                ): (
                                                    <Avatar name={member.first_name + " " + member.last_name} size="40" round={true} textSizeRatio={3} />
                                                )}

                                                <div className="flex flex-col">
                                                    <a className="text-sm font-semibold text-gray-900 hover:text-primary-active mb-px" 
                                                        href="/metronic/tailwind/react/demo1/public-profile/campaigns/card">
                                                        {member.first_name + " " + member.last_name}
                                                    </a>
                                                    <a className="hover:text-primary-active text-2sm font-medium text-gray-600"
                                                        href="/metronic/tailwind/react/demo1/public-profile/campaigns/card">
                                                        {member.email}
                                                    </a>
                                                </div>
                                            </div>
                                            <button
                                                title="remove member"
                                                type="button"
                                                onClick={() => handleRemoveMember(member)}
                                                className="btn btn-sm btn-danger btn-icon"
                                            >
                                                <HiOutlineTrash />
                                            </button>
                                        </div>
                                    ))}
                                    {teamMembers.length === 0 && (
                                        <p className="text-gray-400 text-sm">No team members added yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    </div>
                    <div className="modal-footer justify-end!">
                        <div className="flex gap-4">
                            <button 
                                type="button"
                                onClick={closeModal} className="btn btn-light btn-sm">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )
        });
    };
    return (
        <>
            { project.members && project.members.length > 0 ? (
                <div>
                    <div className="flex items-center justify-between gap-2.5 flex-wrap mb-7.5">
                        <h3 className="text-md text-gray-900 font-medium">
                            Showing { project.members?.length || 0} Users
                        </h3>
                        {/* Filters */}
                        <div className="flex items-center flex-wraplg:flex-nowrap gap-2.5">

                            <select
                                title="filter_by_status"
                                name="status"
                                onChange={handleFilterChange}
                                value={filters.status}
                                className="select select-sm min-w-28">
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="disabled">Disabled</option>
                                <option value="pending">Pending</option>
                            </select>

                            <select 
                                title="filter_by_timestamp"
                                className="select select-sm min-w-28">
                                <option value="1">Latest</option>
                                <option value="2">Older</option>
                                <option value="3">Oldest</option>
                            </select>
                            {/* <button className="btn btn-sm btn-outline btn-primary">
                                <i className="ki-filled ki-setting-4"></i>
                                Filters
                            </button> */}
                            <div className="flex">
                                <label className="input input-sm">
                                    <HiMagnifyingGlass />
                                    <input
                                        type="text"
                                        name="query"
                                        placeholder="Type name, team"
                                        value={filters.query}
                                        onChange={handleSearchChange}
                                        className="input input-sm"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5">
                        {project.members && project.members.map((user:User)=> (
                            <div className="card flex flex-col items-center p-5 lg:py-10">
                            <div className="mb-3.5">
                                { user.logo_url ? (
                                    <div className="size-20 relative">
                                        <img src={user.logo_url}
                                            className="rounded-full" alt=""
                                        />
                                        <div className="flex size-2.5 bg-success rounded-full absolute bottom-0.5 start-16 transform -translate-y-1/2"></div>
                                    </div>
                                ): (
                                    <div className="flex items-center justify-center relative text-2-5xl text-primary size-20 ring-1 ring-primary-clarity bg-primary-light rounded-full">
                                        {user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}
                                        <div className="flex size-2.5 bg-success rounded-full absolute bottom-0.5 start-16 transform -translate-y-1/2"></div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-center gap-1.5 mb-2">
                                <Link to={`/users/${user.id}`} className="hover:text-primary-active text-base leading-5 font-medium text-gray-900">
                                    { user.first_name } { user.last_name }
                                </Link>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none"
                                    className="text-primary">
                                    <path d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <a href="#" className="text-gray-700 text-sm hover:text-primary-active">
                                {user.email}
                            </a>
                        </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body flex flex-col items-center gap-2.5 py-7.5">
                        <div className="flex justify-center p-7.5 py-9">
                            <img alt="image" className="dark:hidden max-h-[230px]" src="/images/illustrations/28.svg" />
                        </div>
                        <div className="flex flex-col gap-5 lg:gap-7.5">
                            <div className="flex flex-col gap-3 text-center">
                            <h2 className="text-1.5xl font-semibold text-gray-900">
                                Your Project is Empty
                            </h2>
                            <p className="text-sm text-gray-800">
                                A project is a collaborative space where many users can work together on tasks
                                <br />
                                Invite other users to your project to start working together.
                            </p>
                            </div>
                            <div className="flex justify-center mb-5">
                                <button type="button" onClick={()=>handleOpenUsersModal()} className="btn btn-primary">
                                    Invite Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProjectUsers