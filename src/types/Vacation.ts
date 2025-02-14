import { User } from "./User";

export interface Vacation {
    id: number;
    description?: string;
    title: string;
    start: string;
    end: string;
    user_id: string;
    status?: number;
    user?:User;
    created_at?: string;
}