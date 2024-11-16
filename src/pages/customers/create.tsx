import { useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { toast } from "react-toastify";
import { Client } from "../../types/Client";
import Switch from "../../components/Switch";
import { FaUser, FaCog, FaGlobe, FaCheckCircle, FaArrowRight, FaPlus  } from 'react-icons/fa';
import { IoReturnDownBackOutline } from "react-icons/io5";
import moment from "moment";
import DropZone from "../../components/DropZone";
import { FaCheck, FaXmark } from "react-icons/fa6";
import InfoSection from "../../layouts/Info";
const CustomerCreate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // const axiosInstance = useAxiosInstance();
  const [step, setStep] = useState<number>(0);
  const statusOptions = [
    "Active",
    "Inactive",
    "Pending",
    "Cancelled",
    "Expired",
    "Suspended",
  ];

  const steps = [
    {
        title: 'Client Info',
        description: 'Description for Step 1',
        component: <ClientInfo />,
    },
    {
        title: 'Insurances',
        description: 'Description for Step 2',
        component: <ClientInsurances statusOptions={statusOptions} />,
    },
    {
        title: 'Accountings',
        description: 'Description for Step 3',
        component: <ClientAccountings statusOptions={statusOptions} />,
    },
    {
        title: 'Taxes',
        description: 'Description for Step 4',
        component: <ClientTaxes />,
    },
  ];
  

  const handleNextStep = () => {
    // console.log(client);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePreviousStep = () => {
    // console.log(client);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(client);
    // try {
    //   const response = await axiosInstance.post('/customers', client,{
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   if (response.data.status.code === 201) {
    //     toast.success(response.data.status.message);
    //     setClient();
    //   }else {
    //     toast.error(response.data.status.message);
    //   }
    // } catch (error) {
    //   console.error('Error creating client:', error);
    //   toast.error('An error occurred while creating the client');
    // }
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

        <div className="container-fixed">
          <form className="w-full" onSubmit={handleCreate}>
            <div data-stepper="true">
              <div className="card">
                <div className="card-header flex justify-between items-center gap-4 py-8">
                  {steps.map((step,index)=> (
                    <div 
                        key={index}
                        className={`flex gap-2.5 items-center ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`} data-stepper-item="#stepper_1">
                        <div className={`rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse`}>
                            <span className="stepper-item-completed:hidden" data-stepper-number="true">
                                {index + 1}
                            </span>
                            <FaCheck className="text-xl hidden stepper-item-completed:inline" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h4 className="text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600">
                                {step.title}
                            </h4>
                            <span className="text-2sm text-gray-700 stepper-item-completed:text-gray-400">
                                {step.description}
                            </span>
                        </div>
                    </div>
                  ))}
                </div>
                <div className="card-body !py-16">
                  {steps.map((step, index) => (
                    <div key={index} className={`flex items-center justify-center font-semibold text-gray-900 ${index + 1 === currentStep ? '' : 'hidden'}`} id={`step-${index + 1}`}>
                        {step.component}
                    </div>   
                  ))}
                </div>
                <div className="card-footer py-8 flex justify-between">
                  <div>
                    <button type="button" className={`btn btn-light ${currentStep === 1 ? '!hidden' : ''}`} onClick={handlePreviousStep}>
                        Back
                    </button>
                  </div>
                  <div>
                    <button type="button" className={`btn btn-light ${currentStep === steps.length ? '!hidden' : ''}`} onClick={handleNextStep}>
                        Next
                    </button>
                    
                    <button type="submit" className={`btn btn-primary ${currentStep === steps.length ? '' : '!hidden'}`}>
                        Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default CustomerCreate


const ClientInfo: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [idPassport, setIdPassport] = useState('');
  return (
    <div className="grid gap-5 w-full">

      <div className="flex items-baseline gap-2.5">
        <label htmlFor="first-name" className="form-label max-w-56">First Name</label>
        <input 
          type="text"
          id="first-name"
          name="first-name"
          value={firstName}
          placeholder="John"
          onChange={(e)=>setFirstName(e.target.value)}
          className="input"
        />
        
      </div>

      <div className="flex items-baseline gap-2.5">
        <label htmlFor="last-name" className="form-label max-w-56">Last Name</label>
        <input 
          type="text"
          id="last-name"
          name="last-name"
          value={lastName}
          placeholder="Doe"
          onChange={(e)=>setLastName(e.target.value)}
          className="input"
        />
      </div>
    
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="email" className="form-label max-w-56">Email</label>
        <input 
          type="email"
          name="email"
          value={email}
          placeholder="johnDoe@example.com"
          onChange={(e)=>setEmail(e.target.value)}
          className="input"
        />
      </div>

      <div className="flex items-baseline gap-2.5">
        <label htmlFor="birthday" className="form-label max-w-56">Birth Date</label>
        <input 
          type="date"
          name="birthday"
          value={birthday}
          placeholder="1990-01-01"
          onChange={(e)=>setBirthday(moment(e.target.value).format('YYYY-MM-DD'))}
          className="input"
        />
      </div>
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="gender" className="form-label max-w-56">Gender</label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="select"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="phone" className="form-label max-w-56">Phone</label>
        <input 
          type="text"
          name="phone"
          id="phone"
          placeholder="25649778798"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="address" className="form-label max-w-56">Address</label>
        <input
          type="text"
          value={address}
          name="address"
          id="address"
          placeholder="Street of Life"
          onChange={(e)=>setAddress(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="postal-code" className="form-label max-w-56">Postal Code</label>
        <input
          type="text"
          name="postal-code"
          id="postal-code"
          value={postalCode}
          placeholder="5405"
          onChange={(e)=>setPostalCode(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="city" className="form-label max-w-56">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          placeholder="New York"
          onChange={(e)=>setCity(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex items-baseline gap-2.5">
        <label htmlFor="id-passport" className="form-label max-w-56">ID/Passport</label>
        <input
          type="text"
          value={idPassport}
          name="id-passport"
          id="id-passport"
          placeholder="6065123456"
          onChange={(e)=>setIdPassport(e.target.value)}
          className="input"
        />
      </div>
    </div>
  )
}

interface ClientInsurancesProps {
  statusOptions: string[]
}
interface ClientAccountingsProps {
  statusOptions: string[]
}


const ClientInsurances: React.FC<ClientInsurancesProps> = ({statusOptions}) => {

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
  const agencyOptions = [
    "Agenturen",
    "MN Broker",
    "Markler Zentrum",
    "Helve",
  ];

  const paymentFrequencyOptions = [
    "Mensuel",
    "Trimestriel",
    "Semestriel",
    "Annuel",
  ];

  const [insurances, setInsurances] = useState([
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
    }
  ])

  const addInsurance = () => {
    setInsurances([...insurances, {
      type: '',
      agency: '',
      policy_number: '',
      inception_date: new Date(),
      expiration_date: new Date(),
      status: '',
      cancellation_period: 1,
      payment_amount: 0,
      payment_frequency: '',
    }]);
  }

  const handleInsuranceChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    const updatedInsurances = insurances.map((insurance, i) =>
      i === index ? { ...insurance, [name]: value } : insurance
    );
    setInsurances(updatedInsurances);
  };

  const removeInsurance = (index: number) => {
    if(index === 0) {
      toast.error("You cannot remove the last insurance.");
      return;
    }

    setInsurances(insurances.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      {insurances.map((insurance, index) => (
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
  )
}
const ClientAccountings: React.FC<ClientAccountingsProps> = ({statusOptions}) => {
  const [accountings, setAccountings] = useState([
    {    
      start_date: new Date(),
      tax_included: 0,
      status: '',
      documents: null as File[] | null
    }
  ])

  const addAccounting = () => {
    setAccountings([...accountings, {
      start_date: new Date(),
      tax_included: 0,
      status: '',
      documents: null
    }])
  }

  const removeAccounting = (index: number) => {
    const updatedAccountings = [...accountings];
    updatedAccountings.splice(index, 1);
    setAccountings(updatedAccountings);
  };

  const handleAccountingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >, index: number) => {
    const { name, value, type, checked } = e.target;
    const updatedAccountings = [...accountings];
    updatedAccountings[index] = {
      ...updatedAccountings[index],
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    };
    setAccountings(updatedAccountings);
  };

  const handleAccountingFileChange = (files: File[], index: number) =>{
    setAccountings(prevAccountings => {
      const updatedAccountings = [...prevAccountings];
      updatedAccountings[index] = {...updatedAccountings[index], documents: files };
      return updatedAccountings;
    })
  }

  const handleSwitchChange = (index: number) => {
    setAccountings(prevAccountings => {
      const updatedAccountings = prevAccountings.map((accounting, i) =>
        i === index ? { ...accounting, tax_included: accounting.tax_included === 1 ? 0 : 1 } : accounting
      );
      return updatedAccountings;
    });
  };

  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Portfolio - Accountings</h2>
        {accountings.map((accounting, index) => (
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
  )
}


const ClientTaxes: React.FC = () => {
  const [taxes, setTaxes] = useState([
    {
      name: '',
      percentage: 0,
      type: '',
      documents: null as File[] | null
    }
  ]);
  const taxTypeOptions = [
    "Percentage",
    "Fixed Amount",
  ];

  const removeTax = (index: number) => {
    const updatedTaxes = [...taxes];
    updatedTaxes.splice(index, 1);
    setTaxes(updatedTaxes);
  }
  const addTax = () => {
    setTaxes([...taxes, {
      name: '',
      percentage: 0,
      type: ''
    }]);
  }

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value, type } = e.target;
    const updatedTaxes = [...taxes]
    updatedTaxes[index] = {
      ...updatedTaxes[index],
      [name]: type === 'number' ? Number(value) : value,
    }
    setTaxes(updatedTaxes);
  };

  const handleTaxFileChange = (files: File[], index: number) => {
    setTaxes(prevTaxes => {
      const updatedTaxes = [...prevTaxes];
      updatedTaxes[index] = {...updatedTaxes[index], documents: files}
      return updatedTaxes;
    })
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Portfolio - Taxes</h2>
      {taxes.map((tax, index) => (
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
            <label className="block text-sm font-bold mb-2" htmlFor="type">Type</label>
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
  )
}