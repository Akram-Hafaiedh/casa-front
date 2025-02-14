import { Project } from "./Project";
import { Task } from "./Task";
import { User } from "./User";

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    author: User;
    project?: Project;
    task?: Task;
}