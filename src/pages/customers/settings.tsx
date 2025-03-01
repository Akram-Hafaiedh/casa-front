import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Customer } from "../../types/Customer";
import moment from "moment";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
const Settings: React.FC = () => {
    const axiosInstance = useAxiosInstance();
    const {overviewCustomer, updateCustomer} = useOutletContext<{overviewCustomer:Customer, updateCustomer(c: Customer): void}>()
    const [loading, setLoading] = useState(false);

    const [customer, setCustomer] = useState({
        first_name: overviewCustomer.first_name || "",
        last_name: overviewCustomer.last_name || "",
        company_name: overviewCustomer.companyName || "",
        birthday: moment(overviewCustomer.birthday).format("YYYY-MM-DD") || moment().format("YYYY-MM-DD"),
        phone: overviewCustomer.phone || "",
        address: overviewCustomer.address || "",
        postal_code: overviewCustomer.postal_code || "",
        city: overviewCustomer.city || "",
        email: overviewCustomer.email || "",
        id_passport: overviewCustomer.id_passport || "",
        gender: overviewCustomer.gender || "male",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        data.append('first_name', customer.first_name);
        data.append('last_name', customer.last_name);
        data.append('company_name', customer.company_name);
        data.append('birthday', customer.birthday);
        data.append('phone', customer.phone);
        data.append('address', customer.address);
        data.append('postal_code', customer.postal_code.toString());
        data.append('city', customer.city);
        data.append('email', customer.email);
        data.append('id_passport', customer.id_passport);
        data.append('gender', customer.gender);

        
        try {
        const response  = await axiosInstance.post(`/customers/${overviewCustomer.id}/settings`, data);
        if (response.data.status.code === 200) {
            toast.success(response.data.status.message);
            const updatedCustomer = response.data.data.customer;
            updateCustomer(updatedCustomer);
        }
        if (response.data.status.code === 400) {
            Object.keys(response.data.errors).forEach((key) => {
                response.data.errors[key].forEach((error: string) => {
                    toast.error(`${error}`);
                });
            });
        }
        } catch (error) {
            toast.error('Failed to update user please try again later');
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="card min-w-full">
            <form onSubmit={handleSubmit}>

                <div className="card-table scrollable-x-auto pb-3">
                    <table className="table align-middle text-sm text-gray-500">
                        <tbody>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    First Name
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        value={customer.first_name}
                                        placeholder="John"
                                        onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Last Name
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                <input
                                    type="text"
                                    id="last-name"
                                    name="last-name"
                                    value={customer.last_name}
                                    placeholder="Doe"
                                    onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
                                    className="input"
                                />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Email
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="email"
                                        name="email"
                                        value={customer.email}
                                        placeholder="johnDoe@example.com"
                                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Birth Date
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={customer.birthday}
                                        placeholder="1990-01-01"
                                        onChange={(e) => setCustomer({...customer, birthday: e.target.value})}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Gender
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <select
                                        title="Gender"
                                        id="gender"
                                        name="gender"
                                        value={customer.gender}
                                        onChange={(e) => setCustomer({ ...customer, gender: e.target.value })}
                                        className="select"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Phone
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="25649778798"
                                        value={customer.phone}
                                        onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Address
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="text"
                                        value={customer.address}
                                        name="address"
                                        id="address"
                                        placeholder="Street of Life"
                                        onChange={(e) => setCustomer({...customer, address: e.target.value})}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    Postal Code
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="number"
                                        name="postal-code"
                                        id="postal-code"
                                        value={customer.postal_code}
                                        placeholder="5405"
                                        onChange={(e) => setCustomer({...customer, postal_code: Number(e.target.value)})}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    City
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={customer.city}
                                        placeholder="New York"
                                        onChange={(e) => setCustomer({...customer, city: e.target.value})}
                                        className="input"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-600 font-normal">
                                    ID/Passport
                                </td>
                                <td className="py-2 text-gray-800 font-normaltext-sm">
                                    <input
                                        type="text"
                                        value={customer.id_passport}
                                        name="id-passport"
                                        id="id-passport"
                                        placeholder="6065123456"
                                        onChange={(e) => setCustomer({...customer, id_passport: e.target.value})}
                                        className="input"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer justify-end!">
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Settings
