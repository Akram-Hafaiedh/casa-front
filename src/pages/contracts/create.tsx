import { useState, useEffect } from "react";
import HomeLayout from '../../layouts/PrivateLayout';
import Sidebar from '../../components/Sidebar';
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Contract } from "../../types/Contract";
import { User } from "../../types/User";
import { Link } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import FileUpload from "../../components/FileUpload";
import InfoSection from "../../layouts/Info";

const ContractCreate: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const [contract, setContract] = useState<Contract>({
        type: '',
        start_date: new Date(),
        end_date: new Date(),
        user_id: '',
        status: '',
    });

    const [contractDocuments, setContractDocuments] = useState<File | null>(null);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/employees');
                setUsers(response.data.data.employees);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleContractChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setContract((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleContractSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

            const data = {
                type: contract.type,
                start_date: moment(contract.start_date).format('YYYY-MM-DD'),
                end_date: moment(contract.end_date).format('YYYY-MM-DD'),
                user_id: contract.user_id,
                status: contract.status,
                ...(contractDocuments && { contract_document: contractDocuments }),
            }
            const response = await axiosInstance.post('/contracts', data);
            if (response.data.status.code === 201) {
                toast.success(response.data.status.message);
                setContract({
                    type: '',
                    start_date: new Date(),
                    end_date: new Date(),
                    user_id: '',
                    status: '',
                });
            } else {
                toast.error(response.data.status.message);
            }
        } catch (error) {
            console.log('Error creating contract:', error);
        }
    };

    return (
        <div className="container-fixed">
            <div>
                {/* <div className="flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Create Contract</h1>
                    <Link to="/contracts" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center space-x-4">
                        <IoReturnDownBackOutline /> <span>Contracts List</span>
                    </Link>
                </div> */}
                <InfoSection 
                    title="Create Contract"
                    description="Fill out the form below to create a new contract."
                    actions={[
                        { 
                            type: 'link',
                            text: 'Contracts List',
                            to: '/contracts',
                            icon: <IoReturnDownBackOutline />,
                            iconPosition: 'start'
                        }
                    ]}
                />
                <form onSubmit={handleContractSubmit} className="p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="type">Type</label>
                        <select
                            id="type"
                            className="block w-full px-4 py-3 border rounded-md bg-white"
                            name="type"
                            value={contract.type}
                            onChange={handleContractChange}
                        >
                            <option value="">Select type</option>
                            <option value="permanent">Permanent Employment</option>
                            <option value="fixed-term">Fixed Term Employment</option>
                            <option value="part-time">Part-Time Employment</option>
                            <option value="mini-job">Mini-Job Employment</option>
                            <option value="intern">Internship</option>
                            <option value="freelance">Freelancer</option>
                            <option value="work-services">Work & Services</option>
                            <option value="training">Training</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="start_date">Start Date</label>
                        <input
                            id="start_date"
                            type="date"
                            className="block w-full px-4 py-2 border rounded-md"
                            name="start_date"
                            value={moment(contract.start_date).format('YYYY-MM-DD')}
                            onChange={handleContractChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="end_date">End Date</label>
                        <input
                            id="end_date"
                            type="date"
                            className="block w-full px-4 py-2 border rounded-md"
                            name="end_date"
                            value={moment(contract.end_date).format('YYYY-MM-DD')}
                            onChange={handleContractChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="user_id">Employee</label>
                        <select
                            id="user_id"
                            className="block w-full px-4 py-3 border rounded-md bg-white"
                            name="user_id"
                            value={contract.user_id}
                            onChange={handleContractChange}
                        >
                            <option value="">Select employee</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="status">Status</label>
                        <select
                            id="status"
                            className="block w-full px-4 py-3 border rounded-md bg-white"
                            name="status"
                            value={contract.status}
                            onChange={handleContractChange}
                        >
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <FileUpload 
                            label="Contract Document" 
                            accept=".pdf,.doc,.docx" 
                            onChange={(file) => setContractDocuments(file)} 
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Create Contract</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContractCreate;

