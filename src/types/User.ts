import { ApplicationFile } from "./ApplicationFile";
import { Contract } from "./Contract";
import { Customer } from "./Customer";
import { Project } from "./Project";
import { Role } from "./Role";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    logo_url: string | null;
    email: string;
    birthday: string;
    id_passport: string;
    address: string;
    city: string;
    postal_code: string;
    ahv_number: string;
    documents: { [key: string]: string } | null;
    phone: string;
    roles: Role[];
    contract?:Contract;
    projects: Project[];
    clients: Customer[];
    files?: {
        copy_id: ApplicationFile[];
        contracts: ApplicationFile[];
        payrolls: ApplicationFile[];
        logs: ApplicationFile[];
    };
    created_at: Date;
    updated_at: Date;
}