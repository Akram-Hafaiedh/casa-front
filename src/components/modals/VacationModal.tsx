import { Fragment, useEffect, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { Vacation } from "../../types/Vacation";
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";

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
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedVacation) {
            setStartDate(selectedVacation.start || '');
            setEndDate(selectedVacation.end || '');
            setTitle(selectedVacation.title);
            setComment(selectedVacation.description || '');
        }else if (selectedDate) {
            setStartDate(selectedDate);
        }
    }, [selectedDate, selectedVacation]);


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                start:startDate,
                end:endDate,
                title,
                description:comment,
            }
            const response = await axiosInstance.post('/vacations', data);
            if (response.data.status.code === 201) {
                toast.success(response.data.status.message);
                setStartDate('');
                setTitle('');
                setEndDate('');
                onVacationCreated();
                onClose();
            }
            if (response.data.status.code === 400){
                Object.keys(response.data.errors).forEach((key) => {
                    response.data.errors[key].forEach((error: string) => {
                        toast.error(`${error}`);
                    });
                });
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
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                onClose={onClose}
                as="div" 
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
            >
                <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 relative">
                    <div className="flex justify-between items-center">
                        <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {selectedVacation ? 'Edit Your' : 'Create New'} Vacation
                        </DialogTitle>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="p-2 text-gray-500 hover:text-gray-700"
                        >
                            <HiOutlineXMark className="h-6 w-6" />
                        </button>
                    </div>
                    <Description as="p" className="text-sm text-gray-500">
                        {selectedVacation ? 'Edit' : 'Create'} a new vacation. View details about your selected vacation.
                    </Description>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mb-4">
                            <label className="form-label text-gray-900 mb-2" htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input"
                                placeholder="Vacation Title"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-gray-900 mb-2" htmlFor="comment">Comment</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-3 py-2 border rounded-sm"
                                placeholder="Vacation Comment"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-gray-900 mb-2" htmlFor="startDate">Start Date</label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate || ''}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-gray-900 mb-2" htmlFor="endDate">End Date</label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-sm"
                                required
                            />
                            </div>
                        <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-danger"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading && 'opacity-50'}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Create'}
                        </button>
                        </div>
                    </form>
                </DialogPanel>
            </Dialog>
        </Transition>
    )
}

export default VacationModal