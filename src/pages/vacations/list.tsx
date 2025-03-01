import { useEffect, useState } from 'react';
import useAxiosInstance from "../../utils/axiosInstance";
import VacationModal from '../../components/modals/VacationModal';
import  {formatDateRange } from '../../utils/formatDate';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Vacation } from '../../types/Vacation';
import InfoSection from '../../layouts/Info';
import { HiOutlineArrowLeft, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Loader from '../../components/Loader';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

const VacationListing = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);


    const fetchVacations = async () =>{
        try {
            const response = await axiosInstance.get('/vacations');
            if (response.data.status.code === 200) {
                console.log(response.data);
                setVacations(response.data.data.vacations)
            } else {
                console.error("Failed to fetch vacations:", response.data);
                toast.error('Failed to fetch vacations, please try again later');
            }
        }catch (e) {    
            console.error("Failed to fetch vacations:", e);
        }
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedVacation(null);
    }
    const closeEditModal = () => {
        setSelectedVacation(null);
        setIsEditModalOpen(false);
    }

    const openEditModal = (vacation: Vacation) => {
        setIsEditModalOpen(true);
        setSelectedVacation(vacation);
    }
    const openDeleteModal = (vacation:Vacation) => {
        setIsDeleteModalOpen(true);
        setSelectedVacation(vacation);
    }


    const confirmDeleteVacation = async () => {

        try {
            const response = await axiosInstance.delete(`/vacations/${selectedVacation?.id}`);
            if (response.data.status.code === 200) {
                await fetchVacations();
                toast.success('Vacation deleted successfully');
            } else {
                console.error("Failed to delete vacation:", response.data);
                toast.error('Failed to delete vacation');
            }
        } catch (e) {
            console.error("Failed to delete vacation:", e);
            toast.error('Failed to delete vacation');
        }
            
    }   

    const handleStatusChange = async (vacation: Vacation, newStatus: string) => {
        try {
            const response = await axiosInstance.put(`/vacations/${vacation.id}/status`, { status: newStatus });
            if (response.data.status.code === 200) {
                console.log(response.data);
                await fetchVacations();
                toast.success('Vacation status updated successfully');
            } else {
                console.error('Failed to update vacation status:', response.data);
                toast.error('Failed to update vacation status');
            }
        } catch (error) {
            console.error('Failed to update vacation status:', error);
        }
    }
    

    useEffect(() => {
        setLoading(true);
        fetchVacations().finally(() => setLoading(false));;
    },[]);

    if (loading) {
        return <Loader isLoading={loading} />;
    }
    return (
        <div className="container-fixed">
            {/* <div className="flex justify-between items-center">
                <h1 className="mb-4 text-3xl font-bold">Vacations</h1>
                <div className="flex space-x-2">
                    {user?.role !== 'admin' && (
                        <button type='button' onClick={toggleModal} className="px-4 py-2 text-white bg-green-500 rounded-sm">
                            Create New Vacation
                        </button>
                    )}

                    <Link to="/vacations" className="px-4 py-2 text-white bg-blue-500 rounded-sm">Back to calendar</Link>
                </div>
            </div> */}

            <InfoSection
                title="My vacations"
                description="View and manage your vacations here."
                actions={[
                    {
                        type: 'link',
                        text: 'Back to calendar',
                        to: '/vacations',
                        icon: <HiOutlineArrowLeft />,
                        iconPosition: 'start'
                    },
                ]}
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete Vacation"
                message="If you delete this vacation, you won’t be able to revert this!"
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={confirmDeleteVacation}
                onCancel={closeDeleteModal}
            />


            <div className="mt-6">
                {vacations.length > 0 ? (
                    <ul className="list-disc ml-5">
                        {vacations.map(vacation => (
                            <li key={vacation.id} className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span>
                                        {formatDateRange(vacation.start, vacation.end)}{" "}
                                        <span className="text-gray-500">({vacation.status})</span>
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            title="edit vacation"
                                            type="button"
                                            onClick={() => openEditModal(vacation)}
                                            className="px-4 py-2 text-white bg-blue-500 rounded-sm"
                                        >
                                            <HiOutlinePencilSquare className="w-5 h-5" />
                                        </button>
                                        <button
                                            title="delete vacation"
                                            type="button"
                                            onClick={() => openDeleteModal(vacation)}
                                            className="px-4 py-2 text-white bg-red-500 rounded-sm"
                                        >
                                            <HiOutlineTrash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                        You have no vacations yet
                    </div>
                )}
            </div>

             {/* Vacation modal */}
            <VacationModal
                isOpen={isEditModalOpen}
                selectedDate={null}
                selectedVacation={selectedVacation}
                onClose={closeEditModal}
                onVacationCreated={fetchVacations}
            />
        </div>
    )
}

export default VacationListing;