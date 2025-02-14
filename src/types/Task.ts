import { Comment } from "./Comment";

export interface Task {
    id?: number;
    title: string;
    description: string;
    // status: number;
    // priority: number;
    priority: TaskPriority;
    status: TaskStatus;
    due_date: string;
    start_date: string;
    links_count?: number;
    assigned_to: {id : number, name : string, avatar: string},
    comments: Comment[];
    comments_count: number;
    created_at?: string;
    updated_at?: string;
}


export interface TaskStatus {
    id: number;
    name: string;
}

export interface TaskPriority {
    id: number;
    name: string;
}
