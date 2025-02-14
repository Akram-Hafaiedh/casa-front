import { useCallback, useEffect, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../types/Customer";
import InfoSection from "../../layouts/Info";
import MenuItem from "../../components/menu/MenuItem";
import moment from "moment";
import { HiOutlineArrowNarrowLeft, HiOutlineUserAdd } from "react-icons/hi";
import Loader from "../../components/Loader";

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();
    const { customerId } = useParams<{ customerId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [overviewCustomer, setOverviewCustomer] = useState<Customer>();

    const fetchCustomer = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/customers/${customerId}`);
            if (response.data.status.code == 200) {
                const customerData = response.data.data.customer;
                setOverviewCustomer(customerData)
            } else {
                console.error('Error fetching user data:', response.data.status.message);
                // navigate('/projects');
            }
        } catch (error: unknown) {
            console.error(error);
            // navigate('/customers');
        } finally {
            setLoading(false);
        }
    }, [axiosInstance, navigate ,customerId]);

    useEffect(() => {
        fetchCustomer();
        console.log(overviewCustomer);
    }, []);

    const updateCustomer = (customer: Customer) => {
        
        setOverviewCustomer(customer);
    };

    if (loading) return <Loader isLoading={loading} />;
    if (!overviewCustomer) return <div className="text-center py-10">Customer not found</div>;
    const {
        full_name,
        birthday,
        phone,
        gender,
        address,
        postal_code,
        city,
        email,
        id_passport
    } = overviewCustomer;
    return (
        <>
            <div className="container-fixed">
                <InfoSection 
                    title="Customer Details"
                    description="Manage your customer information and settings."
                    actions={[
                        {
                            type: 'link',
                            text: 'Create New Customer',
                            to: '/customers/create',
                            icon: <HiOutlineUserAdd className="text-2xl"/>,
                            iconPosition: 'start'
                        },
                        {
                            type: 'link',
                            text: 'Customers List',
                            to: `/customers`,
                            icon: <HiOutlineArrowNarrowLeft className="text-2xl"/>,
                            iconPosition: 'start'
                        }
                    ]}
                />
            </div>

            <div className="container-fixed">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="col-span-1">
                        <div className="card pt-15">
                            <div className="card-body">
                                <div className="card-header flex items-center flex-col">
                                    <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xl size-24 text-primary-inverse ring-primary-light bg-primary mb-4">
                                        {full_name
                                            .split(' ')
                                            .map((word) => word.charAt(0).toUpperCase())
                                            .join('')}
                                    </span>
                                    <a href="#" className="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">
                                        {overviewCustomer.full_name}            
                                    </a>
                                    <a href="#" className="fs-5 fw-semibold text-muted hover:text-primary">
                                        {email} 
                                    </a>
                                </div>
                                <div className="card-body pt-4 pb-3">
                                    <table className="table-auto">
                                        <tbody>
                                            <tr>
                                                <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    Age
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {moment().diff(moment(birthday), 'years')} years old
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    Gender
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {gender}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    Phone
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {phone}
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    Address
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {address}
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    Postal Code
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {postal_code}
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    City
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {city}
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    ID/Passport
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    {id_passport}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm text-gray-600 pb-3.5 pe-3">
                                                    Country
                                                </td>
                                                <td className="text-sm text-gray-900 pb-3.5">
                                                    Germany
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="grid">
                            <div className="overflow-x-auto">
                                <div className="menu gap-3">
                                    <MenuItem path={`/customers/${customerId}/overview`} label="Overview" />
                                    <MenuItem path={`/customers/${customerId}/taxes`} label="Taxes" />
                                    <MenuItem path={`/customers/${customerId}/insurances`} label="Insurances" />
                                    <MenuItem path={`/customers/${customerId}/accountings`} label="Accountings" />
                                    <MenuItem path={`/customers/${customerId}/files`} label="Files" />
                                    <MenuItem path={`/customers/${customerId}/settings`} label="Settings" />
                                </div>
                            </div>
                        </div>
                        <Outlet context={{overviewCustomer, updateCustomer}} />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Layout