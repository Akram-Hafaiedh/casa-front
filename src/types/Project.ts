import { ProjectStatus } from "./ProjectStatus";
import { Task } from "./Task";
import { User } from "./User";

export interface Project {
    id: number;
    logo_url: string | null;
    name: string;
    budget: number;
    budget_usage: number;
    description: string;
    budget_description: string;
    due_date: string;
    status: ProjectStatus;
    created_at: string;
    updated_at: string;
    allow_usage: number;
    allow_changes: number;
    type:string;
    members?: User[];
    tasks?: Task[];
}