import { toast } from "react-toastify";
import useAxiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";


interface User {
    _id: string;
    name: string;
    email: string;
    role: { name: string }
}

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    userToEdit: User | null;
}

const AddUserModal: React.FC<AddUserModalProps> = ({isOpen, onClose, onSave, userToEdit}) => {
    const axiosInstance = useAxiosInstance();
    const [name, setName] = useState(userToEdit?.name || '');
    const [email, setEmail] = useState(userToEdit?.email || '');
    const [role, setRole] = useState(userToEdit?.role.name || 'employee');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setRole(userToEdit.role.name);
        } else {
            setName('');
            setEmail('');
            setRole('employee');
        }
    }, [userToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                name,
                email,
                role,
            }

            if (!data.name || !data.email || !data.role) {
                toast.error('Please fill in all fields.');
                return;
            }
            const response = await axiosInstance.post('/users', data);
            if (response.data.status === 201) {
                toast.success(response.data.data.message);
                onSave();
                onClose();
            } else {
                toast.error(response.data.data.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('An error occurred while creating the user.');
        }
    }

    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create New User</h2>
                <form onSubmit={handleSubmit}>
                    {/* Add form fields here */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role:</label>
                        <div className="flex items-center">
                            <input className="mr-2" id="admin" type="radio" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} />
                            <label className="text-gray-700 text-sm font-bold" htmlFor="admin">Admin</label>
                            <input className="ml-4 mr-2" id="employee" type="radio" value="employee" checked={role === 'employee'} onChange={(e) => setRole(e.target.value)} />
                            <label className="text-gray-700 text-sm font-bold" htmlFor="employee">Employee</label>
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-2">

                        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            Create User
                        </button>
                        {/* Close modal button */}
                        <button type="button" onClick={onClose} className="w-full  px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUserModal;
