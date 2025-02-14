import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {snakeToCamel} from '../../helpers/format';
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { Customer } from "../../types/Customer";
import InfoSection from "../../layouts/Info";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineMagnifyingGlass, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import moment from "moment";
import { toast } from "react-toastify";
import { HiOutlineUserAdd } from "react-icons/hi";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
const CustomerListing: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page (limit)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const axiosInstance = useAxiosInstance();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);


    const fetchCustomers = useCallback(async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get('/customers', {
                params: { page, limit, search }
            });
            setCustomers(snakeToCamel(response.data.data.clients.data));
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }, [axiosInstance]);

    const openModal = (customerId: number) => {
        setSelectedCustomer(customerId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
        setIsModalOpen(false);
    };


    const confirmDeleteUser = async () => {
        try {
            const response = await axiosInstance.delete(`/customers/${selectedCustomer}`);
            if (response.data.status.code === 200) {
                setCustomers(customers.filter((customer) => customer.id !== selectedCustomer));
                toast.success(response.data.status.message);
            } else {
                toast.error(response.data.status.message);
            }
        } catch (error) {
            console.log('Error deleting user:', error);
        }
        finally {
            closeModal();
        }

    }
    
     
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
        <>
            <div className="container-fixed">
                <InfoSection 
                    title="Customers"
                    description="List of all customers"
                    actions={[
                        {
                            type: 'link',
                            text: 'Create New Customer',
                            to: '/customers/create',
                            icon: <HiOutlineUserAdd className="text-2xl"/>,
                            iconPosition: 'start'
                        },
                    ]}
                />

            <ConfirmationModal
                isOpen={isModalOpen}
                title="Are you sure?"
                message="If you delete this user, you won’t be able to revert this!"
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={confirmDeleteUser}
                onCancel={closeModal}
            />
            </div>
            <div className="container-fixed">
                <div className="card card-grid min-w-full">
                    <div className="card-header">
                        <div className="flex gap-6 justify-between w-full">
                            <div className="relative">
                                <HiOutlineMagnifyingGlass className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3" />
                                <input 
                                    onChange={handleSearchChange}
                                    value={searchQuery}
                                    className="input input-sm !ps-8"
                                    placeholder="Search Members"
                                    type="text" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                            <div className="scrollable-x-auto">
                                <table className="table table-auto table-border" data-datatable-table="true">
                                    <thead>
                                        <tr>
                                            <th className="w-[60px] text-center">
                                                <input className="checkbox checkbox-sm"
                                                    data-datatable-check="true"
                                                    type="checkbox"
                                                    title="Select All"
                                                />
                                            </th>
                                            <th className="w-[225px]">Customer</th>
                                            <th className="w-[225px]">Email</th>
                                            <th className="w-[225px]">phone</th>
                                            <th className="w-[225px]">City</th>
                                            <th className="w-[225px]">Created At</th>
                                            <th className="w-[60px]"></th>
                                            <th className="w-[60px]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { customers.length > 0 ? (customers.map((customer:Customer) => (
                                            <tr key={customer.id}>
                                                <td className="text-center">
                                                    <input 
                                                        className="checkbox checkbox-sm"
                                                        data-datatable-row-check="true"
                                                        title="Select Customers"
                                                        type="checkbox"
                                                        value="1"
                                                    />
                                                </td>
                                                <td>
                                                    <Link to={`/customers/${customer.id}/overview`} className="leading-none font-medium text-sm text-gray-900 hover:text-primary" href="#">
                                                        {customer.firstName} {customer.lastName}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {customer.email}
                                                </td>
                                                <td className="">{customer.phone}</td>
                                                <td className="">{customer.city}</td>
                                                <td className="">{moment(customer.created_at).format('DD/MM/YYYY HH:mm')}</td>
                                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                                    <div className="flex justify-end space-x-1">
                                                        <Link to={`/customers/${customer.id}/settings`}
                                                            title="Show Customer"
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
                                                        onClick={() => openModal(customer.id)}
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
                                                            src="/images/illustrations/4.svg"
                                                            alt="No customers"
                                                            className="max-w-full h-52 object-contain mx-auto"
                                                        />
                                                        <h4 className="text-gray-800 font-bold mt-5">No Customers Found</h4>
                                                        <p className="text-gray-600 text-sm font-semibold mt-2">
                                                            Start by creating a new customer<br />
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
                                                    type="button"
                                                    key={i + 1}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`btn ${i + 1 === currentPage ? 'active' : ''}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button 
                                                title="Next"
                                                type="button" 
                                                disabled={currentPage === totalPages}
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
                {/* Table */}
            </div>
        </>

    );
};

export default CustomerListing;
