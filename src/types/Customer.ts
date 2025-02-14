import { Tax } from './Tax';
import { Insurance } from './Insurance';
import { Accounting } from './Accounting';
export interface Customer {
    id?: number;
    first_name: string;
    last_name: string;
    companyName: string;
    full_name:string;
    birthday: string;
    gender: string;
    phone: string;
    address: string;
    postal_code: number;
    city: string;
    email: string;
    id_passport: string;
    accountings: Accounting[];
    insurances: Insurance[];
    taxes: Tax[];
    created_at?: string;
    updated_at?: string;
    files? : string [];
}

