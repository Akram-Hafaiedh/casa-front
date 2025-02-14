import { Portfolio } from "./Portfolio";

export interface Client {
    id?: number;
    first_name: string;
    last_name: string;
    full_name:string;
    email: string;
    birthday: string;
    gender?: string;
    phone: string;
    address: string;
    postal_code: number;
    city: string;
    id_passport: string;
    portfolio: Portfolio;
}