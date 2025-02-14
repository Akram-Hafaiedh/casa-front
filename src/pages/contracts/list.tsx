import { useCallback, useEffect, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import moment from "moment";
import { Contract } from "../../types/Contract";
import InfoSection from "../../layouts/Info";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineMagnifyingGlass, HiOutlinePencilSquare, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";

const Contracts: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const [searchQuery, setSearchQuery] = useState('');
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); 
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);

    const fetchContracts = useCallback( async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get(`/contracts`, {
                params: { page, limit, search }
            });
            console.log(response.data)
            setContracts(response.data.data.contracts.data);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.log('Error fetching contracts', error);
        }
    }, [axiosInstance]);
    
    
    useEffect(() => {
        fetchContracts(currentPage, itemsPerPage, searchQuery);
        setLoading(false);
    }, [currentPage, itemsPerPage, searchQuery]);

    const handleDeleteContract = async (contractId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(`/users/${contractId}`);
                    if (response.data.status.code === 200) {
                        const updatedContracts = contracts.filter((contract) => contract.id !== contractId);
                        setContracts(updatedContracts);
                        toast.success(response.data.status.message);
                    }
                    else {
                        toast.error(response.data.status.message);
                    }
                } catch (error) {
                    console.log('Error deleting contract:', error);
                }
            }
        })
    }

    const contractTypeOptions = [
        { value: 'permanent', label: 'Permanent Employment' },
        { value: 'fixed-term', label: 'Fixed Term Employment' },
        { value: 'part-time', label: 'Part-Time Employment' },
        { value: 'mini-job', label: 'Mini-Job Employment' },
        { value: 'intern', label: 'Internship' },
        { value: 'freelance', label: 'Freelancer' },
        { value: 'work-services', label: 'Work & Services' },
        { value: 'training', label: 'Training' },
    ];

    const getContractTypeLabel = (value: string) => {
        const option = contractTypeOptions.find(option => option.value === value);
        return option ? option.label : value;
    };
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchContracts(currentPage, itemsPerPage, query);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchContracts(page, itemsPerPage, searchQuery);
    };
    
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="container-fixed">
                <InfoSection
                    title="List Contracts"
                    description="Manage your contracts here."
                    actions={[
                        {
                            type: 'link',
                            text: 'Create Contract',
                            to: '/contracts/create',
                            icon: <HiOutlinePlus />,
                            iconPosition: 'start'
                        },
                    ]}
                />
            </div>
            <div className="container-fixed">
                <div className="card card-grid min-w-full">
                    <div className="card-header">
                        <div className="flex gap-6 justify-between w-full">
                            <div className="relative">
                                <HiOutlineMagnifyingGlass className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3" />
                                <input
                                    type="text"
                                    placeholder="Search contracts..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="input input-sm !ps-8"
                                />
                            </div>
                            <label className="switch switch-sm">
                                <input className="order-2" name="check" type="checkbox" value="1" />
                                <span className="switch-label order-1">
                                    Active Contracts
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                            <div className="scrollable-x-auto min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
                                <table className="table table-auto table-border md:table-fixed lg:table-responsive" data-datatable-table="true">
                                    <thead>
                                        <tr>
                                            <th className="w-[60px] text-center">
                                                <input className="checkbox checkbox-sm"
                                                    data-datatable-check="true"
                                                    type="checkbox"
                                                    title="Select all"
                                                />
                                            </th>
                                            <th className="min-w-[175px]">Type</th>
                                            <th className="w-[225px]">Start Date</th>
                                            <th className="w-[225px]">End Date</th>
                                            <th className="w-[225px]">Employee</th>
                                            <th className="w-[150px]">Status</th>
                                            <th className="w-[60px]"></th>
                                            <th className="w-[60px]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contracts.length > 0 ? (contracts.map((contract:Contract) => (
                                            <tr key={contract.id} className="hover:bg-gray-100">
                                                <td className="text-center">
                                                    <input 
                                                        className="checkbox checkbox-sm"
                                                        data-datatable-row-check="true"
                                                        type="checkbox"
                                                        value="1"
                                                        title="Select"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-800 border">{getContractTypeLabel(contract.type)}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800 border">{moment(contract.start_date).format('YYYY-MM-DD')}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800 border">{contract.end_date ? moment(contract.end_date).format('YYYY-MM-DD') : 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800 border">{contract.user?.first_name + ' ' + contract.user?.last_name}</td>
                                                <td>
                                                    <span className={`badge badge-pill ${(() => {
                                                        if (contract.status === 'active') return 'badge-outline badge-success';
                                                        if (contract.status === 'pending') return 'badge-outline badge-warning';
                                                        return 'badge-outline badge-danger';
                                                    })()} gap-1 items-center`}>
                                                        {contract.status }    
                                                    </span>
                                                </td>
                                                
                                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                                    <div className="flex justify-end space-x-1">
                                                        <Link to={`/contracts/${contract.id}/edit`}
                                                            title="Show User"
                                                            type="button" 
                                                            className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded"
                                                        >
                                                            <HiOutlinePencilSquare className="size-4 " />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                                
                                                    <button 
                                                        title="Delete User"
                                                        type="button" 
                                                        className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded"
                                                        onClick={() => contract.id && handleDeleteContract(contract.id)}
                                                    >
                                                        <HiOutlineTrash className="size-4 " />
                                                    </button>
                                                </td>

                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={8} className="py-2 text-center">
                                                    <div className="flex items-center flex-col justify-center h-full">
                                                        <img
                                                            src="/images/illustrations/6.svg"
                                                            alt="No contracts"
                                                            className="max-w-full h-52 object-contain mx-auto"
                                                        />
                                                        <h4 className="text-gray-800 font-bold mt-5">No Contracts Found</h4>
                                                        <p className="text-gray-600 text-sm font-semibold mt-2">
                                                            Start by creating a new contract<br />
                                                            to organize your team's work effectively
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
                                <div className="flex items-center gap-2 order-2 md:order-1">
                                    Show
                                    <select 
                                        className="select select-sm !w-16"
                                        data-datatable-size="true"
                                        title="perpage"
                                        name="perpage"
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                        >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                    </select>
                                    per page
                                </div>
                                <div className="flex items-center gap-4 order-1 md:order-2">
                                    <span data-datatable-info="true">{(currentPage - 1) * itemsPerPage + 1}-{currentPage * itemsPerPage} of {totalPages * itemsPerPage}</span>
                                    <div className="pagination" data-datatable-pagination="true">
                                        <div className="pagination">
                                            <button
                                                type="button"
                                                title="Previous"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={`btn ${ currentPage === 1 ? 'disabled' : '' }`}
                                                disabled={currentPage === 1}>
                                                <HiOutlineChevronLeft className="rtl:transform rtl:rotate-180" />
                                            </button>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`btn ${i + 1 === currentPage ? 'active' : ''}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            {/* <button className="btn active disabled"
                                                disabled="">
                                                1
                                            </button>
                                            <button className="btn">
                                                2
                                            </button>
                                            <button className="btn">
                                                3
                                            </button>
                                            <button className="btn">
                                                ...
                                            </button> */}
                                            <button 
                                                type="button"
                                                title="Next"
                                                onClick={() => handlePageChange(currentPage + 1)} 
                                                className={`btn ${ currentPage === totalPages ? 'disabled' : '' }`}>
                                                <HiOutlineChevronRight className="rtl:transform rtl:rotate-180" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contracts;