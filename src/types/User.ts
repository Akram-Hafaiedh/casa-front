import { Contract } from "./Contract";
import { Role } from "./Role";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    id_passport: string;
    address: string;
    city: string;
    postal_code: string;
    ahv_number: string;
    documents: { [key: string]: string } | null;
    phone: string;
    role: Role;
    contract?:Contract;
}