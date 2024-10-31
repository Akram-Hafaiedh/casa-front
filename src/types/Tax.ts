export interface Tax {
    name: string;
    percentage: number;
    type: string;
    documents: object | null;
}