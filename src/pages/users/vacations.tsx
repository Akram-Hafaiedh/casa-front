import { Link, useOutletContext } from "react-router-dom";
import { User } from "../../types/User";
import { Vacation } from "../../types/Vacation";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineEye, HiOutlineMagnifyingGlass, HiOutlinePencilSquare, HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2";
import useAxiosInstance from "../../utils/axiosInstance";
import { useCallback, useState } from "react";
import moment from "moment";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import VacationModal from "../../components/modals/VacationModal";

const UserVacations: React.FC = () => {
    
    const {overviewUser, updateUser} = useOutletContext<{overviewUser:User, updateUser(u:User): void}>();
    const [vacations, setVacations] = useState<Vacation[]>(overviewUser.vacations);
    const [searchQuery, setSearchQuery] = useState('');

    const axiosInstance = useAxiosInstance();
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);


    const openEditModal = (vacation: Vacation) => {
        setSelectedVacation(vacation);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (vacation: Vacation) => {
        setSelectedVacation(vacation);
        setIsDeleteModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedVacation(null);
        setIsEditModalOpen(false);
    };
    const closeDeleteModal = () => {
        setSelectedVacation(null);
        setIsDeleteModalOpen(false);
    };


    const confirmDeleteVacation = async () => {
        if (selectedVacation) {
            setLoading(false);
            try {
                const response = await axiosInstance.delete(`/vacations/${selectedVacation}`);
                if (response.data.status.code === 200) {
                    setVacations(vacations.filter((vacation) => vacation.id !== selectedVacation));
                    toast.success(response.data.status.message);
                } else {
                    toast.error(response.data.status.message);
                }
            } catch (error) {
                console.error("Error deleting vacation:", error);
            } finally {
                setLoading(false);
                closeModal();
            }
        }
    };



    const fetchVacations = useCallback( async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get(`/users/${overviewUser.id}/vacations`, {
                params: { page, limit, search }
            });
            console.log(response.data)
            setVacations(response.data.data.vacations.data);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.log('Error fetching users', error);
        }
    }, [axiosInstance]);
        

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchVacations(page, itemsPerPage, searchQuery);
    };
    

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchVacations(currentPage, itemsPerPage, query);
    };

    const refreshVacations = () => {
        fetchVacations(currentPage, itemsPerPage, searchQuery);
    };

    if (loading) return <Loader isLoading={loading} />;

    return (
        <>

            <div className="card card-grid min-w-full">
                <div className="card-header">
                    <div className="flex gap-6 justify-between w-full">
                        <div className="relative">
                            <HiOutlineMagnifyingGlass className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3" />
                            <input 
                                onChange={handleSearchChange}
                                value={searchQuery}
                                className="input input-sm ps-8!"
                                placeholder="Search Vacations..."
                                type="text" 
                            />
                        </div>
                        <label className="switch switch-sm">
                            <input className="order-2" name="check" type="checkbox" value="1" />
                            <span className="switch-label order-1">
                                Active
                            </span>
                        </label>
                    </div>
                </div>
                <div className="card-body">
                    <div className="datatable-initialized" data-datatable="true" data-datatable-page-size="10" id="datatable_users">
                        <div className="scrollable-x-auto">
                            <table className="table table-auto table-border" data-datatable-table="true">
                                <thead>
                                    <tr>
                                        <th className="w-[225px]">Title</th>
                                        <th className="w-[100px]">Start</th>
                                        <th className="w-[100px]">End</th>
                                        <th className="w-[225px]">Last Updated</th>
                                        <th className="w-[100px]">Status</th>
                                        <th className="w-[60px]">&#8203;</th>
                                        <th className="w-[60px]">&#8203;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vacations && vacations.length > 0 && vacations.map((vacation: Vacation) => (
                                        <tr key={vacation.id}>
                                            <td>{vacation.title}</td>
                                            <td>{moment(vacation.start).format('YYYY-MM-DD')}</td>
                                            <td>{moment(vacation.end).format('YYYY-MM-DD')}</td>
                                            <td>{moment(vacation.created_at).format('YYYY-MM-DD : HH:mm')}</td>
                                            <td>
                                                {vacation.status === 0 && <span className="badge badge-sm badge-warning">Pending</span>}
                                                {vacation.status === 1 && <span className="badge badge-sm badge-success">Approved</span>}
                                                {vacation.status === 2 && <span className="badge badge-sm badge-error">Rejected</span>}
                                            </td>
                                            <td className="px-4 py-2 text-right border-b border-gray-300">
                                                <div className="flex justify-end space-x-1">
                                                    <button
                                                        type="button"
                                                        onClick={()=>openEditModal(vacation)}
                                                        title="Edit vacation"
                                                        className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                                    >
                                                        <HiOutlineEye className="size-4 " />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-right border-b border-gray-300">

                                                <button 
                                                    title="Delete vacation"
                                                    type="button" 
                                                    className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                                    onClick={()=> openDeleteModal(vacation)}
                                                >
                                                    <HiOutlineTrash className="size-4 " />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {vacations && vacations.length === 0 && (
                                        <tr>
                                            <td colSpan={6}>No vacations found.</td>
                                        </tr>
                                    )}
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
                                <span className="whitespace-nowrap">per page</span>
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
                                                title={`Page ${i + 1}`}
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
                <VacationModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    selectedDate={null}
                    selectedVacation={selectedVacation}
                    onVacationCreated={refreshVacations}
                />
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    title="Are you sure?"
                    message="If you delete this user, you won’t be able to revert this!"
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                    onConfirm={confirmDeleteVacation}
                    onCancel={closeDeleteModal}
                />
            </div>
        </>
    )
}
export default UserVacations