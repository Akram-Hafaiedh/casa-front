import { Accounting } from "./Accounting";
import { Insurance } from "./Insurance";
import { Tax } from "./Tax";

export interface Portfolio {
    insurances : Insurance[],
    acccounting: Accounting[],
    Taxes: Tax[],
}