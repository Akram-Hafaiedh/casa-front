export interface Pagination {
    current_page: number;
    total: number;
    per_page: number;
}

export interface PaginationRange {
    start: number;
    end: number;
    showStartEllipsis: boolean;
    showEndEllipsis: boolean;
}

export interface Filters {
    search: string;
    action_type: string;
    model_type: string;
    start_date: string;
    end_date: string;
    page: number;
    per_page: number;
}