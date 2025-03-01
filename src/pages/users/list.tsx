import { useCallback, useEffect, useState } from "react";
// import AddUserModal from "../../components/modals/AddUserModal";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { User } from "../../types/User";
import { Link } from "react-router-dom";
import moment from "moment";
import InfoSection from "../../layouts/Info";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineMagnifyingGlass, HiOutlinePencilSquare, HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import Loader from "../../components/Loader";

const Users: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); 
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = useCallback( async (page: number, limit: number, search: string) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }, [axiosInstance]);
    
    
    const openModal = (userId: string) => {
        setUserToDelete(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setUserToDelete(null);
        setIsModalOpen(false);
    };

    const confirmDeleteUser = async () => {
        if (userToDelete) {
            try {
                const response = await axiosInstance.delete(`/users/${userToDelete}`);
                if (response.data.status.code === 200) {
                    setUsers(users.filter((user) => user.id !== userToDelete));
                    toast.success(response.data.status.message);
                } else {
                    toast.error(response.data.status.message);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            } finally {
                closeModal();
            }
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, itemsPerPage, searchQuery);
    }, [currentPage, itemsPerPage, searchQuery]);

    // const handleDeleteUser = async (userId: string) => {
        
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'If you delete this user, You won\'t be able to revert this!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 const response = await axiosInstance.delete(`/users/${userId}`);
    //                 if (response.data.status.code === 200) {
    //                     const updatedUsers = users.filter((user) => user.id !== userId);
    //                     setUsers(updatedUsers);
    //                     toast.success(response.data.status.message);
    //                 }
    //                 else {
    //                     toast.error(response.data.status.message);
    //                 }
    //             } catch (error) {
    //                 console.log('Error deleting user:', error);
    //             }
    //         }
    //     })
    // }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchUsers(currentPage, itemsPerPage, query);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchUsers(page, itemsPerPage, searchQuery);
    };
    if (loading) return <Loader isLoading={loading} />;
    return (
        <>
            <div className="container-fixed">
                <InfoSection
                    title="Employees"
                    description="View all your employees on the platform"
                    actions={[
                        {
                            type: 'link',
                            text: 'Add employee',
                            to: '/users/create',
                            icon: <HiOutlinePlusCircle />,
                            iconPosition: 'start'
                        },
                    ]}
                />
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                title="Are you sure?"
                message="If you delete this user, you won’t be able to revert this!"
                confirmText="Yes, Delete"
                cancelText="Cancel"
                onConfirm={confirmDeleteUser}
                onCancel={closeModal}
            />
            <div className="container-fixed">
                <div className="card card-grid min-w-full">
                    <div className="card-header">
                        <div className="flex gap-6 justify-between w-full">
                            <div className="relative">
                                <HiOutlineMagnifyingGlass className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3" />
                                <input 
                                    onChange={handleSearchChange}
                                    value={searchQuery}
                                    className="input input-sm ps-8!"
                                    placeholder="Search Members"
                                    type="text" 
                                />
                            </div>
                            <label className="switch switch-sm">
                                <input className="order-2" name="check" type="checkbox" value="1" />
                                <span className="switch-label order-1">
                                    Active Users
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
                                            <th className="w-[60px] text-center">
                                                <input 
                                                    className="checkbox checkbox-sm"
                                                    data-datatable-check="true"
                                                    type="checkbox"
                                                    title="select all users"
                                                />
                                            </th>
                                            <th className="min-w-[300px]">Employee</th>
                                            <th className="w-[225px]">Role</th>
                                            <th className="w-[225px]">Last Login</th>
                                            <th className="w-[225px]">Joined date</th>
                                            <th className="w-[60px]"></th>
                                            <th className="w-[60px]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (users.map((user:User) => (
                                            <tr key={user.id}>
                                                <td className="text-center">
                                                    <input className="checkbox checkbox-sm"
                                                        data-datatable-row-check="true"
                                                        type="checkbox" value="1"
                                                        title="select user"
                                                    />
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2.5">
                                                        {user.logo_url ? (
                                                            <div className="">
                                                                <img 
                                                                    className="h-9 rounded-full" src={user.logo_url} 
                                                                    alt=""
                                                                />
                                                            </div>
                                                        ):(
                                                            <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-[30px] text-primary-inverse ring-primary-light bg-primary">
                                                                 {user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}
                                                            </span>
                                                        )}
                                                        <div className="flex flex-col gap-0.5">
                                                            <Link to={`/users/${user.id}/overview`} className="leading-none font-medium text-sm text-gray-900 hover:text-primary" href="#">
                                                                {user.first_name} {user.last_name}
                                                            </Link>
                                                            <span className="text-2sm text-gray-700 font-normal">
                                                                {user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                </td>
                                                <td className="">
                                                    {user.roles.map((role, index) => (
                                                        <span key={index} className={`badge badge-pill ${(() => {
                                                            switch (role.id) {
                                                                case 1:
                                                                    return 'badge-outline badge-primary'; // Admin
                                                                case 2:
                                                                    return 'badge-outline badge-warning'; // Developer
                                                                case 3:
                                                                    return 'badge-outline badge-success'; // Employee
                                                                case 4:
                                                                    return 'badge-outline badge-info'; // Client
                                                                case 5:
                                                                    return 'badge-outline badge-dark'; // Manager
                                                                default:
                                                                    return '';
                                                            }
                                                        })()} gap-1 items-center`}>
                                                            {role.name}    
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="">yesterday</td>
                                                <td className="">{moment(user.created_at).format('DD/MM/YYYY HH:mm')}</td>
                                                <td className="px-4 py-2 text-right border-b border-gray-300">
                                                    <div className="flex justify-end space-x-1">
                                                        <Link to={`/users/${user.id}/profile`}
                                                            title="Show User"
                                                            type="button" 
                                                            className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                                        >
                                                            <HiOutlinePencilSquare className="size-4 " />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-right border-b border-gray-300">

                                                    <button 
                                                        title="Delete User"
                                                        type="button" 
                                                        className="px-2 py-1 hover:text-dark hover:bg-gray-200 rounded-sm"
                                                        onClick={() => openModal(user.id)}
                                                    >
                                                        <HiOutlineTrash className="size-4 " />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan={6} className="py-2 text-center">No users found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
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
                                    <p className="text-nowrap">per page</p>
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
                                                    key={i + 1}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`btn ${i + 1 === currentPage ? 'active' : ''}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button 
                                                type="button"
                                                title="Next"
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
            </div>
        </>

    );
};

export default Users;