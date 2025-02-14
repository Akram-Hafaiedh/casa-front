export interface Tax {
    id?: number;
    name: string;
    value: number;
    type: string;
    documents: object | null;
    updated_at?: Date;
    created_at?: Date;
}

