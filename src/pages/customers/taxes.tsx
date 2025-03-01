import { useCallback, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlinePlusCircle, HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2"
import useAxiosInstance from "../../utils/axiosInstance";
import { Tax } from "../../types/Tax";
import { Customer } from "../../types/Customer";
import {  useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { camelToSnake } from "../../helpers/format";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import TaxFormModal from "./components/TaxFormModal";

const Taxes = () => {
    const { overviewCustomer, updateCustomer} = useOutletContext<{
        overviewCustomer:Customer,
        updateCustomer(c: Customer): void
    }>();
    const [taxes, setTaxes] = useState<Tax[]>(camelToSnake(overviewCustomer.taxes));

    const axiosInstance = useAxiosInstance();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const openDeleteModal = (tax: Tax) => {
        setSelectedTax(tax);
        setIsDeleteModalOpen(true);
    };
    const openEditModal = (tax: Tax | null) => {
        setSelectedTax(tax);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedTax(null);
        setIsEditModalOpen(false);
    };
    const closeDeleteModal = () => {
        setSelectedTax(null);
        setIsDeleteModalOpen(false);
    };

    const handleSaveTax = async (savedTax: Tax) => {
        try {
            const updatedTaxes = selectedTax
                ? taxes.map(t => t.id === selectedTax.id ? savedTax : t)
                : [...taxes, savedTax];
            
            setTaxes(updatedTaxes);
            
            // Update parent customer state if needed
            updateCustomer({
                ...overviewCustomer,
                taxes: updatedTaxes
            });
        } catch (error) {
            console.error('Error updating taxes state:', error);
        }
    };

    const fetchTaxes = useCallback(
        async (page: number, itemsPerPage: number, searchQuery: string) => {
            try {
                const response = await axiosInstance.get(`/customers/${overviewCustomer.id}/taxes?page=${page}&itemsPerPage=${itemsPerPage}&search=${searchQuery}`);
                setTaxes(response.data.data.taxes);
                setTotalPages(response.data.data.totalPages);
                setCurrentPage(response.data.data.currentPage);
            } catch (error) {
                console.error('Error fetching taxes:', error);
            }
        },
        [axiosInstance, overviewCustomer.id, setTaxes, setTotalPages, setCurrentPage]
    );


    const confirmDeleteTax = async () => {
        try {
            const response = await axiosInstance.delete(`/customers/${overviewCustomer.id}/taxes/${selectedTax?.id}`);
            if (response.data.status.code === 200) {
                const updatedTaxes = taxes.filter((tax) => tax.id !== selectedTax?.id);
                setTaxes(updatedTaxes);
                toast.success(response.data.status.message);
                closeDeleteModal();
            }
            else {
                toast.error(response.data.status.message);
            }
        }
        catch (error) {
            toast.error('Error deleting taxes from customer, please try again later');
            console.log('Error deleting user:', error);
        }
    }
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchTaxes(page, itemsPerPage, searchQuery);
    };
    return (
        <div className="card card-grid min-w-full">

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete Tax"
                message="If you delete this tax, you won’t be able to revert this!"
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={confirmDeleteTax}
                onCancel={closeDeleteModal}
            />

            <TaxFormModal
                isOpen={isEditModalOpen}
                initialTax={selectedTax}
                customerId={overviewCustomer.id!}
                onSave={handleSaveTax}
                onClose={closeEditModal}
            />
            <div className="card-header">

                <div className="card-title">
                    <h3 className="card-title">{ overviewCustomer.full_name } Taxes</h3>
                </div>
                <button
                    title="Add New Tax"
                    type="button"
                    onClick={() => openEditModal(null)}
                    className="btn btn-primary btn-sm"
                >
                    <HiOutlinePlusCircle className="size-5! mr-2" /> Add Tax
                </button>
            </div>
            <div className="card-body">
                <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                    <div className="scrollable-x-auto">
                        <table className="table table-auto table-border" data-datatable-table="true">
                            <thead>
                                <tr>
                                    <th className="w-[225px]">Tax</th>
                                    <th className="w-[100px]">Type</th>
                                    <th className="w-[100px]">Value</th>
                                    <th className="w-[225px]">Last Updated</th>
                                    <th className="w-[60px]">&#8203;</th>
                                    <th className="w-[60px]">&#8203;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxes.map((tax: Tax) => (
                                    <tr key={tax.id}>
                                        <td>{tax.name}</td>
                                        <td>{tax.type}</td>
                                        <td>{tax.value}</td>
                                        <td>{moment(tax.updated_at).format('YYYY-MM-DD : HH:mm')}</td>
                                        <td className="px-4 py-2 text-right border-b border-gray-300">
                                            <div className="flex justify-end space-x-1">
                                                <button 
                                                    onClick={()=>openEditModal(tax)}
                                                    title="Edit Tax"
                                                    type="button" 
                                                    className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                                >
                                                    <HiOutlinePencilSquare className="size-4 " />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-right border-b border-gray-300">

                                            <button 
                                                title="Delete User"
                                                type="button" 
                                                className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                                onClick={()=>openDeleteModal(tax)}
                                            >
                                                <HiOutlineTrash className="size-4 " />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
                        <div className="flex items-center gap-2 order-2 md:order-1">
                            Show
                            <select 
                                className="select select-sm w-16!"
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

        
    )
}
export default Taxes
