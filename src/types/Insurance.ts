export interface Insurance {
    type: string;
    agency: string;
    policy_number: string;
    inception_date: Date;
    expiration_date: Date;
    status: string;
    cancellation_period: number;
    payment_amount: number;
    payment_frequency: string;
}