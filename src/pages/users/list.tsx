import { useCallback, useEffect, useState } from "react";
import HomeLayout from '../../layouts/PrivateLayout';
import Sidebar from '../../components/Sidebar';
import AddUserModal from "../../components/modals/AddUserModal";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { User } from "../../types/User";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEye } from "react-icons/fa6";

const Users: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); 
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const fetchUsers = useCallback( async (page: number, limit: number, search: string) => {
        try {
            const response = await axiosInstance.get(`/users`, {
                params: { page, limit, search }
            });
            console.log(response.data)
            setUsers(response.data.data.users.data);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.currentPage);
        } catch (error) {
            console.log('Error fetching users', error);
        }
    }, [axiosInstance]);
    
    
    useEffect(() => {
        fetchUsers(currentPage, itemsPerPage, searchQuery);
        setLoading(false);
    }, [currentPage, itemsPerPage, searchQuery]);

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
                    if (response.data.status.code === 200) {
                        const updatedUsers = users.filter((user) => user.id !== userId);
                        setUsers(updatedUsers);
                        toast.success(response.data.status.message);
                    }
                    else {
                        toast.error(response.data.status.message);
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
    const handleSaveUser = (newUser: User) => {
        setIsModalOpen(false);
        setUserToEdit(null);
        setUsers([...users, newUser]);
        // Save user logic here
    };

    const handleEditUser = (user: User) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchUsers(currentPage, itemsPerPage, query);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchUsers(page, itemsPerPage, searchQuery);
    };
    if (loading) return <p>Loading...</p>;
    return (
        <HomeLayout sidebar={<Sidebar />}>
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Users List</h1>
                    {/* <button type="button" onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded">Add User</button> */}
                    <Link to="/users/create" className="px-4 py-2 text-white bg-blue-500 rounded">Add User</Link>
                </div>
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <table className="min-w-full bg-white table-auto">
                    <thead className="bg-white text-gray-800 h-12">
                        <tr>
                            <th className="px-4 py-1 text-sm border">Full Name</th>
                            <th className="px-4 py-1 text-sm border">ID or Passport</th>
                            <th className="px-4 py-1 text-sm border">Email</th>
                            <th className="px-4 py-1 text-sm border">Phone</th>
                            <th className="px-4 py-1 text-sm border">Address</th>
                            <th className="px-4 py-1 text-sm border">Role</th>
                            <th className="px-4 py-1 text-sm border">Birthdate</th>
                            <th className="px-4 py-1 text-sm border">AHV Number</th>
                            <th className="px-4 py-1 text-sm border">Has Contract</th>
                            <th className="px-4 py-1 text-sm border w-1/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.first_name} {user.last_name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.id_passport}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.phone}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">
                                    {user.address && user.city && user.postal_code ? (
                                        `${user.address} ${user.city}, ${user.postal_code}`
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.role.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.birthday ? moment(user.birthday).format('DD/MM/YYYY'): ''}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">{user.ahv_number}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 border">
                                    {user.contract ? (
                                        <span>Yes</span>
                                    ) : (
                                        <span>No</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                    <div className="flex justify-end space-x-1">
                                        <button
                                            title="Edit User"
                                            type="button" 
                                            className="px-2 py-1 text-blue-500 hover:text-blue-600 text-lg transition-colors"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <Link to={"/users/" + user.id}
                                            title="Show User"
                                            type="button" 
                                            className="px-2 py-1 text-blue-500 hover:text-blue-600 text-lg transition-colors"
                                        >
                                            <FaEye />
                                        </Link>
                                        <button 
                                            title="Delete User"
                                            type="button" 
                                            className="px-2 py-1 text-red-500 hover:text-red-600 text-lg transition-colors"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))) : (

                            <tr>
                                <td colSpan={6} className="py-2 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="flex flex-row-reverse items-center justify-between">


                    <div className="flex items-center justify-between mt-6 space-x-4">
                        <button type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>

                    {/* Optional: Page size selector */}
                    <div>
                        <label>
                            Items per page:
                            <select
                                className="p-2 ml-4 border border-gray-300 rounded-md"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </label>
                    </div>
                </div>
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