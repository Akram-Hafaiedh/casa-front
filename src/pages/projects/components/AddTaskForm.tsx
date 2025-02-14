// AddTaskForm.tsx
import { useState, useEffect } from 'react';
import { TaskPriority, TaskStatus } from '../../../types/Task';
import { User } from '../../../types/User';

type FormData = {
    title: string;
    description: string;
    priority_id: number;
    status_id: number;
    start_date: string;
    due_date: string;
    assigned_to: number | null;
};
  

type AddTaskFormProps = {
    initialData: {
        title: string;
        description: string;
        priorityId: number;
        statusId: number;
        startDate: string;
        dueDate: string;
        assignedToUserId: number | null;
    };
    onSubmit: (data: FormData) => void;
    onClose: () => void;
    priorities: TaskPriority[];
    statuses: TaskStatus[];
    members: User[] | undefined;
};

const AddTaskForm = ({ 
  initialData,
  onSubmit,
  onClose,
  priorities,
  statuses,
  members
}: AddTaskFormProps) => {
  // Local state for form fields
  const [taskTitle, setTaskTitle] = useState(initialData.title);
  const [taskDescription, setTaskDescription] = useState(initialData.description);
  const [priorityId, setPriorityId] = useState(initialData.priorityId);
  const [statusId, setStatusId] = useState(initialData.statusId);
  const [startDate, setStartDate] = useState(initialData.startDate);
  const [dueDate, setDueDate] = useState(initialData.dueDate);
  const [assignedToUserId, setAssignedToUserId] = useState(initialData.assignedToUserId);

  // Update local state when initialData changes
  useEffect(() => {
    setTaskTitle(initialData.title);
    setTaskDescription(initialData.description);
    setPriorityId(initialData.priorityId);
    setStatusId(initialData.statusId);
    setStartDate(initialData.startDate);
    setDueDate(initialData.dueDate);
    setAssignedToUserId(initialData.assignedToUserId);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
        title: taskTitle,
        description: taskDescription,
        priority_id: priorityId,
        status_id: statusId,
        start_date: startDate,
        due_date: dueDate,
        assigned_to: assignedToUserId
    });
  };

  return (
        <form onSubmit={handleSubmit}>
            <div className="modal-body my-5">
                <div className="grid gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-gray-900 font-semibold text-2sm required">
                            Task Title
                        </label>
                        <input
                            value={taskTitle}
                            className="input"
                            type="text"
                            onChange={(e) => setTaskTitle(e.target.value)} 
                            placeholder="Enter task name"
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-gray-900 font-semibold text-2sm">
                            Task Description
                        </label>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="textarea"
                            placeholder="Enter task description"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2.5">

                        <div className="flex flex-col gap-2.5 flex-1">
                            <label className="text-gray-900 font-semibold text-2sm required">
                                Priority
                            </label>
                            <select
                                value={priorityId}
                                onChange={(e) => setPriorityId(Number(e.target.value))}
                                className="select"
                                title="task priority"
                            >
                                {priorities.map((priority) => (
                                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2.5 flex-1">
                            <label className="text-gray-900 font-semibold text-2sm required">
                                Status
                            </label>
                            <select
                                value={statusId}
                                onChange={(e) => setStatusId(Number(e.target.value))}
                                className="select"
                                title="task status"
                            >
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>{status.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2.5">
                        <div className="flex flex-col gap-2.5 flex-1">
                            <label className="text-gray-900 font-semibold text-2sm required">
                                Start Date
                            </label>
                            <input
                                value={startDate}
                                title="start date"
                                name="start_date"
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="flex flex-col gap-2.5 flex-1">
                            <label className="text-gray-900 font-semibold text-2sm required">
                                Due Date
                            </label>
                            <input
                                value={dueDate}
                                title="due date"
                                name="due_date"
                                type="date"
                                onChange={(e) => setDueDate(e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-gray-900 font-semibold text-2sm">
                            Assign to
                        </label>
                        <select
                            title="assigned to"
                            value={assignedToUserId || ''}
                            onChange={(e) => setAssignedToUserId(parseInt(e.target.value))}
                            className="input h-24"
                        >
                            {members?.map((member) => (
                                <option key={member.id} value={member.id}>{member.first_name} {member.last_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="modal-footer !justify-end">
                <div className="flex gap-4">
                    <button 
                        type="button"
                        onClick={onClose} className="btn btn-light btn-sm">
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
     );
};

export default AddTaskForm;