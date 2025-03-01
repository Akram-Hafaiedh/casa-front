import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2"
import useAxiosInstance from "../../utils/axiosInstance";
import { Customer } from "../../types/Customer";
import {  useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";
import moment from "moment";
import { camelToSnake } from "../../helpers/format";
import { Accounting } from "../../types/Accounting";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import AccountingFormModal from "./components/AccountingFormModal";
import { statusOptions } from "../../types/Insurance";

const Accountings = () => {

  const {overviewCustomer, updateCustomer} = useOutletContext<{
    overviewCustomer:Customer,
    updateCustomer(c: Customer): void
  }>()
  const [accountings, setAccountings] = useState<Accounting[]>(camelToSnake(overviewCustomer.accountings));

  const axiosInstance = useAxiosInstance();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedAccounting, setSelectedAccounting] = useState<Accounting | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const { openModal, closeModal } = useModal();

    const openDeleteModal = (accounting: Accounting) => {
      setSelectedAccounting(accounting);
      setIsDeleteModalOpen(true);
    };
    const openEditModal = (accounting: Accounting | null) => {
      setSelectedAccounting(accounting);
      setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
      setSelectedAccounting(null);
      setIsEditModalOpen(false);
    };
    const closeDeleteModal = () => {
      setSelectedAccounting(null);
      setIsDeleteModalOpen(false);
    };


    const handleSaveAccounting = async (savedAccounting: Accounting) => {
      try {
          const updatedAccountings = selectedAccounting
              ? accountings.map(acc => acc.id === selectedAccounting.id ? savedAccounting : acc)
              : [...accountings, savedAccounting];
          
          setAccountings(updatedAccountings);
          
          // Update parent customer state if needed
          updateCustomer({
              ...overviewCustomer,
              accountings: updatedAccountings
          });
      } catch (error) {
          console.error('Error updating taxes state:', error);
      }
    };
    
    const confirmDeleteAccounting = async () => {

      try {
          const response = await axiosInstance.delete(`/customers/${overviewCustomer.id}/accountings/${selectedAccounting.id}`);
          if (response.data.status.code === 200) {
              const updatedAccountings = accountings.filter((accounting) => accounting.id !== AccountingId);
              setAccountings(updatedAccountings);
              toast.success(response.data.status.message);
              closeDeleteModal();
          }
          else {
              toast.error(response.data.status.message);
          }
      } catch (error) {
          console.log('Error deleting user:', error);
      }

    }
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // fetchTaxes(page, itemsPerPage, searchQuery);
    };
    return (
        <div className="card card-grid min-w-full">
            <ConfirmationModal
              isOpen={isDeleteModalOpen}
              title="Delete Accounting"
              message="If you delete this accounting, you won’t be able to revert this!"
              confirmText="Yes, Delete"
              cancelText="Cancel"
              onConfirm={confirmDeleteAccounting}
              onCancel={closeDeleteModal}
            />

            <AccountingFormModal
              isOpen={isEditModalOpen}
              initialAccounting={selectedAccounting}
              customerId={overviewCustomer.id!}
              onSave={handleSaveAccounting}
              onClose={closeEditModal}
            />
            <div className="card-header">

                <div className="card-title">
                  <h3 className="card-title">{ overviewCustomer.full_name } Accountings</h3>
                </div>
                <button
                    title="Add New Accounting"
                    type="button"
                    onClick={()=> openEditModal(null)}
                    className="btn btn-primary btn-sm"
                >
                    <HiOutlinePlusCircle className="size-5! mr-2" /> Add Accounting
                </button>
            </div>
            <div className="card-body">
                <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                    <div className="scrollable-x-auto">
                      <table className="table table-auto table-border" data-datatable-table="true">
                          <thead>
                            <tr>
                              <th className="w-[225px]">Start Date</th>
                              <th className="w-[100px]">Tax</th>
                              <th className="w-[100px]">Status</th>
                              <th className="w-[40px]">&#8203;</th>
                              <th className="w-[40px]">&#8203;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountings.map((accounting: Accounting) => (
                              <tr key={accounting.id}>
                                <td>{moment(accounting.start_date).format('YYYY-MM-DD : HH:mm')}</td>
                                <td>
                                  {accounting.tax_included ? (
                                    <span className="badge badge-sm badge-success">Included</span>
                                  ) : (
                                    <span className="badge badge-sm badge-error">Excluded</span>
                                  )}
                                </td>
                                <td>
                                    {statusOptions.find((option) => option.value === accounting.status)?.label && (
                                        <span
                                            className={`badge badge-sm ${
                                                {
                                                    1: 'badge-success',
                                                    2: 'badge-error',
                                                    3: 'badge-warning',
                                                    4: 'badge-error',
                                                    5: 'badge-error',
                                                    6: 'badge-warning',
                                                    7: 'badge-error',
                                                }[accounting.status]
                                            }`}
                                        >
                                            {statusOptions.find((option) => option.value === accounting.status)?.label}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                  <div className="flex justify-center space-x-1">
                                    <button 
                                        onClick={()=>openEditModal(accounting)}
                                        title="Edit Tax"
                                        type="button" 
                                        className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                    >
                                        <HiOutlinePencilSquare className="size-4 " />
                                    </button>
                                  </div>
                                </td>
                                <td className="px-4 py-2 text-center border-b border-gray-300">
                                  <button 
                                    title="Delete User"
                                    type="button" 
                                    className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                    onClick={() => openDeleteModal(accounting)}
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
    )
}
export default Accountings
