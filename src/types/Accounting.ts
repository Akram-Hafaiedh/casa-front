export interface Accounting {
    contract_start_date: Date;
    tax_included: number;
    status: string;
    documents : object | null;
}