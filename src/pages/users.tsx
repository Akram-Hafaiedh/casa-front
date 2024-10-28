import axios from "axios";
import { useEffect, useState } from "react";
import HomeLayout from '../layouts/PrivateLayout';
import Sidebar from '../components/Sidebar';
import AddUserModal from "../components/modals/AddUserModal";
import useAxiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
interface User {
    _id: string;
    name: string;
    email: string;
    role: { name: string }
}
const Users: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                setUsers(response.data.data.users);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching users', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(`/users/${userId}`);
                    if (response.data.status === 200) {
                        const updatedUsers = users.filter((user) => user._id !== userId);
                        setUsers(updatedUsers);
                        toast.success(response.data.data.message);
                    }
                    else {
                        toast.error(response.data.data.message);
                    }
                } catch (error) {
                    console.log('Error deleting user:', error);
                }
            }
        })
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setUserToEdit(null); 
    };
    const handleSaveUser = () => {
        setIsModalOpen(false);
        setUserToEdit(null);
        // Save user logic here
    };

    const handleEditUser = (user: User) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    }
    if (loading) return <p>Loading...</p>;
    return (
        <HomeLayout sidebar={<Sidebar />}>
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Users List</h1>
                    <button type="button" onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded">Add User</button>
                </div>
                <table className="min-w-full bg-white table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-start">Name</th>
                            <th className="px-4 py-2 text-start">Email</th>
                            <th className="px-4 py-2 text-start">Role</th>
                            <th className="px-4 py-2 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="px-6 py-3 text-left border-b border-gray-300 font-medium">{user.name}</td>
                                <td className="px-6 py-3 text-left border-b border-gray-300">{user.email}</td>
                                <td className="px-6 py-3 text-left border-b border-gray-300 capitalize">{user.role.name}</td>
                                
                                <td className="px-6 py-3 text-right border-b border-gray-300">
                                    <div className="flex justify-end space-x-2">
                                        <button 
                                            type="button" 
                                            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            type="button" 
                                            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))) : (

                            <tr>
                                <td colSpan={3} className="py-2 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <AddUserModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSaveUser}
                userToEdit={userToEdit}
            />
        </HomeLayout>

    );
};

export default Users;