import { useEffect, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { Vacation } from "../../types/Vacation";

interface VacationModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: string | null;
    onVacationCreated: () => void;
    selectedVacation: Vacation | null;
}
  

const VacationModal : React.FC<VacationModalProps> = ({ isOpen, onClose, selectedDate, selectedVacation, onVacationCreated }) => {
    const axiosInstance = useAxiosInstance();
    const [startDate, setStartDate] = useState(selectedDate ||'');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedVacation) {
            setStartDate(selectedVacation.startDate || '');
            setEndDate(selectedVacation.endDate || '');
            setTitle(selectedVacation.title);
        }else if (selectedDate) {
            setStartDate(selectedDate);
        }
    }, [selectedDate, selectedVacation]);


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                startDate,
                endDate,
                title
            }
            const response = await axiosInstance.post('/vacations', data);
            if (response.data.status === 201) {
                toast.success(response.data.data.message);
                setStartDate('');
                setTitle('');
                setEndDate('');
                onVacationCreated();
                onClose();
            }
        } catch (error) {
            console.error('Error creating vacation:', error);
            toast.error('An error occurred while creating the vacation');
        }finally {
            setLoading(false);
        }
    }
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create New Vacation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Vacation Title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="startDate">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate || ''}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="endDate">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                        </div>
                    <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 mr-2 text-gray-500 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${loading && 'opacity-50'}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Create'}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VacationModal