import { useState } from "react";
import ProjectSettingsContent from "./components/ProjectSettingsContent";
import { Project } from "../../types/Project";
import { useOutletContext } from "react-router-dom";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import ProjectTypes from "./components/ProjectTypeContent";


const ProjectSettings = () => {
    const axiosInstance = useAxiosInstance();
    const { project, updateProject } = useOutletContext<{ project: Project, updateProject(p:Project): void }>();
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [selectedType, setSelectedType] = useState(project.type);
    const [projectImage, setProjectImage] = useState<File | null>(null);
    const [endDate, setEndDate] = useState(project.due_date);
    const [loading, setLoading] = useState(false);

    const handleEditProjectSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('due_date', endDate);
        data.append('type', selectedType);
        if (projectImage) {
            data.append('project_image', projectImage);
        }
        console.log(data);
        try {
            const response = await axiosInstance.post(`/projects/${project.id}/settings`, data);
            if (response.data.status.code === 200) {
                toast.success(response.data.status.message);
                const updatedProject = response.data.data.project;
                updateProject(updatedProject);
            } 
            if (response.data.status.code === 400) {
                Object.keys(response.data.errors).forEach((key) => {
                    response.data.errors[key].forEach((error: string) => {
                        toast.error(`${error}`);
                    });
                });
            }
        } catch (error) {
            toast.error('Failed to create task please try again later');
            console.error('Error creating task:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleEditProjectSettings}>
            <div className="flex items-center justify-center font-semibold text-gray-900">
                <ProjectTypes 
                    selectedType={selectedType}
                    setSelectedType={setSelectedType} 
                />
            </div>
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
            <div className="flex justify-end">
                <button 
                    type="submit" 
                    className="btn btn-primary mt-4"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default ProjectSettings;

