import { useCallback, useEffect, useState } from 'react';
import InfoSection from '../layouts/Info';
import useAxiosInstance from '../hooks/useAxiosInstance';
import { toast } from 'react-toastify';
import { Filters, Pagination } from '../types/components/Pagination';
import { getPaginationRange } from '../helpers/pagination';
import moment from 'moment';
import { Log } from '../types/Log';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineEllipsisVertical, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
const Logs = () => {
    const axiosInstance = useAxiosInstance();
    const [logs, setLogs] = useState<Log []>([]);
    const [pagination, setPagination] = useState<Pagination>({
        current_page: 1,
        total: 0,
        per_page: 15
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        search: '',
        action_type: '',
        model_type: '',
        start_date: '',
        end_date: '',
        page: 1,
        per_page: 15
    });


    const fetchLogs = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/activity-logs', {
                params: filters
            });
            if (response.data.status.code === 200) {
                setLogs(response.data.data.activity_logs.data);
                setPagination({
                    current_page: response.data.data.activity_logs.current_page,
                    total: response.data.data.activity_logs.total,
                    per_page: response.data.data.activity_logs.per_page
                });
            }
        } catch (error) {
            toast.error('Error fetching logs from server. Please try again later.');
            console.error('Error fetching logs:', error);
        }finally {
            setLoading(false);
        }
    },[axiosInstance]);
    
    useEffect(() => {
        fetchLogs();
    }, [filters]);

    const handleFilterChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({
          ...prev,
          [e.target.name]: e.target.value,
          page: 1 // Reset to first page when filters change
        }));
    };

    const getActionColor = (action: number) : string => {
        switch(action) {
            case 1: return 'success';
            case 2: return 'primary';
            case 3: return 'danger';
            default: return 'dark';
        }
    };
    
    const getActionLabel = (action: number) : string => {
        switch(action) {
            case 1: return 'Created';
            case 2: return 'Updated';
            case 3: return 'Deleted';
            default: return 'Unknown';
        }
    };

    const renderValue = (value: any) => {
        if (typeof value === 'object' && value !== null) {
          // Handle special cases for known models
            if (value.id && value.title) {
                return `${value.title} (ID: ${value.id})`;
            }
            if (value.id && value.name) {
                return `${value.name} (ID: ${value.id})`;
            }
            return JSON.stringify(value, null, 2);
        }
        
        // Check if it's a date string
        if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            return moment(value).format('MMM D, YYYY, HH:mm:ss');
        }
        
        return value;
    };
      
    const renderChanges = (changes: Record<string, { before?: any; after?: any }>) => {
        console.log('Chanes', changes);
        return Object.entries(changes).map(([field, change]) => {
            const before = change.before ? renderValue(change.before) : null;
            const after = change.after ? renderValue(change.after) : null;
            return (
                <div key={field} className="mb-2 border-b pb-2 last:border-b-0">
                    <div className="font-medium text-gray-700 mb-1 capitalize">{field.replace(/_/g, ' ')}</div>
                    <div className="flex gap-4">
                        {before && (
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 mb-1">Before</div>
                                    <div className="p-2 bg-red-50 rounded-md text-red-700 line-through">
                                <pre className="whitespace-pre-wrap break-words">{before}</pre>
                                </div>
                            </div>
                        )}
                        {after && (
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 mb-1">After</div>
                                <div className="p-2 bg-green-50 rounded-md text-green-700">
                                    <pre className="whitespace-pre-wrap break-words">{after}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    const generatePaginationItems = () => {
        const { total, per_page, current_page } = pagination;
        const items = [];
        
        if (total === 0) return items;
      
        const { start, end, showStartEllipsis, showEndEllipsis } = getPaginationRange(
            current_page,
            total,
            per_page
        );
      
        // First Page
        items.push(
            <li key={1} className={`btn${current_page === 1 ? ' active' : ''}`}>
                <button type="button" className="btn" onClick={() => setFilters(prev => ({ ...prev, page: 1 }))}>
                    1
                </button>
            </li>
        );
      
        // Start Ellipsis
        if (showStartEllipsis) {
          items.push(
            <li key="start-ellipsis" className="page-item disabled">
                <span className="page-link">
                    <HiOutlineEllipsisVertical />
                </span>
            </li>
          );
        }
      
        // Middle Pages
        for (let i = start; i <= end; i++) {
          if (i === 1) continue; // Skip first page as we already added it
          items.push(
            <button key={i} className={`btn ${current_page === i ? ' active' : ''}`} 
                onClick={() => setFilters(prev => ({ ...prev, page: i }))}>
                {i}
            </button>
          );
        }
      
        // End Ellipsis
        if (showEndEllipsis) {
          items.push(
            <li key="end-ellipsis" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
      
        // Last Page (if different from first)
        const lastPage = Math.ceil(total / per_page);
        if (lastPage > 1) {
          items.push(
            <li key={lastPage} className={`page-item${current_page === lastPage ? ' active' : ''}`}>
              <button className="page-link" onClick={() => setFilters(prev => ({ ...prev, page: lastPage }))}>
                {lastPage}
              </button>
            </li>
          );
        }
      
        return items;
    };

    const formatModel = (model: any) => {
        if (!model) return 'N/A';
        
        // Custom formatting for known models
        switch (model.model_type) { // Use the actual field name from your API
            case 'App\\Models\\Vacation':
                return `Vacation: ${model.title} (ID: ${model.id})`;
            case 'App\\Models\\User':
                return `User: ${model.name} (ID: ${model.id})`;
            default:
                return `${model.model_type} #${model.id}`;
        }
    };

    return (
        <>
            <div className='container-fixed'>
                <InfoSection
                    title="Activity"
                    description="View all your activity on the platform"
                />
            </div>
            <div className="container-fixed">
                <div className="card card-grid min-w-full">
                    <div className="card-header border-0 pt-6">
                        <div className="card-title">
                            <div className="d-flex align-items-center relative">
                                <HiOutlineMagnifyingGlass className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3" />
                                <input
                                    type="text"
                                    name="search"
                                    className="input input-sm !ps-8"
                                    placeholder="Search logs..."
                                    onChange={handleFilterChange}
                                    value={filters.search}
                                />
                            </div>
                        </div>

                        <div className="card-toolbar">
                            <div className="flex justify-end" data-kt-user-table-toolbar="base">
                                <select
                                    title="filter-by-action-type"
                                    name="action_type"
                                    className="select select-sm me-3 !min-w-36"
                                    onChange={handleFilterChange}
                                    value={filters.action_type}
                                >
                                    <option value="">All Actions</option>
                                    <option value={1}>Created</option>
                                    <option value={2}>Updated</option>
                                    <option value={3}>Deleted</option>
                                </select>

                                <input
                                    title="filter-by-start-date"
                                    type="date"
                                    name="start_date"
                                    className="input input-sm me-3"
                                    onChange={handleFilterChange}
                                    value={filters.start_date}
                                />
                                <input
                                    title="filter-by-end-date"
                                    type="date"
                                    name="end_date"
                                    className="input input-sm"
                                    onChange={handleFilterChange}
                                    value={filters.end_date}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        { loading ? (
                        <div className="text-center py-10">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                        ) : (
                            <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                                <div className="scrollable-x-auto">
                                    <table className="table table-auto table-border" data-datatable-table="true">
                                        <thead>
                                        <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                            <th className="min-w-100px">Action</th>
                                            <th className="min-w-150px">Description</th>
                                            <th className="min-w-120px">User</th>
                                            {/* <th className="min-w-120px">Model</th> */}
                                            <th className="min-w-150px">Changes</th>
                                            <th className="min-w-100px">IP Address</th>
                                            <th className="min-w-100px">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="fw-semibold text-gray-600">
                                        {logs.map(log => (
                                            <tr key={log.id}>
                                                <td>
                                                <span className={`badge badge-light-${getActionColor(log.action_type)}`}>
                                                    {getActionLabel(log.action_type)}
                                                </span>
                                                </td>
                                                <td>{log.description}</td>
                                                <td>{log.user.full_name}</td>
                                                {/* <td>{log.model}</td> */}
                                                {/* <td>{log.model ? formatModel(log.model) : 'N/A'}</td> */}
                                                <td className="min-w-[300px] max-w-[500px]">
                                                    <div className="max-h-[100px] overflow-y-auto">
                                                        {renderChanges(log.changes)}
                                                    </div>
                                                </td>                                            
                                                <td>{log.ip_address}</td>
                                                <td>{moment(log.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">

                        {/* Pagination */}
                            <div className="flex items-center gap-2 order-2 md:order-1">
                                Show
                                
                                <select
                                    title="filter-by-per-page"
                                    name="per_page"
                                    className="select select-sm !w-16"
                                    onChange={handleFilterChange}
                                    value={filters.per_page}
                                >
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                                <p className="text-nowrap">per page</p>
                            </div>
                            <div className="flex items-center gap-4 order-1 md:order-2">
                                <ul className="pagination">
                                    <span className="text-muted me-3">
                                        {((filters.page - 1) * filters.per_page) + 1} to{' '}
                                        {Math.min(filters.page * filters.per_page, pagination.total)} of {pagination.total }
                                    </span>
                                    <li className={`page-item previous${filters.page === 1 ? ' disabled' : ''}`}>
                                        <button
                                            title="previous-page"
                                            type="button"
                                            className={`btn ${filters.page === 1 ? 'disabled' : ''}`}
                                            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                        >
                                            <HiOutlineChevronLeft className="rtl:transform rtl:rotate-180" />
                                        </button>
                                    </li>
                                    {generatePaginationItems()}
                                    <li className={`page-item next${filters.page * filters.per_page >= pagination.total ? ' disabled' : ''}`}>
                                        <button
                                            title="next-page"
                                            type="button"
                                            className={`btn ${filters.page * filters.per_page >= pagination.total ? 'disabled' : ''}`}
                                            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                            
                                        >
                                            <HiOutlineChevronRight className="rtl:transform rtl:rotate-180" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Logs;