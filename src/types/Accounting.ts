export interface Accounting {
    id?: string;
    start_date: Date;
    tax_included: number;
    status: number;
    documents? : object | null;
    customer_id?: string;
}