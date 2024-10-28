export interface Insurance {
    type: string;
    agency: string;
    insuranceNumber: string;
    startDate: Date;
    endDate: Date;
    cancellationPeriod: number;
    amountToPay: number;
    paymentFrequency: string;
}