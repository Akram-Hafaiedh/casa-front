import { Tax } from './Tax';
import { Insurance } from './Insurance';
import { Accounting } from './Accounting';
export interface Customer {
    id?: string;
    firstName: string;
    lastName: string;
    companyName: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    idOrPassport: string;
    accounting: Accounting;
    insurances: Insurance[];
    taxes: Tax;
}
