import { useCallback, useEffect, useState } from "react";
import HomeLayout from '../../layouts/PrivateLayout';
import Sidebar from '../../components/Sidebar';
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import moment from "moment";
import { Contract } from "../../types/Contract";
import InfoSection from "../../layouts/Info";
import { FaPlus } from "react-icons/fa6";

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

    const handleDeleteCustomer = async (contractId: string) => {
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
        <div className="container-fixed">
            <div>
                {/* <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">List Contracts</h1>
                    <Link to="/contracts/create" className="px-4 py-2 text-white bg-blue-500 rounded">Add Contract</Link>
                </div> */}
                <InfoSection
                    linkText="Create Contract"
                    linkTo="/contracts/create"
                    icon={<FaPlus />}
                    iconPosition="start"
                    title="List Contracts"
                    description="Manage your contracts here."
                />
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <table className="min-w-full bg-white table-auto">
                    <thead className="bg-white text-gray-800 h-12">
                        <tr>
                            <th className="px-4 py-1 text-sm border">Type</th>
                            <th className="px-4 py-1 text-sm border">Start Date</th>
                            <th className="px-4 py-1 text-sm border">End Date</th>
                            <th className="px-4 py-1 text-sm border">Employee</th>
                            <th className="px-4 py-1 text-sm border">Status</th>
                            <th className="px-4 py-1 text-sm border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.length > 0 ? (contracts.map((contract) => (
                            <tr key={contract.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-gray-800 border">{getContractTypeLabel(contract.type)}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{moment(contract.start_date).format('YYYY-MM-DD')}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{contract.end_date ? moment(contract.end_date).format('YYYY-MM-DD') : 'N/A'}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{contract.user?.first_name + ' ' + contract.user?.last_name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{contract.status}</td>
                                
                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                    <div className="flex justify-end space-x-1">
                                        <Link to={"/contracts/" + contract.id + "/edit"}
                                            className="px-2 py-1 text-blue-500 hover:text-blue-600 text-lg transition-colors"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button 
                                            title="Delete Contract"
                                            type="button" 
                                            className="px-2 py-1 text-red-500 hover:text-red-600 text-lg transition-colors"
                                            onClick={() => handleDeleteCustomer(contract.id!)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))) : (

                            <tr>
                                <td colSpan={5} className="py-2 text-center">No contracts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="flex flex-row-reverse items-center justify-between">


                    <div className="flex items-center justify-between mt-6 space-x-4">
                        <button type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>

                    {/* Optional: Page size selector */}
                    <div>
                        <label>
                            Items per page:
                            <select
                                className="p-2 ml-4 border border-gray-300 rounded-md"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Contracts;