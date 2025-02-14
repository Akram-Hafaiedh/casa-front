import { useCallback, useEffect, useMemo, useState } from "react";
import { HiMiniEllipsisVertical, HiMiniSquaresPlus, HiOutlineChatBubbleBottomCenterText, HiOutlineLink, HiOutlineSquaresPlus, HiOutlineTrash } from "react-icons/hi2";
import { Task, TaskPriority, TaskStatus } from "../../types/Task";
import { useOutletContext, useParams } from "react-router-dom";
import useAxiosInstance from '../../hooks/useAxiosInstance';
import Loader from "../../components/Loader";
import TaskCard from "../../components/TaskCard";
import AddTaskCard from "./components/AddTaskCard";
import { useModal } from "../../hooks/useModal";
import { toast } from "react-toastify";
import { Project } from "../../types/Project";
import moment from "moment";
import AddTaskForm from "./components/AddTaskForm";
import { CiImageOn } from "react-icons/ci";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import CommentSection from "./components/CommentSection";


type TaskFormData = {
    title: string;
    description: string;
    priority_id: number;
    status_id: number;
    start_date: string;
    due_date: string;
    assigned_to: number | null;
};
const ProjectTasks: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const { project } = useOutletContext<{ project: Project }>()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]); 
    const [taskPriorities, setPriorities] = useState<TaskPriority[]>([]);
    const { openModal, closeModal } = useModal();
    const { projectId } = useParams();
    const [editedTask, setEditedTask] = useState<Task | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priorityId: 1,
        statusId: 1,
        startDate: moment().format('YYYY-MM-DD'),
        dueDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        assignedToUserId: null
    });
    
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/projects/${projectId}/tasks`);
            if (response.data.status.code === 200) {
                setTasks(response.data.data.tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }finally {
            setLoading(false);
        }
    }, [axiosInstance, projectId]);

    const fetchProjectTaskStatuses = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/projects/${projectId}/task-statuses`);
            if (response.data.status.code === 200) {
                const statusOptions = response.data.data.task_statuses;
                setTaskStatuses(statusOptions);
            }
        } catch (error) {
            console.error('Error fetching project statuses:', error);
        }
    }, [axiosInstance, projectId]);

    const fetchProjectTaskPriorities = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/projects/${projectId}/task-priorities`);
            if (response.data.status.code === 200) {
                const priorityOptions = response.data.data.task_priorities;
                setPriorities(priorityOptions);
            }
        } catch (error) {
            console.error('Error fetching project priorities:', error);
        }
    }, [axiosInstance, projectId]);

    const filterTasksByStatus = (statusName: string) => {
        return tasks.filter((task) => task.status.name === statusName);
    };
    useEffect(() => {
        fetchTasks();
        fetchProjectTaskStatuses();
        fetchProjectTaskPriorities();
    },[]);

    const handleSubmitTask = async (data : TaskFormData) =>{
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/projects/${projectId}/tasks`, data);
            if (response.data.status.code === 201) {
                toast.success(response.data.status.message);
                setTasks([...tasks, response.data.data.task]);
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
            closeModal();
        }
    }

    const handleDeleteTask = async (taskId: number) =>{
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}`);
            if (response.data.status.code === 204) {
                toast.success(response.data.status.message);
                setTasks(tasks.filter((task) => task.id !== taskId));
            }
        } catch (error) {
            toast.error('Failed to delete task please try again later');
            console.error('Error creating task:', error);
        } finally {
            setLoading(false);
        }
    }


    const handleConfirmDelete = (taskId: number) => {
        openModal({
            title: 'Confirm Deletion',
            size: 'sm',
            content: ()=>(
                <>
                    <div className="modal-body my-5">
                        <p className="text-gray-700">Are you sure you want to delete this task?</p>
                    </div>
                    <div className="modal-footer !justify-end gap-2">
                        <button
                            type="button"
                            title="cancel-delete"
                            onClick={closeModal}
                            className="btn btn-light btn-sm"
                        >
                        Cancel
                        </button>
                        <button
                            onClick={async () => {
                                await handleDeleteTask(taskId);
                                closeModal();
                            }}
                            className="btn btn-danger btn-sm"
                            >
                            Delete
                        </button>
                    </div>
                </>
            )
        });
    };


    const handleUpdateTask = async (taskId: number, data: TaskFormData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/projects/${projectId}/tasks/${taskId}`, data);
            if (response.data.status.code === 200) {
                const updatedTask = response.data.data.task;
                const updatedTasks = tasks.map((task) =>
                    task.id === taskId? updatedTask : task
                );
                setTasks(updatedTasks);
                toast.success(response.data.status.message);
            }
        } catch (error) {
            toast.error('Failed to update task please try again later');
            console.error('Error updating task:', error);
        } finally {
            setLoading(false);
            closeModal();
        }
    }

    const handleAddComment = async (taskId: number, content: string) =>
    {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/projects/${projectId}/tasks/${taskId}/comments`, {content});
            if (response.data.status.code === 201) {
                const newComment = response.data.data.comment;
                setTasks(prevTasks => prevTasks.map(task => 
                    task.id === taskId ? { 
                        ...task, 
                        comments: [...(task.comments || []), newComment], 
                        comments_count: (task.comments_count || 0) + 1,
                        updated_at: new Date().toISOString() 
                    } : task
                ));
                toast.success(response.data.status.message);
            }
        } catch (error) {
            toast.error('Failed to add comment to task please try again later');
            console.error('Error adding comment:', error);
        } finally {
            setLoading(false);
        }
    }
    const handleDeleteComment = async (taskId: number, commentId: number) =>
    {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}/comments/${commentId}`);
            if (response.data.status.code === 204) {
                setTasks(prevTasks => prevTasks.map(task =>
                    task.id === taskId ? {...task, comments: task.comments.filter(comment => comment.id!== commentId), comments_count: task.comments_count - 1 } : task
                ));
                toast.success(response.data.status.message);
            }
        } catch (error) {
            toast.error('Failed to delete comment from task please try again later');
            console.error('Error deleting comment:', error);
        } finally {
            setLoading(false);
        }
    }
    const handleEditComment = async ( taskId: number, commentId: number, content: string) =>
    {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, {content});
            if (response.data.status.code === 200) {
                const updatedComment = response.data.data.comment;
                setTasks(prevTasks => prevTasks.map(task => 
                    task.id === taskId ? { ...task, comments: task.comments.map(comment => comment.id === commentId ? updatedComment : comment) } : task
                ));
                toast.success(response.data.status.message);
            }
        } catch (error) {
            toast.error('Failed to edit comment from task please try again later');
            console.error('Error editing comment:', error);
        } finally {
            setLoading(false);
        }
    }
    
    const handleEditTask = (task: Task) => {
        const EditTaskModalContent = () => {
            const [selectedTab, setSelectedTab] = useState(0);
            const currentTask = useMemo(() => tasks.find(t => t.id === task.id), [tasks, task.id])!;
            return (
                <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <TabList className="flex flex-col md:flex-row">
                        <Tab className={({ selected }) => `px-4 py-2 ${selected ? 'border-b-2 border-blue-500' : ''}`}>
                            Details
                        </Tab>
                        <Tab className={({ selected }) => `px-4 py-2 ${selected ? 'border-b-2 border-blue-500' : ''}`}>
                            Comments ({currentTask.comments_count})
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-5">
                        <TabPanel>
                            <AddTaskForm
                                initialData={{
                                    title: currentTask.title,
                                    description: currentTask.description,
                                    priorityId: currentTask.priority.id,
                                    statusId: currentTask.status.id,
                                    startDate: currentTask.start_date,
                                    dueDate: currentTask.due_date,
                                    assignedToUserId: currentTask.assigned_to?.id || null
                                }}
                                onSubmit={(data) => handleUpdateTask(currentTask.id!, data)}
                                onClose={closeModal}
                                priorities={taskPriorities}
                                statuses={taskStatuses}
                                members={project.members}
                            />
                        </TabPanel>
                        <TabPanel>
                            <CommentSection 
                                comments={currentTask.comments}
                                onSubmit={(content) => handleAddComment(currentTask.id!, content)}
                                onDelete={(commentId) => handleDeleteComment(currentTask.id!, commentId)}
                                onEdit={(commentId, comment) => handleEditComment(currentTask.id!, commentId, comment)}
                            />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            );
        };
    
        openModal({
            title: 'Edit Task',
            size: 'lg',
            content: () => (<EditTaskModalContent key={`${task.id}-${task.updated_at}`} />)
        });
    };


    const handleOpenAddTaskModal = useCallback(() => {
        const AddTaskModalContent = () => (
            <AddTaskForm
                initialData={formData}
                onSubmit={(data) => {
                    handleSubmitTask(data);
                    setFormData({
                        title: '',
                        description: '',
                        priorityId: 1,
                        statusId: 1,
                        startDate: moment().format('YYYY-MM-DD'),
                        dueDate: moment().add(1, 'day').format('YYYY-MM-DD'),
                        assignedToUserId: null
                    });
                }}
                onClose={closeModal}
                priorities={taskPriorities}
                statuses={taskStatuses}
                members={project.members}
            />
        );
        openModal({
            title: 'Add Task to Project' + ' ' + project.name,
            size: 'lg',
            content: () =>(<AddTaskModalContent />)
        });
    }, [openModal,closeModal, project, formData, taskPriorities, taskStatuses]);

    if (loading) {
        return <Loader isLoading={loading} />
    }
    return (
        <div className="flex overflow-x-auto pb-2 md:grid md:overflow-x-scroll gap-x-4"
            style={{
                gridTemplateColumns: `repeat(${taskStatuses.length}, minmax(400px, 1fr))`
            }}>
            {taskStatuses.map((status) => {
                const filteredTasks = filterTasksByStatus(status.name);
                return (
                <div key={status.id} className="card grow min-w-[400px] flex-shrink-0">
                    <div className="card-header">
                        <h3 className="card-title">
                            {status.name}
                            <span className="text-gray-400 text-md ms-2">
                                {filteredTasks.length}
                            </span>
                        </h3>
                        <button title="createNewStatus" t
                            type="button" className="btn btn-light btn-sm">
                            <HiOutlineSquaresPlus />
                        </button>
                    </div>
                    <div className="card-body lg:pb-7.5">
                        <div className="grid gap-5">
                            {filteredTasks.map((task) => (
                                <TaskCard 
                                    key={task.id} 
                                    task={task}
                                    onDelete={(taskId) => handleConfirmDelete(taskId)}
                                    onEdit={(task: Task) => handleEditTask(task)}
                                    // onOpenTaskCommentsModal={() => handleOpenTaskCommentsModal(task)}
                                />
                            ))}
                            <AddTaskCard onClick={handleOpenAddTaskModal}/>
                        </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default ProjectTasks;