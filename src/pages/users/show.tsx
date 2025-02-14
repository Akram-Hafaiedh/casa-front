import { useCallback, useEffect, useState } from "react";
import HomeLayout from '../../layouts/PrivateLayout';
import Sidebar from '../../components/Sidebar';
import { User } from "../../types/User";
import useAxiosInstance from "../../utils/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaLocationArrow, FaLocationDot, FaPhone } from "react-icons/fa6";
import { TbCalendarUser } from "react-icons/tb";
import { LiaFileContractSolid } from "react-icons/lia";
import Avatar from "react-avatar";
import { IoMail } from "react-icons/io5";
import { FaCaretDown } from 'react-icons/fa';
import { Contract } from "../../types/Contract";
import FileUpload from "../../components/FileUpload";
import Swal from "sweetalert2";
import { UserDocument } from "../../types/UserDocument";
import { toast } from "react-toastify";

const UserDetails = () => {

    const navigate = useNavigate();
    // const storageUrl = import.meta.env.VITE_REACT_APP_STORAGE_URL;
    const { userId } = useParams<{ userId: string }>();
    const axiosInstance = useAxiosInstance();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [overviewUser, setOverviewUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isContractTabDisabled, setIsContractTabDisabled] = useState(true);
    const [contract, setContract] = useState<Contract | null>(null);
    const [contractDocuments, setContractDocuments] = useState<File | null>(null);

    const defaultContract: Contract = {
        type: "permanent",
        start_date: new Date(),
        end_date: new Date(),
        status: "active",
        user_id: '',
    };

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Terminated", value: "terminated" },
    ];

    const contractTypeOptions = [
        { value: 'permanent', label: 'Permanent Employment' },
        { value: 'fixed-term', label: 'Fixed Term Employment' },
        { value: 'part-time', label: 'Part-Time Employment' },
        { value: 'mini-job', label: 'Mini-Job Employment' },
        { value: 'intern', label: 'Internship' },
        { value: 'freelance', label: 'Freelancer' },
        { value: 'work-services', label: 'Work & Services' },
        { value: 'training', label: 'Training' },
    ];

    const handleContractChange = (field : keyof Contract, value : string | Date) => {
        setContract((prevContract) => {
            if (!prevContract) return null;
            return { ...prevContract, [field]: value };
        });

    }

    useEffect(() => {
        console.log('contract', contract);
    }, [contract]);

    const fetchUser = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            if (response.data.status.code == 200) {
                const userData = response.data.data.user;
                setUser(userData);
                if(userData?.contract) {
                    setContract(userData.contract)
                    setIsContractTabDisabled(false); 
                }else{
                    setIsContractTabDisabled(true);
                };
                setContractDocuments(userData?.contract && userData?.documents && userData?.documents.find((doc:UserDocument) => doc.type === 'contract')?.path);
                setOverviewUser({...userData}); // This is a shallow copy of the user
            } else {
                navigate('/404');
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    }, [axiosInstance, userId, navigate]);

    const handleAddContractClick = () => {
        if (contract){
            toast.error('User already have a contract');
            return;
        }
        setContract(defaultContract);
        setActiveTab("contract");
        setIsContractTabDisabled(false);
    };

    const handleCancelContractClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to cancel adding a contract ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsContractTabDisabled(true);
                setActiveTab('profile');
                setContract(null);
            }
        })
    };

    const handleAction = (string: string) => {
        console.log(string);
    };

    const handleSubmitContract = () => {
        console.log('submit', contract);
        if (!user || !contract) return;
        // setIsAddingContract(false);
        // setActiveTab("profile");
    };
    

    useEffect(() => {
        fetchUser();
    }, []);
    

    if (loading) return <div>Loading ...</div>
    if (!user || !overviewUser || error) return <div>Error fetching user: {error}</div>;
    return (
        <HomeLayout sidebar={<Sidebar />}>
        <div>
            <div className="flex items-center justify-between">
                <h1 className="mb-4 text-2xl font-bold">Employee Details</h1>
                {/* <button type="button" onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded">Add User</button> */}
                <Link to="/users/create" className="px-4 py-2 text-white bg-blue-500 rounded">Add Employee</Link>
            </div>
            {/* Overview with Tabs */}
            <div className="bg-white relative">
                {/* Overview */}
                <div className="border-b border-gray-200">
                    <div className="flex flex-row p-4 gap-4">
                        <Avatar name={overviewUser.first_name + " " + overviewUser.last_name } size="130" round={false} className="rounded-md" />
                        <div>
                            <h1 className="text-2xl font-bold">{overviewUser.first_name + " " + overviewUser.last_name}</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                                <p className="text-gray-500 mt-2 flex items-center gap-2">
                                    <IoMail className="text-xl" />
                                    <span>{overviewUser.email}</span>
                                </p>
                                <p className="text-gray-500 mt-1 flex items-center gap-2">
                                    <TbCalendarUser className="text-xl" />
                                    <span>{overviewUser.role.name}</span>
                                </p>
                                <p className="text-gray-500 mt-1 flex items-center gap-2">
                                    <FaPhone className="text-xl" />
                                    <span>{overviewUser.phone}</span>
                                </p>
                                <div className="col-span-2 text-gray-500 mt-1 flex items-center gap-2">
                                    <FaLocationArrow className="text-xl" />
                                    <div>
                                        <span>{overviewUser?.address}, {overviewUser?.city}, {overviewUser?.postal_code}</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-1 flex items-center gap-2">
                                    <LiaFileContractSolid className="text-xl" />
                                    <span>{overviewUser?.contract ? overviewUser?.contract.type.charAt(0).toUpperCase() + overviewUser?.contract.type.slice(1) + " Contract": "No Contract"}</span>
                                </p>    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute right-4 top-4">
                    <button type="button"
                        className="px-4 py-2 text-gray-500 flex items-center gap-2"
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Actions <FaCaretDown />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                            <button
                                type="button"
                                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left ${contract?.user_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleAddContractClick}
                                disabled={contract?.user_id ? true : false}>
                                Add Contract
                            </button>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => handleAction('add_payroll')}>
                                Add Payroll
                            </a>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                    <button
                        type="button"
                        className={`px-4 py-4 ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    <button
                        type="button"
                        disabled={isContractTabDisabled}
                        className={`px-4 py-2 ${activeTab === "contract" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"} ${ isContractTabDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => setActiveTab("contract")}
                    >
                        Contract
                    </button>
                </div>
            </div>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div>               
                        <h2 className="text-2xl font-semibold mb-6">Personal Information:</h2>
                        {/* User Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={user.first_name}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="last_name">Last Name</label>
                                <input
                                    id="last_name"
                                    type="text"
                                    value={user.last_name}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="birthday">Birthday</label>
                                <input
                                    id="birthday"
                                    type="date"
                                    value={moment(user.birthday).format("YYYY-MM-DD")}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={user.phone}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={user.address}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="city">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    value={user.city}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="id_passport">ID / Passport</label>
                                <input
                                    id="id_passport"
                                    type="text"
                                    value={user.id_passport}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="ahv_number">AHV Number</label>
                                <input
                                    id="ahv_number"
                                    type="text"
                                    value={user.ahv_number}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="postal_code">Postal Code</label>
                                <input
                                    id="postal_code"
                                    type="text"
                                    value={user.postal_code}
                                    readOnly
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                        </div>
                        {/* <div>
                            <label className="block text-sm text-gray-600 mt-4" htmlFor="copy_id">Documents</label>
                            <ul>
                                {user.documents && user.documents.copy_id && (
                                    <li>
                                        <div className="flex items-center">
                                            <FaImage className="inline-block w-6 h-6 mr-1" />
                                            <span className="mr-1">COPY ID</span>
                                            <a className="text-blue-500 hover:underline" href={ storageUrl +'/'+ user.documents.copy_id} target="_blank" rel="noopener noreferrer">View</a>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div> */}
                    </div>
                )}

                {/* Contract Tab */}
                {activeTab === "contract" && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Contract Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="type">Type</label>
                                <select
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                    id="type"
                                    value={contract?.type}
                                    disabled={user.contract ? true : false}
                                    onChange={(e) => handleContractChange('type', e.target.value)}
                                >
                                    {contractTypeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="start_date">Start Date</label>
                                    <input
                                        type="text"
                                        id="start_date"
                                        value={moment(contract?.start_date).format("YYYY-MM-DD")}
                                        onChange={(e) => handleContractChange('start_date', new Date(e.target.value))}
                                        readOnly={user.contract ? true : false}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                    />
                            </div>
                            {contract?.status !== "active" && (<div>
                                <label className="block text-sm text-gray-600" htmlFor="end_date">End Date</label>
                                
                                    <input
                                        id="end_date"
                                        type="text"
                                        value={moment(contract?.end_date).format("YYYY-MM-DD")}
                                        onChange={(e) => handleContractChange('end_date', new Date(e.target.value))}
                                        readOnly={user.contract ? true : false}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                    />
                            </div>
                            )}
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="status">Status</label>
                                <select 
                                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                                    id="status"
                                    value={contract?.status}
                                    onChange={(e) => handleContractChange('status', e.target.value)}
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1 md:col-span-2 h-full">
                                <FileUpload 
                                    label="Contract Document" 
                                    accept=".pdf,.doc,.docx" 
                                    onChange={(file) => setContractDocuments(file)} 
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCancelContractClick}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmitContract}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </HomeLayout>
    );          
}

export default UserDetails;
