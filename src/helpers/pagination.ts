import { PaginationRange } from "../types/components/Pagination";

export const getPaginationRange = (
    currentPage: number,
    totalItems: number,
    itemsPerPage: number,
    maxVisiblePages = 5
    ): PaginationRange => {
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const end = Math.min(totalPages, start + maxVisiblePages - 1);
  
        // Adjust if we're at the end
        if (end - start < maxVisiblePages - 1) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }
  
    return {
        start,
        end,
        showStartEllipsis: start > 2,
        showEndEllipsis: end < totalPages - 1
    };
};
