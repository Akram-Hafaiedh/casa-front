import HomeLayout from "../../layouts/PrivateLayout";
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import { useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { toast } from "react-toastify";
import { Client } from "../../types/Client";
import Switch from "../../components/Switch";
import { FaUser, FaCog, FaGlobe, FaCheckCircle, FaArrowRight, FaPlus  } from 'react-icons/fa';
import { IoReturnDownBackOutline } from "react-icons/io5";
import moment from "moment";
import DropZone from "../../components/DropZone";
import { FaXmark } from "react-icons/fa6";
import InfoSection from "../../layouts/Info";
const CustomerCreate: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const [step, setStep] = useState<number>(0);
  const steps= [
    { label :'Client Info', icon: <FaUser />},
    { label :'Insurance', icon: <FaCog />},
    { label :'Accounting', icon: <FaGlobe />},
    { label :'Taxes', icon: <FaCheckCircle />},
  ];
  const [client, setClient] = useState<Client>({
    first_name: '',
    last_name: '',
    birthday: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    email: '',
    id_passport: '',
    portfolio: {
      insurances: [
        {
          type: '',
          agency: '',
          policy_number: '',
          inception_date: new Date(),
          expiration_date: new Date(),
          status: '',
          cancellation_period: 1,
          payment_amount: 0,
          payment_frequency: '',
        },
      ],
      accountings: [
        {
          start_date: new Date(),
          tax_included: 0,
          status: '',
          documents: null,
        }
      ],
      taxes: [
        {
          name: '',
          percentage: 0,
          type: '',
          documents: null,
        }
      ],
    },
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };


  const addAccounting = () => {
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        accountings: [
          ...prevClient.portfolio.accountings,
          {
            start_date: new Date(),
            tax_included: 0,
            status: '',
            documents: null,
          },
        ],
      },
    }));
  };
  const addInsurance = () => {
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        insurances: [
          ...prevClient.portfolio.insurances,
          {
            type: '',
            agency: '',
            policy_number: '',
            inception_date: new Date(),
            expiration_date: new Date(),
            status: '',
            cancellation_period: 1,
            payment_amount: 0,
            payment_frequency: '',
          },
        ],
      },
    }));
  };
  
  const removeAccounting = (index: number) => {
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        accountings: prevClient.portfolio.accountings.filter((_, i) => i !== index),
      },
    }));
  };

  const removeInsurance = (index: number) => {
    if(index === 0) {
      toast.error("You cannot remove the last insurance.");
      return;
    }
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        insurances: prevClient.portfolio.insurances.filter((_, i) => i !== index),
      },
    }));
  };

  

  const addTax = () => {
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        taxes: [
          ...prevClient.portfolio.taxes,
          { name: '', percentage: 0, type: '', documents: null },
        ],
      },
    }));
  };

  const removeTax = (index: number) => {
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        taxes: prevClient.portfolio.taxes.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAccountingFileChange = (files: File[], index: number) =>{
    setClient((prevClient) => {
      const portfolio = { ...prevClient.portfolio };
      portfolio.accountings[index].documents = files;
      return { ...prevClient, portfolio };
    });
  }

  const handleTaxFileChange = (files: File[], index: number) => {
    setClient((prevClient) => {
      const portfolio = { ...prevClient.portfolio };
      portfolio.taxes[index].documents = files;
      return { ...prevClient, portfolio };
    });
  }

  const handleNext = () => {
    console.log(client);
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1))
  };
  const handleBack = () => {
    console.log(client);
    setStep((prevStep) => Math.max(prevStep - 1, 0))
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(client);
    try {
      const response = await axiosInstance.post('/customers', client,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status.code === 201) {
        toast.success(response.data.status.message);
        setClient({
          first_name: '',
          last_name: '',
          birthday: '',
          phone: '',
          address: '',
          postal_code: '',
          city: '',
          email: '',
          id_passport: '',
          portfolio: {
            insurances: [
              {
                type: '',
                agency: '',
                policy_number: '',
                inception_date: new Date(),
                expiration_date: new Date(),
                status: '',
                cancellation_period: 1,
                payment_amount: 0,
                payment_frequency: '',
              },
            ],
            accountings: [
              {
                start_date: new Date(),
                tax_included: 0,
                status: '',
                documents: null,
              }
            ],
            taxes: [
              {
                name: '',
                percentage: 0,
                type: '',
                documents: null,
              }
            ],
          }
        });
      }else {
        toast.error(response.data.status.message);
      }
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('An error occurred while creating the client');
    }
  };

  const statusOptions = [
    "Active",
    "Inactive",
    "Pending",
    "Cancelled",
    "Expired",
    "Suspended",
  ];

  const agencyOptions = [
    "Agenturen",
    "MN Broker",
    "Markler Zentrum",
    "Helve",
  ];

  const taxTypeOptions = [
    "Percentage",
    "Fixed Amount",
  ];

  const paymentFrequencyOptions = [
    "Mensuel",
    "Trimestriel",
    "Semestriel",
    "Annuel",
  ];

  const insuranceTypes = [
    "Assurance Vie",
    "Assurance de voiture",
    "Assurance ménage",
    "Assurance responsabilité privé",
    "Assurance maladie",
    "KTG",
    "BVG",
    "UVG",
    "Assurance responsabilité civile professionnelle",
    "Assurance de chose",
    "Baugarantie",
  ];

  const handleAccountingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >, index: number) => {
    const { name, value, type, checked } = e.target;
    setClient((prevClient) => {
      const portfolio = { ...prevClient.portfolio };
      portfolio.accountings[index] = {
        ...portfolio.accountings[index],
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value
      };
      return { ...prevClient, portfolio };
    });
  };

  const handleSwitchChange = (index: number) => {
    setClient((prevClient) => {
      const updatedAccountings = prevClient.portfolio.accountings.map((accounting, i) =>
        i === index ? { ...accounting, tax_included: accounting.tax_included === 1 ? 0 : 1 } : accounting
      );
      return {
        ...prevClient,
        portfolio: {
          ...prevClient.portfolio,
          accountings: updatedAccountings,
        },
      };
    });
  };

  const handleInsuranceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value, type } = e.target;
    setClient((prevClient) => {
      const portfolio = { ...prevClient.portfolio };
      const insurances = [...portfolio.insurances];
      insurances[index] = {
        ...insurances[index],
        [name]: type === "number" ? Number(value) : value,
      };
      portfolio.insurances = insurances;
      return { ...prevClient, portfolio };
    });
  };
  
  

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value, type } = e.target;
    setClient((prevClient) => {
      const portfolio = { ...prevClient.portfolio };
      const taxes = [...portfolio.taxes];
      taxes[index] = {
        ...taxes[index],
        [name]: type === 'number' ? Number(value) : value,
      };
      portfolio.taxes = taxes;
      return { ...prevClient, portfolio };
    });
  };

  return (
    <div className="container-fixed">
    <div>
        {/* <div className="flex items-center justify-between">
            <h1 className="mb-4 text-2xl font-bold">Create Customer</h1>
            <Link to="/customers" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 flex items-center space-x-4">
              <IoReturnDownBackOutline /> <span>Customers List</span>
            </Link>
        </div> */}
        <InfoSection
          title="Create Customer"
          description="Fill out the form below to create a new customer."
          icon={<IoReturnDownBackOutline />}
          iconPosition="start"
          linkTo="/customers"
          linkText="Customers List"
        />

        <div className="flex items-center justify-between my-6 border-b p-6 bg-white rounded-md">
          {steps.map((stepObj, index) => (
            <div key={index} className="flex items-center">
              <button
                type="button"
                onClick={() => setStep(index)}
                className={`flex flex-col items-center px-4 py-2 rounded-full transition mx-24 ${step >= index 
                  ? ' text-blue-500' 
                  : ' text-gray-700'}`}
              >
                <div className={`text-4xl ${step >= index ? 'text-blue-500' : 'text-gray-500'}`}>
                  {stepObj.icon}
                </div>
                <span className="text-md font-semibold mt-4 text-nowrap">{index + 1}. {stepObj.label}</span>
              </button>
              {index < steps.length - 1 && (
                <span className={`mx-2 text-xl ${ step >= index ? 'text-blue-500' : 'text-gray-300' }`}><FaArrowRight /></span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold my-4 text-center">Client Information</h2>
            <div className="grid grid-cols-2 gap-4 mb-4 border-gray-400 border rounded-md p-4 border-dashed bg-gray-50">
            <div>
              <label htmlFor="first_name" className="font-semibold block mb-1">First Name</label>
              <input 
                type="text"
                name="first_name"
                value={client.first_name}
                placeholder="John"
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="font-semibold block mb-1">Last Name</label>
              <input 
                type="text"
                name="last_name"
                placeholder="Doe"
                value={client.last_name}
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold block mb-1">Email</label>
              <input 
                type="email"
                name="email"
                value={client.email}
                placeholder="johnDoe@example.com"
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="birthday" className="font-semibold block mb-1">Birth Date</label>
              <input 
                type="date"
                name="birthday"
                value={client.birthday}
                placeholder="1990-01-01"
                onChange={handleChange} 
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="gender" className="font-semibold block mb-1">Gender</label>
              <select
                id="gender"
                name="gender"
                value={client.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="font-semibold block mb-1">Phone</label>
              <input 
                type="text"
                name="phone"
                placeholder="25649778798"
                value={client.phone}
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="address" className="font-semibold block mb-1">Address</label>
              <input
                type="text"
                value={client.address}
                name="address"
                placeholder="Street of Life"
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="postal_code" className="font-semibold block mb-1">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                value={client.postal_code}
                placeholder="5405"
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="city" className="font-semibold block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={client.city}
                placeholder="New York"
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="id_passport" className="font-semibold block mb-1">ID/Passport</label>
              <input
                type="text"
                value={client.id_passport}
                name="id_passport"
                placeholder="6065123456"
                onChange={handleChange}
                className="bg-white w-full p-2 border rounded"
              />
            </div>
            
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Portfolio - Insurances</h2>
            {client.portfolio.insurances.map((insurance, index) => (
              <div key={index} className="mb-4 border border-dashed border-gray-400 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50">
                <div className="col-span-3 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Accounting #{index + 1}</h3>
                  <button
                    type="button"
                    title="Remove Insurance"
                    onClick={() => removeInsurance(index)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-fit text-red-500"
                  >
                    <FaXmark />
                  </button>
                </div>
                <div>
                  <label htmlFor="type" className="font-semibold block mb-1">Insurance Type</label>
                  <select
                    id="type"
                    name="type"
                    value={insurance.type}
                    title="Insurance Type"
                    onChange={(e) => handleInsuranceChange(e, index)} // Adjust the target as needed
                    className="w-full p-2 border rounded mb-2 bg-white"
                  >
                    <option value="">Select Insurance Type</option>
                    {insuranceTypes.map((insuranceType, index) => (
                      <option key={index} value={insuranceType}>
                        {insuranceType}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="agency" className="font-semibold block mb-1">Insurance Agency</label>
                  <select
                    name="agency"
                    id="agency"
                    title="Insurance Agency"
                    value={insurance.agency}
                    onChange={(e) => handleInsuranceChange(e, index)}
                    className="w-full p-2 border rounded mb-2 bg-white"
                  >
                    <option value="">Select Agency</option>
                    {agencyOptions.map((agency, index) => (
                      <option key={index} value={agency}>
                        {agency}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="policy_number" className="font-semibold block mb-1">Insurance Number</label>
                  <input
                    placeholder="6546465"
                    type="text"
                    title="Insurance Number"
                    name="policy_number"
                    value={insurance.policy_number}
                    onChange={(e) => handleInsuranceChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div>
                  <label htmlFor="start" className="font-semibold block mb-1">Inception Date</label>
                  <input 
                    type="date"
                    name="flex-1"
                    value={moment(insurance.inception_date).format('YYYY-MM-DD')}
                    title="Inception Date"
                    onChange={(e) => handleInsuranceChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                    />
                </div>
                <div>
                  <label htmlFor="expiration_date" className="font-semibold block mb-1">End Date</label>
                  <input 
                    type="date"
                    name="expiration_date"
                    value={moment(insurance.expiration_date).format('YYYY-MM-DD')}
                    title="End Date"
                    placeholder="End Date"
                    onChange={(e) => handleInsuranceChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="font-semibold block mb-1">Status</label>
                  <select
                    name="status"
                    id="status"
                    value={insurance.status}
                    title="Status"
                    onChange={(e) => handleInsuranceChange(e, index)}
                    className="w-full p-2 border rounded mb-2 bg-white"
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Cancellation Period</label>
                  <div className="flex items-center space-x-2 mb-2">
                    <label htmlFor="cancellation_period" className="font-tight block mb-1">
                      Cancellation Before
                    </label>
                    <input
                      type="number"
                      value={insurance.cancellation_period}
                      id="cancellation_period"
                      name="cancellation_period"
                      placeholder="1-12"
                      min="1"
                      max="12"
                      onChange={(e) => handleInsuranceChange(e, index)}
                      className="flex-1 p-2 border rounded"
                    />
                    <span className="font-tight">months</span>
                  </div>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Payment Amount</label>
                  <div className="flex items-center space-x-2 mb-2">
                    <label htmlFor="payment_amount">
                      Amount
                    </label>
                    <input
                      value={insurance.payment_amount}
                      type="number"
                      id="payment_amount"
                      name="payment_amount"
                      placeholder="2000"
                      onChange={(e) => handleInsuranceChange(e, index)}
                      className="flex-1 p-2 border rounded"
                    />
                    <span>CHF</span>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="payment_frequency" className="font-semibold block mb-1">
                    Payment Frequency
                  </label>
                  <select
                    id="payment_frequency"
                    title="Payment Frequency"
                    value={insurance.payment_frequency}
                    name="payment_frequency"
                    onChange={(e) => handleInsuranceChange(e, index)}
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Select Payment Frequency</option>
                    {paymentFrequencyOptions.map((paymentFrequency, index) => (
                      <option key={index} value={paymentFrequency}>
                        {paymentFrequency}
                    </option>
                    ))}
                  </select>
                </div>
               
              </div>
            ))}
             <div className="col-span-3">
              <button type="button" onClick={addInsurance} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit flex items-center space-x-4">
                <FaPlus/> <span>Add Accounting</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Portfolio - Accountings</h2>
            {client.portfolio.accountings.map((accounting, index) => (
              <div key={index} className="mb-4 border bg-gray-50 border-gray-400 border-dashed p-4 rounded-md shadow grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Contract Start Date */}
                <h3 className="text-lg font-bold mb-2">Accounting #{index + 1}</h3>
                <span></span>
                <button
                  type="button"
                  onClick={() => removeAccounting(index)}
                  className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
                >
                  Remove Accounting
                </button>
                <div>
                  <label htmlFor="start_date" className="block mb-1">Start Date</label>

                  <input
                    title="Start Date"
                    type="date"
                    name="start_date"
                    value={moment(accounting.start_date).format('YYYY-MM-DD')} 
                    onChange={(e) => handleAccountingChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div>

                
                  <label htmlFor="status" className="font-semibold block mb-1">
                    Status
                  </label>
                  <select
                    title="Status"
                    id="status"
                    name="status"
                    value={accounting.status}
                    onChange={(e) => handleAccountingChange(e, index)}
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Select The Contract Status</option>
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                    </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-end mt-6">
                  <Switch
                    isChecked={accounting.tax_included === 1}
                    onChange={() => handleSwitchChange(index)}
                    label="TVA"
                  />
                </div>


                {/* File input for documents */}
                <div className="block mb-2 cursor-pointer col-span-3">
                  {/* <input
                    type="file"
                    name="documents"
                    onChange={(e) => handleAccountingChange(e, index)} // Adjust handling as needed
                    className="hidden" // Hide the default file input
                  /> */}
                  <DropZone 
                    label={`Upload Documents ${index + 1}`}
                    onChange={(files) => handleAccountingFileChange(files, index)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addAccounting}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Another Accounting
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Portfolio - Taxes</h2>
            {client.portfolio.taxes.map((tax, index) => (
              <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 bg-gray-50 border-gray-400 border-dashed rounded-md shadow">
                  <h3 className="text-lg font-bold mb-2 col-span-2">Tax #{index + 1}</h3>

                  <button
                    type="button"
                    onClick={() => removeTax(index)}
                    className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-fit ml-auto"
                  >
                    Remove Tax
                  </button>
                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tax.name}
                    placeholder="Tax Name"
                    onChange={(e) => handleTaxChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div>
                  {/* TODO: This needs to be changed to value */}
                  <label className="block text-sm font-bold mb-2" htmlFor="percentage">Percentage</label>
                  <input
                    type="number"
                    name="percentage"
                    value={tax.percentage}
                    placeholder="Tax Percentage"
                    onChange={(e) => handleTaxChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div>
                  {/* TODO: This needs to be changed to select with types : percentage, amount */}
                  <label className="block text-sm font-bold mb-2" htmlFor="type">Type</label>
                  {/* <input
                    type="text"
                    name="type"
                    value={tax.type}
                    placeholder="Tax Type"
                    onChange={(e) => handleTaxChange(e, index)}
                    className="w-full p-2 border rounded mb-2"
                  /> */}
                  <select 
                    title="Type"
                    id="type"
                    name="type"
                    value={tax.type}
                    onChange={(e) => handleTaxChange(e, index)}
                    className="w-full p-3 border rounded mb-2 bg-white"  
                  >
                    <option value="">Select The Tax Type</option>
                    {taxTypeOptions.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                    </option>
                    ))}
                  </select>
                </div>
                {/* Tailwind Styled File Input */}
                <div className="block mb-2 cursor-pointer col-span-3">
                  <DropZone 
                    label={`Upload Documents ${index + 1}`}
                    onChange={(files) => handleTaxFileChange(files, index)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  {/* <span className="inline-block px-4 py-2 text-center text-white bg-blue-500 rounded hover:bg-blue-600">
                    Upload Documents
                  </span>
                  <input
                    type="file"
                    name="documents"
                    onChange={(e) => handleTaxChange(e, index)} // Adjust handling as needed
                    className="hidden" // Hide the default file input
                  /> */}
                </div>

              </div>
            ))}
            <button
              type="button"
              onClick={addTax}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Another Tax
            </button>
          </div>
        )}


        <div className="flex justify-between mt-6 border-t pt-6">
          {step > 0 ? (
            <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Back
            </button>
          ): <div></div>}
          {step < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Next
            </button>          
            ) : (
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Submit
            </button>
        )}
        </div>
      </form>
    </div>
    </div>
  )
}


export default CustomerCreate