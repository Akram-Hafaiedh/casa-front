import { Task } from "./Task";

export interface Project {
    id: string;
    name: string;
    owner: string;
    description: string;
    tasks: Task[];
    startDate: string;
    endDate: string;
    createdDate: string;
    updatedDate: string;
}