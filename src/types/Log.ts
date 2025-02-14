import { User } from "./User";

export interface Log {
    id: string;
    action_type: number;
    description: string;
    user: User;
    model: string;
    changes: Record<string, { before?: any; after?: any }>;
    ip_address: string;
    created_at: string;
}


export const statusMap: Record<number, string> = {
    0: 'Rejected',
    1: 'Pending',
    2: 'Approved'
};
  