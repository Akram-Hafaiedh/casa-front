import Sidebar from "../../components/Sidebar";
import HomeLayout from "../../layouts/PrivateLayout";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { Customer } from "../../types/Customer";
import InfoSection from "../../layouts/Info";
const CustomerListing: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page (limit)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const axiosInstance = useAxiosInstance();

    const fetchCustomers = useCallback(async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get('/customers', {
                params: { page, limit, search }
            });
            setFilteredCustomers(response.data.data.clients.data);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }, [axiosInstance]);
    
     
    useEffect(() => {
        fetchCustomers(currentPage, itemsPerPage, searchQuery);
    }, [currentPage, itemsPerPage, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchCustomers(page, itemsPerPage, searchQuery);
    };



    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchCustomers(currentPage, itemsPerPage, query);
    };
    return (
        <div className="container-fixed">
            <div>
                {/* <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Customers</h1>
                    <Link to="/customers/create" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Create New Customer</Link>

                </div> */}

                <InfoSection 
                    title="Customers"
                    description="List of all customers"
                    linkTo="/customers/create"
                    linkText="Create New Customer"
                />
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                {/* Table */}
                <table className="w-full min-h-screen-minus-14rem">
                    <thead className="bg-white text-gray-800 h-12">
                        <tr>
                            <th className="px-4 py-1 text-sm border">ID</th>
                            <th className="px-4 py-1 text-sm border">Full Name</th>
                            <th className="px-4 py-1 text-sm border">Email</th>
                            <th className="px-4 py-1 text-sm border">ID or Passport</th>
                            <th className="px-4 py-1 text-sm border">Phone</th>
                            <th className="px-4 py-1 text-sm border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {filteredCustomers?.length > 0 && filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-gray-800 border">{customer.id}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{customer.firstName} {customer.lastName}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{customer.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{customer.idOrPassport}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{customer.phoneNumber}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">
                                    <Link to={`/customers/${customer.id}`} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">View</Link>
                                </td>
                            </tr>
                        ))}

                        {/* Empty state */}
                        {filteredCustomers?.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-2 text-sm text-center text-gray-800 border">No customers found.</td>
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

export default CustomerListing;
