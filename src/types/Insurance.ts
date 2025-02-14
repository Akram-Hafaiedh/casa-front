export interface Insurance {
    id?: number;
    type: string;
    agency: string;
    policy_number: number;
    inception_date: Date;
    expiration_date: Date;
    status: number;
    cancellation_period: number;
    payment_amount: number;
    payment_frequency: string;
    customer_id?: string;
}


export const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' },
    { value: 3, label: 'Pending' },
    { value: 4, label: 'Cancelled' },
    { value: 5, label: 'Rejected' },
    { value: 6, label: 'Suspended' },
    { value: 7, label: 'Expired' },
];