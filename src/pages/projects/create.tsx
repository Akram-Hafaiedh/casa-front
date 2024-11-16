import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import Switch from '../../components/Switch';
import Stepper from 'stepperjs';
import { MdSupervisedUserCircle } from "react-icons/md";
import { FaCheck } from 'react-icons/fa6';
import { HiUserCircle } from 'react-icons/hi2';


const ProjectCreate: React.FC = () => {
    
    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedType, setSelectedType] = useState('team');

    const navigate = useNavigate();
    const steps = [
        {
            title: 'Project Type',
            description: 'Description for Step 1',
            component: <ProjectTypes selectedType={selectedType} setSelectedType={setSelectedType} />,
        },
        {
            title: 'Project Settings',
            description: 'Description for Step 2',
            component: <ProjectSettings />,
        },
        {
            title: 'Budget',
            description: 'Description for Step 3',
            component: <ProjectBudget />,
        },
        {
            title: 'Team',
            description: 'Description for Step 4',
            component: <ProjectTeam  selectedType={selectedType} />,
        },
    ];


    const handleCreate = async (e: React.FormEvent) => {
        setError('');
        e.preventDefault();
        if (!name) {
            setError('Project name is required');
            return;
        }
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
            const newProject = { name, description, startDate, endDate, isPrivate };
            const response = await axios.post(`${apiUrl}/projects/create`, newProject, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            if (response && response.data.status === 201) {
                navigate(`/projects/${response.data.data.project._id}`);
            }
        } catch (error) {
            console.error('Error creating project:', error);
            setError('An error occurred while creating the project.');
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

    return (
        <>
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


const ProjectSettings: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    return (

        <div className="grid gap-5 w-full">
            {/* Profile Photo */}
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56">Project Logo</label>
                <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                    <span className="text-2sm font-medium text-gray-600">150x150px JPEG, PNG Image</span>
                    <input type="file" accept="image/*" className="hidden" title="project-logo" />
                    <div className="image-input size-16">
                    <button className="btn btn-icon btn-icon-xs btn-light shadow absolute z-1 size-5 -top-0.5 -end-0.5 rounded-full">
                        {/* <i className="ki-filled ki-cross"></i> */}
                        <IoClose className="w-4 h-4 text-black" />
                    </button>
                    <div
                        className="image-input-placeholder rounded-full border-2 border-success "
                        style={{ backgroundImage: "url('/images/blank.png')" }}
                    >
                        {/* <img src="/metronic/tailwind/react/demo1/media/avatars/300-2.png" alt="avatar" /> */}
                        <img src="/images/volicity-9.svg" alt="logo" />
                    </div>
                    </div>
                </div>
            </div>

            {/* User Info Fields */}
            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-name'>Project Name</label>
                <input id='project-name' type="text" className="input" placeholder="9 Degree Award" value={name} />
            </div>

            {/* TODO: Move this to the first Step*/}
            {/* <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-type'>Project Type</label>
                <input id='project-type' type="text" className="input" placeholder="Client Relationship" value={name} />
            </div> */}

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

            <div className="flex items-center lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56">Private</label>
                <Switch
                    isChecked={isPrivate}
                    onChange={()=>{setIsPrivate(!isPrivate)}}
                />
            </div>
        </div>

    )
}

interface ProjectTypesProps{
    selectedType : string;
    setSelectedType: (type: string) => void;
}

const ProjectTypes: React.FC <ProjectTypesProps> = ({selectedType, setSelectedType}) => {
    return (
        <div className="mt-4 space-y-2">
            <label htmlFor="personnal" className="text-slate-700 text-3xl has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[8rem_1fr_auto] items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
                <HiUserCircle className='size-20' />
                Personnal Project
                <input 
                    name="payment_method" 
                    id="personnal" 
                    value="personnal"
                    checked={selectedType === 'personnal'}
                    onChange={() => setSelectedType('personnal')}
                    type="radio" 
                    className="hidden" 
                />
            </label>
            <label htmlFor="team" className="text-slate-700 text-3xl has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[8rem_1fr_auto] items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
                <MdSupervisedUserCircle className='size-20' />
                Team Project
                <input 
                    name="payment_method" 
                    id="team" 
                    value="team"
                    checked={selectedType === 'team'}
                    onChange={() => setSelectedType('team')}
                    type="radio" 
                    className="hidden" 
                />
            </label>
        </div>
    )
}

const ProjectBudget: React.FC = () => {
    const [budget, setBudget] = useState(0.50);
    const [allowChanges, setAllowChanges] = useState(false);
    const [budgetUsage, setBudgetUsage] = useState('precise');
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
                    <label htmlFor="precise" className="has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 grid grid-cols-[24px_1fr_auto] items-start gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
                        <input
                            className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500 mt-2"
                            name="budget_usage"
                            id="precise"
                            type="radio"
                            value="precise"
                            checked={budgetUsage === 'precise'}
                            onChange={() => setBudgetUsage('precise')}
                        />
                        <div className="flex flex-col max-w-[300px]">
                            <span className='text-slate-700 text-2xl'>Precise Usage</span>
                            <span className="text-base text-gray-500">
                                Withdraw money to your bank account per transaction under $50,000 budget
                            </span>
                        </div>
                    </label>
                    <label htmlFor="normal" className="text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[24px_1fr_auto] items-start gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
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
                            <span className='text-slate-700 text-2xl'>Normal Usage</span>
                            <span className="text-base text-gray-500">
                                Withdraw money to your bank account per transaction under $50,000 budget
                            </span>
                        </div>
                    </label>
                    <label htmlFor="extreme" className="text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-800 has-[:checked]:bg-indigo-50 grid grid-cols-[24px_1fr_auto] items-start gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
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
                            <span className='text-slate-700 text-2xl'>Extreme Usage</span>
                            <span className="text-base text-gray-500">
                                Withdraw money to your bank account per transaction under $50,000 budget
                            </span>
                        </div>
                    </label>
                </div>
            </div>
            <div className="flex items-center justify-between lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor='project-name'>Budget Usage</label>
                <div className="flex flex-row items-center space-x-2">
                    <Switch
                        isChecked={allowChanges}
                        onChange={()=>{setAllowChanges(!allowChanges)}}
                    />
                    <span className="form-label">Allowed</span>
                </div>
            </div>
        </div>
    )
}
interface ProjectTeamProps {
    selectedType:string;
}
const ProjectTeam: React.FC<ProjectTeamProps> = ({selectedType}) => {
    return (
        <div>
            {selectedType === 'personnal' ? (
                <div>
                    <h2>Personal Project Details</h2>
                    <div>
                        <label htmlFor="personal-goal">Project Goal</label>
                        <input type="text" id="personal-goal" placeholder="What do you aim to achieve?" className="input"/>
                    </div>
                    <div>
                        <label htmlFor="personal-deadline">Deadline</label>
                        <input type="date" id="personal-deadline" className="input"/>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Team Project Details</h2>
                    <div>
                        <label htmlFor="team-members">Team Members</label>
                        <input type="text" id="team-members" placeholder="List your team members" className="input"/>
                    </div>
                    <div>
                        <label htmlFor="team-role">Your Role</label>
                        <input type="text" id="team-role" placeholder="What is your role?" className="input"/>
                    </div>
                </div>
            )}
        </div>
    )
}