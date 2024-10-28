import { Member } from "./Member";

export interface Task {
    id?: string;
    title: string;
    description: string;
    assignedTo: Member,
    status: string;
    priority: string;
    dueDate: string;
    createdDate?: string;
    updatedDate?: string;
}