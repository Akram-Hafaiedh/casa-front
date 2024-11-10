import { User } from "./User";

export interface Contract {
    id?: string;
    type: string;
    start_date: Date;
    end_date: Date;
    status: string;
    user_id: string;
    user?: User;
}