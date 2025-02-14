import { HiUserCircle } from "react-icons/hi2";
import { MdSupervisedUserCircle } from "react-icons/md";

interface ProjectTypesProps{
    selectedType : string;
    setSelectedType: (type: string) => void;
}

const ProjectTypes: React.FC <ProjectTypesProps> = ({selectedType, setSelectedType}) => {
    return (
        <div className="mt-4 space-x-2 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5 min-w-[500px]">
            <label htmlFor="personnal" className="flex align-stretch cursor-pointer bg-center h-44 bg-no-repeat border border-gray-300 rounded-xl border-dashed has-[:checked]:border-primary bg-[length:500px] bg-[url('/images/2600x1600/bg-2.png')] sso-active singl-sign-on-bg has-[:checked]:bg-[url('/images/2600x1600/bg-1.png')]">
                <div className="flex flex-col place-items-center place-content-center rounded-xl grow">
                    <div className="flex items-center h-11">
                        {/* <img src="/images/brand-logos/azure.svg" className="w-5" alt="" /> */}
                        <HiUserCircle className='size-9' />
                    </div>
                    <span className="text-md font-medium text-gray-900">
                        Personnal Project
                    </span>
                    <input 
                        className="appearance-none"
                        type="radio"
                        name="type"
                        id="personnal"
                        onChange={() => setSelectedType('personnal')}
                        checked={selectedType === 'personnal'}
                        value="personnal" 
                    />
                </div>
            </label>
            <label htmlFor="team" className="flex align-stretch cursor-pointer bg-center h-44 bg-no-repeat border border-gray-300 rounded-xl border-dashed has-[:checked]:border-primary bg-[length:500px] bg-[url('/images/2600x1600/bg-2.png')] sso-active singl-sign-on-bg has-[:checked]:bg-[url('/images/2600x1600/bg-1.png')]">
                <div className="flex flex-col place-items-center place-content-center rounded-xl grow">
                    <div className="flex items-center h-11">
                        {/* <img src="/images/brand-logos/google.svg" className="w-8" alt="" /> */}
                        <MdSupervisedUserCircle className='size-9 ' />
                    </div>
                    <span className="text-md font-medium text-gray-900">
                        Team Project
                    </span>
                    <input 
                        className="appearance-none"
                        type="radio"
                        name="type"
                        id="team"
                        value="team"
                        checked={selectedType === 'team'}
                        onChange={() => setSelectedType('team')}
                    />
                </div>
            </label>
        </div>
    )
}

export default ProjectTypes;