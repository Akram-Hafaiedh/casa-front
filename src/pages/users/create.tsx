import { toast } from "react-toastify";
import useAxiosInstance from "../../utils/axiosInstance";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose, IoReturnDownBackOutline } from "react-icons/io5";
import moment from "moment";
import FileUpload from "../../components/FileUpload";
import Modal from "react-modal";
import InfoSection from "../../layouts/Info";
import { HiCamera, HiOutlineXMark } from "react-icons/hi2";



const UserCreate: React.FC = () => {
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

    const [userLogo, setUserLogo] = useState<string | null>(null);
    const [userLogoFile, setUserLogoFile] = useState<File | null>(null);
    
    // Contract fields
    const [isContractVisible, setIsContractVisible] = useState(false);
    const [contractType, setContractType] = useState('');
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().add(1, 'year').format('YYYY-MM-DD'));
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
        { value: 'pending', label: 'Pending' },
        { value: 'terminated', label: 'Terminated' },
    ];

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleRemoveUserLogo = () => {
        setUserLogo(null);
        setUserLogoFile(null);
    };
    const handleUserLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target.files?.[0];
        if(file){
            setUserLogoFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setUserLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData  = {
                first_name : firstName,
                last_name : lastName,
                logo : userLogoFile,
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
        <>
        <div className="container-fixed">
            <InfoSection
                title="New employee"
                description="Create a new employee on the platform"
                actions={[
                    {
                        type: 'link',
                        text: 'Employees List',
                        to: '/users',
                        icon: <IoReturnDownBackOutline />,
                        iconPosition: 'start'
                    },
                ]}
            />
        </div>

        <form onSubmit={handleSubmit} className="container-fixed" >
            <div className="grid gap-5 lg:gap-7.5 mx-auto">
                {/* Create User Card */}
                <div className="card pb-2.5">

                    <div className="card-body grid gap-5">
                    {/* Profile Photo */}
                        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56">Photo</label>
                            <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                                <span className="text-2sm font-medium text-gray-600">150x150px JPEG, PNG Image</span>
                                <input 
                                    title="Upload User Logo"
                                    className="hidden"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUserLogoChange}
                                />
                                <div className="image-input size-16">
                                {userLogo && (
                                    <button 
                                        title="remove"
                                        onClick={handleRemoveUserLogo}
                                        type="button" 
                                        className="btn btn-icon btn-icon-xs btn-light shadow absolute z-1 !size-5 -top-0.5 -end-0.5 rounded-full"
                                        >
                                        <HiOutlineXMark className="size-6" />
                                    </button>
                                )}
                                    <div
                                        className={`image-input-placeholder rounded-full border-2 ${userLogo ? 'border-success': 'border-gray-300'}`}
                                        style={{ backgroundImage: "url('/images/blank.png')" }}
                                    >
                                    {userLogo && <img src={userLogo} alt="logo" />}
                                        <div 
                                            className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-dark-clarity absolute"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <HiCamera className="fill-light opacity-80" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Info Fields */}
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="first_name">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text" 
                                className="input" 
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                type="text" 
                                className="input" 
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                className="input"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="email">
                                Email
                            </label>
                            <input 
                                type="email"
                                className="input"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="birthday">
                                Birthday
                            </label>
                            <input 
                                id="birthday"
                                type="date"
                                className="input"
                                placeholder="Enter email"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="address">
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                className="input"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="postal_code">
                                Postal Code
                            </label>
                            <input
                                id="postal_code"
                                type="text"
                                className="input"
                                placeholder="Enter postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="city">
                                City
                            </label>
                            <input 
                                id="city"
                                type="text"
                                className="input"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                            <label className="form-label max-w-56" htmlFor="id_passport">
                                ID / Passport
                            </label>
                            <input
                                id="id_passport"
                                type="text"
                                className="input"
                                placeholder="Enter ID / Passport"
                                value={idPassport}
                                onChange={(e) => setIdPassport(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
                            <label className="form-label max-w-56" htmlFor="ahv_number">
                                AHV Number
                            </label>
                            <input
                                id="ahv_number"
                                type="text"
                                className="input"
                                placeholder="Enter AHV Number"
                                value={ahvNumber}
                                onChange={(e) => setAhvNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
                            <label className="form-label max-w-56" htmlFor="role">
                                Role
                            </label>
                            <div className="flex flex-col w-full gap-2">
                                <label className="form-label flex items-center gap-2.5">
                                    <input className="radio"
                                        name="administrator"
                                        title="administrator"
                                        type="radio"
                                        value="Administrator"
                                        checked={role === 'Administrator'}
                                        onChange={(e) => setRole(e.target.value)} 
                                    />
                                    Administrator
                                </label>
                                <label className="form-label flex items-center gap-2.5">
                                    <input className="radio"
                                        name="employee"
                                        title="employee"
                                        type="radio"
                                        value="Employee"
                                        checked={role === 'Employee'}
                                        onChange={(e) => setRole(e.target.value)} 
                                    />
                                    Employee
                                </label>
                                <label className="form-label flex items-center gap-2.5">
                                    <input className="radio"
                                        name="manager"
                                        title="manager"
                                        type="radio"
                                        value="Manager"
                                        checked={role === 'Manager'}
                                        onChange={(e) => setRole(e.target.value)} 
                                    />
                                    Manager
                                </label>
                            </div>
                        </div>
                        <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
                            <label className="form-label max-w-56" htmlFor="copy_id_document">
                                Copy of ID Document
                            </label>
                            <div className="w-full">
                                <FileUpload 
                                    label="Copy of ID Document" 
                                    accept="image/*" 
                                    onChange={(file) => setCopyIdDocuments(file)} 
                                />
                            </div>

                        </div>
                        {/* User Contract Fields */}
                        {isContractVisible &&(
                            <>
                            <div className="border-b border-gray-300"></div>
                            
                            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-56" htmlFor="contract_type">
                                    Contract Type
                                </label>
                                <select
                                    id="contract_type"
                                    className="select"
                                    value={contractType}
                                    onChange={(e) => setContractType(e.target.value)}>
                                    {contractTypeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-56" htmlFor="start_date">
                                    Contract Start Date
                                </label>
                                <input
                                    id="start_date"
                                    type="date"
                                    className="input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-56" htmlFor="end_date">
                                    Contract End Date
                                </label>
                                <input
                                    id="end_date"
                                    type="date"
                                    className="input"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-56" htmlFor="id_passport">
                                    Contract Status
                                </label>
                                <select
                                    id="id_passport"
                                    className="select"
                                    value={contractStatus}
                                    onChange={(e) => setContractStatus(e.target.value)}>
                                    {contractStatusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
                                <label className="form-label max-w-56" htmlFor="contract_document">
                                    Contract Document
                                </label>
                                <div className="w-full">
                                    <FileUpload 
                                        label="Contract Document" 
                                        accept=".pdf,.doc,.docx" 
                                        onChange={(file) => setContractDocuments(file)} 
                                    />
                                </div>

                            </div>
                            </>
                        )}


                        <div className="flex gap-2.5 justify-end">
                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary">Create Employee</button>
                            </div>
                            <button
                                    type="button"
                                    onClick={() => setIsContractVisible(!isContractVisible)}
                                    className="btn btn-primary"
                                >
                                    {isContractVisible ? 'Hide Contract' : 'Show Contract'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default UserCreate;
