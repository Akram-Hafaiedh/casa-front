import { toast } from "react-toastify";
import useAxiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import HomeLayout from '../../layouts/PrivateLayout';
import { Link, useNavigate } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";
import moment from "moment";
import FileUpload from "../../components/FileUpload";
import Modal from "react-modal";



const UserCreate: React.FC = () => {
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [idPassport, setIdPassport] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [ahvNumber, setAhvNumber] = useState('');
    const [copyIdDocuments, setCopyIdDocuments] = useState<File | null>(null);
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('Employee');
    
    // Contract fields
    const [isContractVisible, setIsContractVisible] = useState(false);
    const [contractType, setContractType] = useState('');
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));;
    const [contractStatus, setContractStatus] = useState('');
    const [contractDocuments, setContractDocuments] = useState<File | null>(null);

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

    const contractStatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'terminated', label: 'Terminated' },
    ];

    const togglePreview = () => {
        setIsPreviewVisible(!isPreviewVisible);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData  = {
                first_name : firstName,
                last_name : lastName,
                email,
                role,
                birthday,
                id_passport : idPassport,
                address,
                city,
                postal_code: postalCode,
                ahv_number: ahvNumber,
                documents: copyIdDocuments ?? null,
                // documents Name
                phone,
            }
            const contractData = {
                type: contractType,
                start_date: startDate,
                end_date: endDate,
                status: contractStatus,
                // documents Name
                contract_documents: contractDocuments,
            };

            const formData = new FormData();
            Object.entries(userData).forEach(([key, value]) => {
                if (key === 'documents' && value instanceof File) {
                    formData.append('documents', value);
                } else {
                    formData.append(key, value as string);
                }
            })
            if(isContractVisible){
                Object.entries(contractData).forEach(([key, value]) => {
                    if (key === 'contract_documents' && value instanceof File) {
                        formData.append('contract_documents', value);
                    }
                    else if (key === 'payroll_documents' && value instanceof File){
                        formData.append('payroll_documents', value); 
                    }
                     else {
                        formData.append(key, value as string);
                    }
                });
            }

            if (!userData.first_name || !userData.last_name || !userData.email || !userData.role) {
                toast.error('Please fill in all fields.');
                return;
            }
            const response = await axiosInstance.post('/users', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.status.code === 201) {
                toast.success(response.data.status.message);
                // onSave(response.data.data.user);
                navigate('/users');
            } else {
                toast.error(response.data.status.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('An error occurred while creating the user.');
        }
    }


    return (
        <HomeLayout sidebar={<Sidebar />}>
        <div>
            <div className="flex items-center justify-between">
                <h1 className="mb-4 text-2xl font-bold">Add Employee</h1>
                {/* <button type="button" onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded">Add User</button> */}
                <Link to="/users" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center space-x-4">
                    <IoReturnDownBackOutline /> <span>Employees List</span>
                </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Employee - Personnal Informations:</h2>
                <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">First Name:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="first_name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Last Name:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="last_name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthday">Birthday:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="birthday"
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_passport">ID/Passport:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="id_passport"
                            type="text"
                            value={idPassport}
                            onChange={(e) => setIdPassport(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postal_code">Postal Code:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="postal_code"
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ahv_number">AHV Number:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ahv_number"
                            type="text"
                            value={ahvNumber}
                            onChange={(e) => setAhvNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2 h-full">
                        <FileUpload 
                            label="Copy of ID Document" 
                            accept="image/*" 
                            onChange={(file) => setCopyIdDocuments(file)} 
                        />
                         {/* Add Preview Button */}
                        {copyIdDocuments && (
                            <button
                                type="button"
                                onClick={togglePreview}
                                className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                Preview Document
                            </button>
                        )}
                    </div>
                    {/* Modal for Previewing Image */}
                    {isPreviewVisible && copyIdDocuments && (
                        <Modal
                            isOpen={isPreviewVisible}
                            onRequestClose={togglePreview}
                            contentLabel="Image Preview"
                        >
                            <button
                                type="button"
                                onClick={togglePreview}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                Close
                            </button>
                            <div className="flex justify-center items-center h-full">
                                <img 
                                    src={URL.createObjectURL(copyIdDocuments)} 
                                    alt="ID Document Preview" 
                                    className="max-w-full max-h-full"
                                />
                            </div>
                        </Modal>
                    )}

                    
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role:</label>
                        <div className="flex items-center mt-4">
                            <input className="mr-2" id="admin" type="radio" value="Administrator" checked={role === 'Administrator'} onChange={(e) => setRole(e.target.value)} />
                            <label className="text-gray-700 text-sm font-bold" htmlFor="admin">Admin</label>
                            <input className="ml-4 mr-2" id="employee" type="radio" value="Employee" checked={role === 'Employee'} onChange={(e) => setRole(e.target.value)} />
                            <label className="text-gray-700 text-sm font-bold" htmlFor="employee">Employee</label>
                        </div>
                    </div>

                    
                    {isContractVisible &&(
                    <>
                        <h2 className="text-xl font-bold mb-4 mt-6 col-span-2 text-center">Contract Information:</h2>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Contract Type:</label>
                            <select
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white" 
                                id="contractType" 
                                value={contractType} 
                                onChange={(e) => setContractType(e.target.value)} 
                                required
                            >
                                <option value="">Select contract type</option>
                                {contractTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractStatus">Status:</label>
                            <select id="contractStatus"
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white" 
                                value={contractStatus}
                                onChange={(e) => setContractStatus(e.target.value)}>
                                <option value="">Select status</option>
                                {contractStatusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                                </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">Start Date:</label>
                            <input 
                                type="date" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                id="startDate" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">End Date:</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                id="endDate" 
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 h-full">
                            <FileUpload 
                                label="Contract Document" 
                                accept=".pdf,.doc,.docx" 
                                onChange={(file) => setContractDocuments(file)} 
                            />
                        </div>

                    </>
                    )}
                    <div className="flex justify-between items-center space-x-2 col-span-2 ml-auto">
                        <button type="submit" className="w-fit min-w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            Create Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsContractVisible(!isContractVisible)}
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            {isContractVisible ? 'Hide Contract Information' : 'Show Contract Information'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </HomeLayout>
    )
}

export default UserCreate;
