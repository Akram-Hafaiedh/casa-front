export interface Accounting {
    start_date: Date;
    tax_included: number;
    status: string;
    documents : object | null;
}