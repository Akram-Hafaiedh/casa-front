import { User } from "./User";

export interface Vacation {
    id: string;
    description?: string;
    title: string;
    start: string;
    end: string;
    userId?: string;
    status?: string;
    user?:User;
}