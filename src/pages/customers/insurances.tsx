import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2"
import useAxiosInstance from "../../utils/axiosInstance";
import { Customer } from "../../types/Customer";
import {  useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Insurance, statusOptions } from "../../types/Insurance";
import {camelToSnake} from "../../helpers/format";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import InsuranceFormModal from "./components/InsuranceFormModal";



const Insurances = () => {
  const { overviewCustomer, updateCustomer} = useOutletContext<{
    overviewCustomer:Customer,
    updateCustomer(c: Customer): void
}>();
  const [insurances, setInsurances] = useState<Insurance[]>(camelToSnake(overviewCustomer.insurances));

  const axiosInstance = useAxiosInstance();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const openDeleteModal = (insurance: Insurance) => {
    setSelectedInsurance(insurance);
    setIsDeleteModalOpen(true);
  };
  const openEditModal = (insurance: Insurance | null) => {
    setSelectedInsurance(insurance);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedInsurance(null);
    setIsEditModalOpen(false);
  };
  const closeDeleteModal = () => {
    setSelectedInsurance(null);
    setIsDeleteModalOpen(false);
  };
  console.log(insurances);

  const confirmDeleteInsurance = async () => {
    if (selectedInsurance) {
      try {
        const response = await axiosInstance.delete(`/customers/${overviewCustomer.id}/insurances/${selectedInsurance.id}`);
        if (response.data.status.code === 200) {
          const updatedInsurances = insurances.filter((insurance) => insurance.id!== selectedInsurance.id);
          setInsurances(updatedInsurances);
          toast.success(response.data.status.message);
          closeDeleteModal();
        }
        else {
          toast.error(response.data.status.message);
        }
      }
      catch (error) {
        toast.error('Error deleting insurance from customer, please try again later');
        console.error("Error deleting insurance:", error);
      }
    }
  }

  const handleSaveInsurance = async (savedInsurane: Insurance) => {
    try {
      const updatedInsurances = selectedInsurance ?
        insurances.map(insurance => insurance.id === selectedInsurance?.id ? savedInsurane : insurance)
        : [...insurances, savedInsurane];
      setInsurances(updatedInsurances);
      updateCustomer({...overviewCustomer, insurances: updatedInsurances });
    } catch(error) {
      console.error('Error updating insurances state:', error);
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
            title="Delete Insurance"
            message="If you delete this insurance, you won’t be able to revert this!"
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={confirmDeleteInsurance}
            onCancel={closeDeleteModal}
        />
        
        <InsuranceFormModal
          isOpen={isEditModalOpen}
          initialInsurance={selectedInsurance}
          customerId={overviewCustomer.id!}
          onSave={handleSaveInsurance}
          onClose={closeEditModal}
        />
          <div className="card-header">

              <div className="card-title">
                  <h3 className="card-title">{ overviewCustomer.full_name } Insurances</h3>
              </div>
              <button
                  title="Add New Insurance"
                  type="button"
                  onClick={()=>openEditModal(null)}
                  className="btn btn-primary btn-sm"
              >
                  <HiOutlinePlusCircle className="!size-5 mr-2" /> Add Insurance
              </button>
          </div>
          <div className="card-body">
              <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                  <div className="scrollable-x-auto min-h-[400px]">
                      <table className="table table-auto table-border" data-datatable-table="true">
                          <thead>
                              <tr>
                                  <th className="w-[225px]">Type</th>
                                  <th className="w-[225px]">Agency</th>
                                  <th className="w-[100px]">Status</th>
                                  <th className="w-[225px]">Payment</th>
                                  <th className="w-[60px]">&#8203;</th>
                                  <th className="w-[60px]">&#8203;</th>
                              </tr>
                          </thead>
                          <tbody>
                              {insurances.map((insurance) => (
                                  <tr key={insurance.id}>
                                      <td>{insurance.type}</td>
                                      <td>{insurance.agency}</td>
                                      <td>
                                          {statusOptions.find((option) => option.value === insurance.status)?.label && (
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
                                                      }[insurance.status]
                                                  }`}
                                              >
                                                  {statusOptions.find((option) => option.value === insurance.status)?.label}
                                              </span>
                                          )}
                                      </td>
                                      <td>{insurance.payment_amount} / {insurance.payment_frequency}</td>
                                      <td className="px-4 py-2 text-right border-b border-gray-300">
                                          <div className="flex justify-end space-x-1">
                                              <button 
                                                  onClick={()=>openEditModal(insurance)}
                                                  title="Edit Tax"
                                                  type="button" 
                                                  className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded"
                                              >
                                                  <HiOutlinePencilSquare className="size-4 " />
                                              </button>
                                          </div>
                                      </td>
                                      <td className="px-4 py-2 text-right border-b border-gray-300">

                                          <button 
                                              title="Delete User"
                                              type="button" 
                                              className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded"
                                              onClick={() => openDeleteModal(insurance)}
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
  )
}
export default Insurances