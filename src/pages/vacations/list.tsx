import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import HomeLayout from '../../layouts/PrivateLayout';
import { useEffect, useState } from 'react';
import useAxiosInstance from "../../utils/axiosInstance";
import VacationModal from '../../components/modals/VacationModal';
import  {formatDateRange } from '../../utils/formatDate';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Vacation } from '../../types/Vacation';

const VacationListing = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const fetchVacations = async () =>{
        try {
            const response = await axiosInstance.get('/vacations/my-vacations');
            if (response.data.status.code === 200) {
                console.log(response.data);
                setVacations(response.data.data.vacations)
            } else {
                console.error("Failed to fetch vacations:", response.data);
            }
        }catch (e) {    
            console.error("Failed to fetch vacations:", e);
        }
    }

    const refreshVacationList = () => {
        if(user?.role === 'Administrator') {
            fetchVacationsForAdmin();
        } else {
            fetchVacations();
        }
    };

    const fetchVacationsForAdmin = async () =>{
        try {
            const response = await axiosInstance.get('/vacations');
            console.log(response);
            console.log(response.data.data.vacations);
            if (response.data.status.code === 200) {
                console.log(response.data);
                setVacations(response.data.data.vacations)
            } else {
                console.error("Failed to fetch vacations:", response.data);
            }
        }catch (e) {    
            console.error("Failed to fetch vacations:", e);
        }
    }


    const handleDelete = async (vacation: Vacation) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this vacation!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(`/vacations/${vacation.id}`);
                    if (response.data.status.code === 200) {
                        console.log(response.data);
                        refreshVacationList();
                        toast.success('Vacation deleted successfully');
                    } else {
                        console.error("Failed to delete vacation:", response.data);
                        toast.error('Failed to delete vacation');
                    }
                } catch (e) {
                    console.error("Failed to delete vacation:", e);
                    toast.error('Failed to delete vacation');
                }
            } else if (result.isDismissed) {
                toast.info('Vacation not deleted');
            }
        })
    }   

    const handleStatusChange = async (vacation: Vacation, newStatus: string) => {
        try {
            const response = await axiosInstance.put(`/vacations/${vacation.id}/status`, { status: newStatus });
            if (response.data.status.code === 200) {
                console.log(response.data);
                refreshVacationList();
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
        if(user && user.role !== 'Administrator') {
            fetchVacations();
        } else {
            fetchVacationsForAdmin();
        }
    },[]);
    return (
        <HomeLayout sidebar={<Sidebar />}>
            <div className="flex justify-between items-center">
                <h1 className="mb-4 text-3xl font-bold">Vacations</h1>
                <div className="flex space-x-2">
                    {user?.role !== 'admin' && (
                        <button type='button' onClick={toggleModal} className="px-4 py-2 text-white bg-green-500 rounded">
                            Create New Vacation
                        </button>
                    )}

                    <Link to="/vacations" className="px-4 py-2 text-white bg-blue-500 rounded">Back to calendar</Link>
                </div>
            </div>

            {user?.role === 'Administrator' ? (
                <div className="mt-6">
                    {/* Separate Pending Vacations */}
                    <h2 className="text-lg font-bold">Pending Vacations</h2>
                    {vacations.filter(vacation => vacation.status === "Pending").length > 0 ? (
                        <ul className="list-disc ml-5">
                            {vacations.filter(vacation => vacation.status === "Pending").map((vacation) => (
                                <li key={vacation.id} className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <span>
                                            {formatDateRange(vacation.start, vacation.end)}{" "}
                                            <span className="text-yellow-500">({vacation.status})</span>
                                            {" "}by{" "}
                                            {/* This should Be Email instead */}
                                            <span className="text-blue-600">{vacation.user.name || "Unknown"}</span>
                                        </span>
                                        <div className="space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => handleStatusChange(vacation, "Approved")}
                                                className="px-4 py-2 text-white bg-green-500 rounded"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleStatusChange(vacation, "Rejected")}
                                                className="px-4 py-2 text-white bg-yellow-500 rounded"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pending vacations to review.</p>
                    )}

                    {/* Separate Processed Vacations */}
                    <h2 className="text-lg font-bold mt-6">Processed Vacations</h2>
                    {vacations.filter(vacation => vacation.status !== "Pending").length > 0 ? (
                        <ul className="list-disc ml-5">
                            {vacations.filter(vacation => vacation.status !== "Pending").map((vacation) => (
                                <li key={vacation.id} className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <span>
                                            {formatDateRange(vacation.start, vacation.end)}{" "}
                                            <span className={vacation.status === "Approved" ? "text-green-500" : "text-red-500"}>
                                                ({vacation.status})
                                            </span>
                                            {" "}by{" "}
                                            {/* This should be Email instead */}
                                            <span className="text-blue-600">{vacation.user.name}</span>
                                        </span>
                                        { vacation.status === "Approved" ? (
                                            <button
                                                type="button"
                                                onClick={() => handleStatusChange(vacation, "Rejected")}
                                                className="px-4 py-2 text-white bg-red-500 rounded"
                                            >
                                                Reject
                                            </button>
                                        ): (
                                            <button
                                                type="button"
                                                onClick={() => handleStatusChange(vacation, "Approved")}
                                                className="px-4 py-2 text-white bg-green-500 rounded"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No processed vacations yet.</p>
                    )}
                </div>
            ) : (
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
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(vacation)}
                                            className="px-4 py-2 text-white bg-red-500 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no vacations yet.</p>
                    )}
                </div>
            )}

             {/* Vacation modal */}
            <VacationModal
                isOpen={isModalOpen}
                selectedDate={null}
                selectedVacation={null}
                onClose={toggleModal}
                onVacationCreated={refreshVacationList}
            />
        </HomeLayout>
    )
}

export default VacationListing;