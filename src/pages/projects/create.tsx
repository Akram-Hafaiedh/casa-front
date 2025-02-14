import React, { useEffect, useRef, useState } from 'react';
import useAxiosInstance from "../../utils/axiosInstance";

import { useNavigate } from 'react-router-dom';
import { MdSupervisedUserCircle } from "react-icons/md";
import { FaCheck } from 'react-icons/fa6';
import { HiCamera, HiOutlineTrash, HiOutlineXMark, HiUserCircle } from 'react-icons/hi2';
import { User } from '../../types/User';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import InfoSection from '../../layouts/Info';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import ProjectSettingsContent from './components/ProjectSettingsContent';
import ProjectTypes from './components/ProjectTypeContent';
import Loader from '../../components/Loader';



const ProjectCreate: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    
    const [loading, setLoading] = useState(true);
    
    const [allMembers, setAllMembers] = useState<User[]>([]);

    const [teamMembers, setTeamMembers] = useState<User[]>([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectImage, setProjectImage] = useState<File | null>(null);
    const [endDate, setEndDate] = useState('');
    
    const [selectedType, setSelectedType] = useState('team');

    const [budget, setBudget] = useState(0.50);
    const [allowChanges, setAllowChanges] = useState(false);
    const [budgetUsage, setBudgetUsage] = useState<number>(0);

    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(1);


    // const [firstTaskTitle, setFirstTaskTitle] = useState('');
    // const [firstTaskTags, setFirstTaskTags] = useState<string[]>([]);
    // const [firstTaskDescription, setFirstTaskDescription] = useState('');
    // const [firstTaskDueDate, setFirstTaskDueDate] = useState(moment().format('YYYY-MM-DD'));
    // const [assignedTo, setAssignedTo] = useState('');


    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get('/users');
            if(response.data.status.code === 200) {
                setAllMembers(response.data.data.users.data);
            };
            setLoading(false);
        };
        fetchData();
    },[])
    
    const navigate = useNavigate();
    const steps = [
        {
            title: 'Project Type',
            description: 'Description for Step 1',
            component: (
                <ProjectTypes 
                    selectedType={selectedType}
                    setSelectedType={setSelectedType} 
                />
            ),
        },
        {
            title: 'Project Settings',
            description: 'Description for Step 2',
            component: (
                <ProjectSettingsContent
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    projectImageFile={projectImage}
                    setProjectImageFile={setProjectImage}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            ),
        },
        {
            title: 'Budget',
            description: 'Description for Step 3',
            component: (
                <ProjectBudget 
                    budget={budget}
                    setBudget={setBudget}
                    allowChanges={allowChanges}
                    setAllowChanges={setAllowChanges}
                    budgetUsage={budgetUsage} 
                    setBudgetUsage={setBudgetUsage}
                />
            ),
        },
        {
            title: 'Team',
            description: 'Description for Step 4',
            component: (
                <ProjectTeam
                    selectedType={selectedType}
                    allMembers={allMembers}
                    teamMembers={teamMembers}
                    setTeamMembers={setTeamMembers}
                />
            ),
        },
        // {
        //     title: 'First Task',
        //     description: 'Description for Step 5',
        //     component: (
        //         <ProjectFirstTask 
        //             projectMembers={teamMembers}
        //             firstTaskTitle={firstTaskTitle}
        //             setFirstTaskTitle={setFirstTaskTitle}
        //             firstTaskDueDate={firstTaskDueDate}
        //             setFirstTaskDueDate={setFirstTaskDueDate}
        //             firstTaskTags={firstTaskTags}
        //             setFirstTaskTags={setFirstTaskTags}
        //             firstTaskDescription={firstTaskDescription}
        //             setFirstTaskDescription={setFirstTaskDescription}
        //             assignedTo={assignedTo}
        //             setAssignedTo={setAssignedTo}
        //         />
        //     ),
        // }
    ];


    const handleCreate = async (e: React.FormEvent) => {
        setError('');
        e.preventDefault();
        if (!name) {
            setError('Project name is required');
            return;
        }
        try {
            const data = new FormData()
            data.append('name', name);
            data.append('description', description);
            data.append('end_date', endDate);
            data.append('selected_type', selectedType);
            data.append('budget', budget.toString());
            data.append('allow_changes', allowChanges.toString());
            data.append('budget_usage', budgetUsage.toString());
            if (projectImage) {
                data.append('project_image', projectImage);
            }
            teamMembers.forEach(member => {
                data.append('team[]', member.id);
            });

            const response = await axiosInstance.post('projects/create', data);
            console.log(response.data);
            if (response && response.data.status.code == 201) {
                toast.success(response.data.status.message);
                navigate(`/projects/${response.data.data.project.id}/overview`);
            }
            if (response && response.data.status.code === 400) {
                Object.keys(response.data.errors).forEach((key) => {
                    response.data.errors[key].forEach((error: string) => {
                        toast.error(`${error}`);
                    });
                });
            }
            if (response && response.data.status.code === 500) {
                toast.error('An error occurred while creating the project please contact support.');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('An error occurred while creating the project please contact support.');
        }
    };

    const handleNextStep =  () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    }

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    if(loading) return <Loader isLoading={loading} />;
    return (
        <>
            <div className="container-fixed">
                <InfoSection
                    title="Create a New Project"
                    description="Let's start by creating a new project and set its basic details."
                    actions={[
                        {
                            type: 'link',
                            text: 'Projects List',
                            icon: <IoReturnDownBackOutline />,
                            to: '/projects',
                            iconPosition: 'start'
                        }
                    ]}
                />
            </div>
            <div className="container-fixed">
                <form className="w-full" onSubmit={handleCreate}>
                    <div data-stepper="true">
                        <div className="card">
                            <div className="card-header flex justify-between items-center gap-4 py-8">
                                {steps.map((step,index)=> (
                                    <div 
                                        key={index}
                                        className={`flex gap-2.5 items-center ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`} data-stepper-item="#stepper_1">
                                        <div className={`rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse`}>
                                            <span className="stepper-item-completed:hidden" data-stepper-number="true">
                                                {index + 1}
                                            </span>
                                            <FaCheck className="text-xl hidden stepper-item-completed:inline" />
                                            {/* <i className="ki-outline ki-check text-xl hidden stepper-item-completed:inline"></i> */}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <h4 className="text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600">
                                                {step.title}
                                            </h4>
                                            <span className="text-2sm text-gray-700 stepper-item-completed:text-gray-400">
                                                {step.description}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="card-body !py-16">
                                {steps.map((step, index) => (
                                    <div key={index} className={`flex items-center justify-center font-semibold text-gray-900 ${index + 1 === currentStep ? '' : 'hidden'}`} id={`step-${index + 1}`}>
                                        {step.component}
                                    </div>   
                                ))}
                            </div>
                            <div className="card-footer py-8 flex justify-between">
                                <div>
                                    <button type="button" className={`btn btn-light ${currentStep === 1 ? '!hidden' : ''}`} onClick={handlePreviousStep}>
                                        Back
                                    </button>
                                </div>
                                <div>
                                    <button type="button" className={`btn btn-light ${currentStep === steps.length ? '!hidden' : ''}`} onClick={handleNextStep}>
                                        Next
                                    </button>
                                    
                                    <button type="submit" className={`btn btn-primary ${currentStep === steps.length ? '' : '!hidden'}`}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProjectCreate;

interface ProjectSettingsProps  {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    projectImageFile: File| null;
    setProjectImageFile: React.Dispatch<React.SetStateAction<File|null>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
    name,
    setName,
    description,
    setDescription,
    projectImageFile,
    setProjectImageFile,
    endDate,
    setEndDate
}) => {
    const [projectImage, setProjectImage] = useState<string|null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleRemoveProjectImage = () => {
        setProjectImage(null);
        setProjectImageFile(null);
    };
    const handleChangeProjectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProjectImageFile(file);
            // console.log(projectImageFile);
            const reader = new FileReader();
            reader.onload = () => {
                setProjectImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    return (

        <div className="grid gap-5 w-full">
            {/* Profile Photo */}
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56">Project Logo</label>
                <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                    <span className="text-2sm font-medium text-gray-600">
                        150x150px JPEG, PNG Image
                    </span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        title="project-logo"
                        onChange={handleChangeProjectImage}
                    />
                    <div className="image-input size-16">
                        {projectImage && (
                            <button 
                                title="remove"
                                type="button"
                                className="btn btn-icon btn-icon-xs btn-light shadow absolute z-1 !size-5 -top-0.5 -end-0.5 rounded-full"
                                onClick={handleRemoveProjectImage}
                            >
                                <HiOutlineXMark className="size-6" />
                            </button>
                        )}
                        <span className="tooltip" id="image_input_tooltip">
                            Click to remove or revert
                        </span>
                        <div
                            className={`image-input-placeholder rounded-full border-2 ${projectImage ? 'border-success': 'border-gray-300'}`}
                            style={{ backgroundImage: "url('/images/blank.png')" }}
                        >
                            {projectImage && <img src={projectImage} alt="logo" />}
                            <div 
                                className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-dark-clarity absolute"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <HiCamera className="fill-light opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Info Fields */}
            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-name'>Project Name</label>
                <input
                    name="project-name"
                    id='project-name'
                    type="text"
                    className="input"
                    placeholder="9 Degree Award"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-description'>Project Description</label>
                <textarea 
                    name="project-description"
                    rows={4}
                    id="project-description"
                    placeholder="Description"
                    className="textarea text-2sm text-gray-600 font-normal"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor="project-due-date">Due Date</label>
                <input id="project-due-date"
                    name="project-due-date"
                    type="date"
                    className="input"
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>

    )
}


interface ProjectBudgetProps {
    budget: number;
    setBudget: React.Dispatch<React.SetStateAction<number>>;
    allowChanges: boolean;
    setAllowChanges: React.Dispatch<React.SetStateAction<boolean>>;
    budgetUsage: number;
    setBudgetUsage: React.Dispatch<React.SetStateAction<number>>
}
const ProjectBudget: React.FC <ProjectBudgetProps> = ({
    budget,
    setBudget,
    allowChanges,
    setAllowChanges,
    budgetUsage,
    setBudgetUsage
}) => {
    // const [budget, setBudget] = useState(0.50);
    // const [allowChanges, setAllowChanges] = useState(false);
    // const [budgetUsage, setBudgetUsage] = useState('precise');

    const budgetUsageOptions = [
        {
            value: 0,
            label: 'Precise Usage',
            description: 'Withdraw money to your bank account per transaction under $50,000 budget.  Fine-grained control.',
        },
        {
            value: 1,
            label: 'Normal Usage',
            description: 'Standard withdrawal limits and processing times.',
        },
        {
            value: 2,
            label: 'Extreme Usage',
            description: 'Higher withdrawal limits with expedited processing.  May incur additional fees.',
        },
    ];
    return (
        <div className="grid gap-5">
            <div className="flex items-baseline gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-name'>Budget Amount</label>
                <input 
                    id='project-name'
                    type="number"
                    className="input"
                    placeholder="150"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                />
            </div>
            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-name'>Budget Usage</label>

                <div className="flex flex-row items-center space-x-2">
                    {budgetUsageOptions.map((option) => (
                        <label 
                            key={option.value}
                            htmlFor={`budget-usage-${option.value}`} 
                            className={`min-h-[125px] cursor-pointer text-slate-700 border border-dashed has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[24px_1fr_auto] items-start gap-6 rounded-lg p-4 border-gray-200 hover:bg-slate-100`}>
                            <input
                                className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500 mt-2"
                                name="budget_usage"
                                id={`budget-usage-${option.value}`}
                                type="radio"
                                value={option.value} 
                                checked={budgetUsage === option.value}
                                onChange={() => setBudgetUsage(option.value)}
                            />
                             <div className="flex flex-col max-w-[300px]">
                                <span className="text-slate-700 text-lg mb-2 font-medium leading-5">{option.label}</span>
                                <span className="text-[0.95rem] leading-4 font-medium text-gray-500">{option.description}</span>
                            </div>
                        </label>
                    ))}
                    {/* <label htmlFor="normal"
                        className="cursor-pointer text-slate-700 border border-dashed has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[24px_1fr_auto] items-start gap-6 rounded-lg p-4 border-gray-200 hover:bg-slate-100"
                    >
                        <input 
                            className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500 mt-2"
                            name="budget_usage"
                            id="normal"
                            type="radio"
                            value="normal"
                            checked={budgetUsage === 'normal'}
                            onChange={() => setBudgetUsage('normal')}
                        />
                        <div className="flex flex-col max-w-[300px]">
                            <span className='text-slate-700 text-lg mb-2 font-medium leading-5'>Normal Usage</span>
                            <span className="text-[0.95rem] leading-4 font-medium text-gray-500">
                                Withdraw money to your bank account per transaction under $50,000 budget
                            </span>
                        </div>
                    </label>
                    <label htmlFor="extreme"
                        className="cursor-pointer text-slate-700 border border-dashed has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[24px_1fr_auto] items-start gap-6 rounded-lg p-4 border-gray-200 hover:bg-slate-100"
                    >
                        <input 
                            className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500 mt-2"
                            name="budget_usage"
                            id="extreme"
                            value="extreme"
                            type="radio"
                            checked={budgetUsage === 'extreme'}
                            onChange={() => setBudgetUsage('extreme')}
                        />
                        <div className="flex flex-col max-w-[300px]">
                            <span className='text-slate-700 text-lg mb-2 font-medium leading-5'>Extreme Usage</span>
                            <span className="text-[0.95rem] leading-4 font-medium text-gray-500">
                                Withdraw money to your bank account per transaction under $50,000 budget
                            </span>
                        </div>
                    </label> */}
                </div>
            </div>
            <div className="flex items-center justify-between lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='budget-suage'>Budget Usage</label>
                <div className="flex flex-row items-center grow">
                    <label htmlFor="allowed" className="switch">
                        <input type="checkbox" name="allowed" onChange={()=>{setAllowChanges(!allowChanges)}} value="1" checked={allowChanges} />
                        <span className="switch-label order-2">Allowed</span>
                    </label>
                    {/* <Switch
                        isChecked={allowChanges}
                        onChange={()=>{setAllowChanges(!allowChanges)}}
                    /> */}
                </div>
            </div>
        </div>
    )
}
interface ProjectTeamProps {
    selectedType: string;
    allMembers: User[];
    teamMembers: User[];
    setTeamMembers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ProjectTeam: React.FC<ProjectTeamProps> = ({ 
    selectedType,
    allMembers,
    teamMembers,
    setTeamMembers
}) => {
    const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState('');


    const handleAddMember = (newMember: User) => {
        setTeamMembers([...teamMembers, newMember]);
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
    }


    const handleSelectMember = ( member: User) => {
        if (teamMembers.some((tm) => tm.email === member.email)) {
            setError('This member is already part of the team.');
        } else {
            setTeamMembers([...teamMembers, member]);
            setEmailInput('');
            setFilteredMembers([]);
            setError('');
        }
    }

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

    const handleRemoveMember = (member: User) => {
        setTeamMembers(teamMembers.filter((m) => m.email !== member.email));
    };

    const isTeamRequired = selectedType === 'team';

    return (
        <div className="min-w-[500px]">

            <div className="grid gap-5">
                <div className='mb-4'>
                    <h3 className="text-lg font-semibold">
                        {isTeamRequired
                            ? 'Select team members (required)'
                            : 'Add optional team members'}
                    </h3>
                    {isTeamRequired && (
                        <p className="text-gray-600 text-sm mt-2">
                            At least one team member is required for a team project.
                        </p>
                    )}
                </div>


                {/* Add member */}
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

                <div className="border-b border-b-gray-200"></div>
                {/* List of members */}
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


                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            </div>
        </div>
    );
};

// interface ProjectFirstTaskProps {
//     projectMembers: User[];
//     firstTaskTitle: string;
//     setFirstTaskTitle: React.Dispatch<React.SetStateAction<string>>
//     firstTaskDescription: string;
//     setFirstTaskDescription: React.Dispatch<React.SetStateAction<string>>
//     firstTaskDueDate: string;
//     setFirstTaskDueDate: React.Dispatch<React.SetStateAction<string>>
//     firstTaskTags: string[];
//     setFirstTaskTags: React.Dispatch<React.SetStateAction<string[]>>
//     assignedTo: string;
//     setAssignedTo: React.Dispatch<React.SetStateAction<string>>
// }

// const ProjectFirstTask : React.FC<ProjectFirstTaskProps> = ({
//     projectMembers,
//     firstTaskTitle,
//     setFirstTaskTitle,
//     firstTaskDescription,
//     setFirstTaskDescription,
//     firstTaskDueDate,
//     setFirstTaskDueDate,
//     firstTaskTags,
//     setFirstTaskTags,
//     assignedTo,
//     setAssignedTo,
// }) => {
//     console.log(projectMembers);
//     // const [taskTitle, setTaskTitle] = useState('');
//     // const [tags, setTags] = useState<string[]>([]);
//     // const [taskDescription, setDescription] = useState('');
//     // const [taskDueDate, setTaskDueDate] = useState(moment().format('YYYY-MM-DD'));
    
//     const [tagInput, setTagInput] = useState('');
//     const handleRemoveTag = (tagToRemove: string) => {
//         setFirstTaskTags(firstTaskTags.filter((tag: string) => tag !== tagToRemove));
//     };

//     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === "Enter" || event.key === ",") {
//           event.preventDefault();
//           if (tagInput.trim() && !firstTaskTags.includes(tagInput.trim())) {
//             setFirstTaskTags([...firstTaskTags, tagInput.trim()]);
//             setTagInput("");
//           }
//         }
//     };
//     return(
//         <div className="grid gap-5 w-full">
//             <h2 className="text-xl font-bold mb-4 text-center">Project First Task</h2>
//             {/* Task form */}
//             <div className="flex items-baseline lg:flex-nowrap gap-2.5">
//                 <label className="form-label max-w-56 !font-semibold" htmlFor='project-name'>Title</label>
//                 <input
//                     name="task-title"
//                     id='task-title'
//                     type="text"
//                     className="input"
//                     placeholder="Enter Task Title"
//                     value={firstTaskTitle}
//                     onChange={(e) => setFirstTaskTitle(e.target.value)} 
//                 />
//             </div>
//             <div className="flex items-baseline lg:flex-nowrap gap-2.5">
//                 <label className="form-label max-w-56 !font-semibold" htmlFor='task-description'>Description</label>
//                 <textarea 
//                     name="task-description"
//                     rows={4}
//                     id="task-description"
//                     placeholder="Description"
//                     className="textarea text-2sm text-gray-600 font-normal"
//                     onChange={(e) => setFirstTaskDescription(e.target.value)}
//                     value={firstTaskDescription}
//                 ></textarea>
//             </div>

//             <div className="flex items-baseline lg:flex-nowrap gap-2.5">
//                 <label className="form-label max-w-56 !font-semibold" htmlFor='task-due-date'>Due Date</label>
//                 <input
//                     id="task-due-date"
//                     name="task-due-date"
//                     type="date"
//                     className="input input"
//                     value={firstTaskDueDate}
//                     onChange={(e) => setFirstTaskDueDate(e.target.value)}
//                 />
//             </div>
            
//             <div className="flex items-baseline lg:flex-nowrap gap-2.5">
//                 <label htmlFor="asignedTo" className="form-label max-w-56 !font-semibold">Assignee</label>
//                 <select
//                     id="asignedTo"
//                     name="asignedTo"
//                     className="select"
//                     value={assignedTo}
//                     onChange={(e) => setAssignedTo(e.target.value)}
//                     >
//                         <option value="">Select Member</option>
//                         {projectMembers.map((member) => (
//                             <option key={member.id} value={member.id}>
//                                 {member.first_name+ ' ' +  member.last_name}
//                             </option>
//                         ))}
//                 </select>
//             </div>

//             <div className="flex items-baseline lg:flex-nowrap gap-2.5">
//                 <label htmlFor="asigned-member" className="form-label max-w-56 !font-semibold">Skills</label>
//                 <div className="flex flex-wrap items-center gap-2 input w-full">
//                     {firstTaskTags.map((tag: string,index: number) =>(
//                         <div 
//                             key={index}
//                             className="flex items-center gap-1 p-2 cursor-pointer badge badge-primary badge-pill badge-sm"
//                         >
//                             {tag}
//                             <button
//                                 title="remove-tag"
//                                 type="button"
//                                 className="text-gray-400 hover:text-gray-600"
//                                 onClick={() => handleRemoveTag(tag)}>
//                                 <HiOutlineXMark className="w-4 h-4 stroke-white" />
//                             </button>
//                         </div>
//                     ))}
//                     <input
//                         type="text"
//                         value={tagInput}
//                         onChange={(e) => setTagInput(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                         placeholder="Add a tag"
//                         className="flex-grow px-2 py-1 text-sm border-none focus:ring-0 focus:outline-none bg-transparent"
//                     />
//                 </div>
//             </div>
        
//         </div>
//     )
// }
