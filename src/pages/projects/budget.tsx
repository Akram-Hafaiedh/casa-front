import { useState } from "react";
import Hexagon from "../../components/Hexagon";
import { HiMiniSquaresPlus } from "react-icons/hi2";

const ProjectBudget : React.FC = () => {
    const [budget, setBudget] = useState(0.50);
    const [allowChanges, setAllowChanges] = useState(false);
    const [budgetUsage, setBudgetUsage] = useState('precise');
    const [description, setDescription] = useState('');
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
            
            <div className="col-span-2 grid grid-cols-1 gap-5 lg:gap-7.5">
                <div className="flex flex-col gap-5 lg:gap-7.5">
                    <div className="card">
                        <div className="card-body !px-10 !py-7.5">
                            <div className="grid grid-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <label className="form-label" htmlFor='project-name'>Current Status</label>
                                    <div className="flex flex-col gap-3.5">
                                        <span className="text-2sm text-gray-700">
                                            Usage (32 of 40 users)
                                        </span>
                                        <div className="progress progress-success progress-basic">
                                            <div className="progress-bar" style={{width: '80%'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className="form-label" htmlFor='budget-amount'>Budget Amount</label>
                                    <input 
                                        id='project-name'
                                        type="number"
                                        className="input"
                                        placeholder="150"
                                        value={budget}
                                        onChange={(e) => setBudget(parseFloat(e.target.value))}
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className="form-label" htmlFor='project-usage'>Budget Usage</label>
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
                                <div className="flex flex-col gap-4">
                                    <label className="form-label max-w-56" htmlFor='project-name'>Description</label>
                                    <input 
                                        id='project-name'
                                        type="text"
                                        className="input"
                                        placeholder="150"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                        
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-group flex items-center justify-between py-4 gap-2.5">
                            <div className="flex items-center gap-3.5">
                                <Hexagon 
                                    icon={HiMiniSquaresPlus}
                                    strokeClass="stroke-red-300"
                                    fillClass="fill-gray-100"
                                    size={50}
                                    iconClassName="text-red-300"
                                    iconSize={20}
                                />
                                <div className="flex flex-col gap-0.5">
                                    <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-gray-900">
                                        Allow Changes in Budget 
                                    </span>
                                    <span className="text-2sm text-gray700">
                                        If you need more info, please check budget planning.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <label className="sr-only" htmlFor="allow-changes">Allow Changes in Budget</label>
                                <div className="switch switch-sm">
                                    <input name="allow-changes" id="allow-changes" type="checkbox" checked={allowChanges} onChange={() => setAllowChanges(!allowChanges)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="flex flex-col gap-5 lg:gap-7.5">
                    <div className="card">
                        <div className="card-body py-10 flex flex-col gap-5 lg:gap-7.5">
                            <div className="flex flex-col items-start gap-2.5">
                                <div className="mb-2.5">
                                    <div className="relative size-[50px] shrink-0">
                                        <svg className="w-full h-full stroke-brand-clarity fill-brand-light" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                                            18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                                            39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill=""></path><path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                            18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                            39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke=""></path>
                                        </svg>
                                        <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                            <i className="ki-filled ki-people text-1.5xl ps-px text-brand"></i>
                                        </div>
                                    </div>
                                </div>
                                <a className="text-base font-semibold text-gray-900 hover:text-primary" href="/metronic/tailwind/react/demo1/account/members/import-members">
                                    Streamlining Member Integration: Import Tools and Resources
                                </a>
                                <p className="text-sm text-gray-700">
                                    Dive into seamless member onboarding with our robust import tools. Leverage detailed walkthroughs, practical resources, and support to simplify the process.
                                </p>
                                <a className="btn btn-link flex-none"
                                    href="/metronic/tailwind/react/demo1/account/members/import-members">
                                    Learn more
                                </a>
                            </div>
                            <span className="hidden [&:not(:last-child)]:block [&:not(:last-child)]:border-b border-b-gray-200"></span>
                            <div className="flex flex-col items-start gap-2.5">
                                <div className="mb-2.5">
                                    <div className="relative size-[50px] shrink-0">
                                        <svg className="w-full h-full stroke-brand-clarity fill-brand-light" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="">   
                                            </path>
                                            <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                                18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                                39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="">
                                            </path>
                                        </svg>
                                        <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                            <i className="ki-filled ki-exit-up text-1.5xl ps-px text-brand"></i>
                                        </div>
                                    </div>
                                </div>
                                <a className="text-base font-semibold text-gray-900 hover:text-primary"
                                    href="/metronic/tailwind/react/demo1/account/members/import-members">
                                    Simplifying Roster Management: Bulk Upload Features
                                </a>
                                <p className="text-sm text-gray-700">
                                    Manage your community efficiently with our bulk member import feature. Find step-by-step instructions, helpful tips, and best practices for a smooth update.
                                </p>
                                <a className="btn btn-link flex-none" href="/metronic/tailwind/react/demo1/account/members/import-members">
                                    Learn more
                                </a>
                            </div>
                            <span className="hidden [&:not(:last-child)]:block [&:not(:last-child)]:border-b border-b-gray-200"></span>
                            <div className="flex flex-col items-start gap-2.5">
                                <div className="mb-2.5">
                                    <div className="relative size-[50px] shrink-0">
                                        <svg className="w-full h-full stroke-brand-clarity fill-brand-light" width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z" fill="">
                                            </path>
                                            <path d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z" stroke="">
                                            </path>
                                        </svg>
                                        <div className="absolute leading-none start-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 rtl:translate-x-2/4">
                                            <i className="ki-filled ki-mouse-circle text-1.5xl ps-px text-brand"></i>
                                        </div>
                                    </div>
                                </div>
                                <a className="text-base font-semibold text-gray-900 hover:text-primary"
                                    href="/metronic/tailwind/react/demo1/account/members/import-members">
                                    Effortless Member Enrollment: Importation and Setup
                                </a>
                                <p className="text-sm text-gray-700">
                                    Initiate a hassle-free member import with our guided tools. Access comprehensive tutorials, insightful advice, and technical documentation for effortless setup.
                                </p>
                                <a className="btn btn-link flex-none"
                                    href="/metronic/tailwind/react/demo1/account/members/import-members">
                                    Learn more
                                </a>
                            </div>
                            <span className="hidden [&:not(:last-child)]:block [&:not(:last-child)]:border-b border-b-gray-200"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProjectBudget