import { useRef, useState } from "react";
import { HiCamera, HiOutlineXMark } from "react-icons/hi2";

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

const ProjectSettingsContent: React.FC<ProjectSettingsProps> = ({
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
                                className="btn btn-icon btn-icon-xs btn-light shadow-sm absolute z-1 size-5! -top-0.5 -end-0.5 rounded-full"
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

export default ProjectSettingsContent;