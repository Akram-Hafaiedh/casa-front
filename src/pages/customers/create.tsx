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
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { Insurance } from "../../types/Insurance";
import { Accounting } from "../../types/Accounting";
import { Tax } from "../../types/Tax";
const CustomerCreate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const axiosInstance = useAxiosInstance();
  const [step, setStep] = useState<number>(0);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState(0);
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [idPassport, setIdPassport] = useState('');

  const [insurances, setInsurances] = useState<Insurance[]>([
    {
      type: '',
      agency: '',
      policy_number: 0,
      inception_date: new Date(),
      expiration_date: new Date(),
      status: '',
      cancellation_period: 1,
      payment_amount: 0,
      payment_frequency: '',
    }
  ]);

  const [accountings, setAccountings] = useState<Accounting[]>([
    {    
      start_date: new Date(),
      tax_included: 0,
      status: '',
      documents: null as File[] | null
    }
  ])

  const statusOptions = [
    { value: 0, label: "Active" },
    { value: 1, label: "Inactive" },
    { value: 2, label: "Pending" },
    { value: 3, label: "Cancelled" },
    { value: 4, label: "Expired" },
    { value: 5, label: "Suspended" },
  ];

    const [taxes, setTaxes] = useState<Tax[]>([
    {
      name: '',
      type: 'percentage',
      value: 0,
      documents: null as File[] | null
    }
  ]);
  

  const steps = [
    {
        title: 'Client Info',
        description: 'Description for Step 1',
        component: <ClientInfo 
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          birthday={birthday}
          setBirthday={setBirthday}
          gender={gender}
          setGender={setGender}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          city={city}
          setCity={setCity}
          email={email}
          setEmail={setEmail}
          idPassport={idPassport}
          setIdPassport={setIdPassport}
        />,
    },
    {
        title: 'Insurances',
        description: 'Description for Step 2',
        component: <ClientInsurances
          insurances={insurances}
          setInsurances={setInsurances} 
          statusOptions={statusOptions} 
        />,
    },
    {
        title: 'Accountings',
        description: 'Description for Step 3',
        component: <ClientAccountings
          accountings={accountings}
          setAccountings={setAccountings}
          statusOptions={statusOptions}
        />,
    },
    {
        title: 'Taxes',
        description: 'Description for Step 4',
        component: <ClientTaxes 
          taxes={taxes}
          setTaxes={setTaxes}
        />,
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
    const data = {
      firstName,
      lastName,
      email,
      birthday,
      gender,
      phone,
      address,
      postalCode,
      city,
      idPassport,
      insurances,
      taxes,
      accountings
    }
    console.log(data);
    try {
      const response = await axiosInstance.post('/customers/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status.code === 201) {
        toast.success(response.data.status.message);
        // setClient();
      }
      if(response.data.status.code === 400 ){
        Object.keys(response.data.errors).forEach((key) => {
            response.data.errors[key].forEach((error: string) => {
                toast.error(`${error}`);
            });
        });
      }
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('An error occurred while creating the client please contact support.');
    }
  };

  return (
    <div>
        <div className="container-fixed">
        {/* <div className="flex items-center justify-between">
            <h1 className="mb-4 text-2xl font-bold">Create Customer</h1>
            <Link to="/customers" className="px-4 py-2 text-white bg-blue-500 rounded-sm hover:bg-blue-700 flex items-center space-x-4">
              <IoReturnDownBackOutline /> <span>Customers List</span>
            </Link>
        </div> */}
        <InfoSection
          title="Create Customer"
          description="Fill out the form below to create a new customer."
          actions={[
            {
                type: 'link',
                text: 'Customers List',
                to: '/customers',
                icon: <IoReturnDownBackOutline />,
                iconPosition: 'start'
            },
        ]}
        />
      </div>
      

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
              <div className="card-body py-16!">
                {steps.map((step, index) => (
                  <div key={index} className={`flex items-center justify-center font-semibold text-gray-900 ${index + 1 === currentStep ? '' : 'hidden'}`} id={`step-${index + 1}`}>
                      {step.component}
                  </div>   
                ))}
              </div>
              <div className="card-footer py-8 flex justify-between">
                <div>
                  <button type="button" className={`btn btn-light ${currentStep === 1 ? 'hidden!' : ''}`} onClick={handlePreviousStep}>
                      Back
                  </button>
                </div>
                <div>
                  <button type="button" className={`btn btn-light ${currentStep === steps.length ? 'hidden!' : ''}`} onClick={handleNextStep}>
                      Next
                  </button>
                  
                  <button type="submit" className={`btn btn-primary ${currentStep === steps.length ? '' : 'hidden!'}`}>
                      Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


export default CustomerCreate


interface ClientInfoProps {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  birthday: string;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  postalCode: number;
  setPostalCode: React.Dispatch<React.SetStateAction<number>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  idPassport: string;
  setIdPassport: React.Dispatch<React.SetStateAction<string>>;
}

const ClientInfo: React.FC<ClientInfoProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthday,
  setBirthday,
  gender,
  setGender,
  phone,
  setPhone,
  address,
  setAddress,
  postalCode,
  setPostalCode,
  city,
  setCity,
  email,
  setEmail,
  idPassport,
  setIdPassport,
}) => {
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
          type="number"
          name="postal-code"
          id="postal-code"
          value={postalCode}
          placeholder="5405"
          onChange={(e)=>setPostalCode(Number(e.target.value))}
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
  insurances: Insurance[];
  setInsurances: React.Dispatch<React.SetStateAction<Insurance[]>>;
  statusOptions: {value: number, label: string}[]
}



const ClientInsurances: React.FC<ClientInsurancesProps> = ({
  insurances,
  setInsurances,
  statusOptions
}) => {

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

  // const [insurances, setInsurances] = useState<Insurance[]>([
  //   {
  //     type: '',
  //     agency: '',
  //     policy_number: '',
  //     inception_date: new Date(),
  //     expiration_date: new Date(),
  //     status: '',
  //     cancellation_period: 1,
  //     payment_amount: 0,
  //     payment_frequency: '',
  //   }
  // ])

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
    <div className="grid gap-5 lg:gap-7.5 w-full mx-auto">
      {insurances.map((insurance, index) => (
        <div key={index} className="card pb-2.5">
          <div className="card-header">
            <h3 className="card-title">Insurance #{index + 1}</h3>
            <div className="card-toolbar">
              <button
                type="button"
                title="Remove Insurance"
                onClick={() => removeInsurance(index)}
              >
                <HiOutlineXMark className="size-4" />
              </button>
            </div>
          </div>
          <div className="card-body grid gap-5 grid-cols-1 xl:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="type">Insurance Type</label>
              <select
                id="type"
                name="type"
                value={insurance.type}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="select"
              >
                {insuranceTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="agency">Agency</label>
              <select
                id="agency"
                name="agency"
                value={insurance.agency}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="select"
              >
                {agencyOptions.map((agency, idx) => (
                  <option key={idx} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="policy_number">Policy Number</label>
              <input
                type="text"
                name="policy_number"
                value={insurance.policy_number}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="input"
                placeholder="Enter policy number"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="inception_date">Inception Date</label>
              <input
                type="date"
                id="inception_date"
                name="inception_date"
                value={moment(insurance.inception_date).format("YYYY-MM-DD")}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="payment_amount">Payment Amount</label>
              <input
                type="number"
                placeholder="1000"
                title="Payment Amount"
                name="payment_amount"
                value={insurance.payment_amount}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="payment_frequency">Payment Frequency</label>
              <select
                id="payment_frequency"
                name="payment_frequency"
                value={insurance.payment_frequency}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="select"
              >
                {paymentFrequencyOptions.map((frequency, idx) => (
                  <option key={idx} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
            </div>

            {/* Cancellation Period */}
            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="cancellation_period">Cancellation Period (Months)</label>
              <input
                id="cancellation_period"
                type="number"
                name="cancellation_period"
                value={insurance.cancellation_period}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="input"
                min={1}
                max={12}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={insurance.status}
                onChange={(e) => handleInsuranceChange(e, index)}
                className="select"
              >
                {statusOptions.map((status, idx) => (
                  <option key={idx} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
          </div>          
        </div>
      ))}
      <button
        type="button"
        onClick={addInsurance}
        className="btn btn-primary flex items-center gap-2 w-fit"
      >
        <HiOutlinePlus /> Add Insurance
      </button>
    </div>
  )
}

interface ClientAccountingsProps {
  accountings: Accounting[]
  setAccountings: React.Dispatch<React.SetStateAction<Accounting[]>>
  statusOptions: {value: number, label: string}[]
}

const ClientAccountings: React.FC<ClientAccountingsProps> = ({
  accountings,
  setAccountings,
  statusOptions
}) => {

  const addAccounting = () => {
    setAccountings([...accountings, {
      start_date: new Date(),
      tax_included: 0,
      status: '',
      documents: null
    }])
  }

  const removeAccounting = (index: number) => {
    if (accountings.length === 1) {
      toast.error("You cannot remove the last accounting.");
      return;
    }
    const updatedAccountings = [...accountings];
    updatedAccountings.splice(index, 1);
    setAccountings(updatedAccountings);
  };

  const handleAccountingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >, index: number) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
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
    <div className="grid gap-5 w-full">
      {accountings.map((accounting, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <h2 className="card-title">Accounting #{index + 1}</h2>
            <div className="card-tooltip">
              <button
                title="remove insurance"
                type="button"
                onClick={() => removeAccounting(index)}
              >
                <HiOutlineXMark className="size-4" />
              </button>
            </div>
          </div>
          <div className="card-body grid gap-5 grid-cols-1 xl:grid-cols-3">

            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="start_date">Start Date</label>

              <input
                  title="Start Date"
                  type="date"
                  name="start_date"
                  value={moment(accounting.start_date).format('YYYY-MM-DD')} 
                  onChange={(e) => handleAccountingChange(e, index)}
                  className="input"
                />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="form-label" htmlFor="status">
                Status
              </label>
              <select
                title="Status"
                id="status"
                name="status"
                value={accounting.status}
                onChange={(e) => handleAccountingChange(e, index)}
                className="select"
              >
                {statusOptions.map((status, index) => (
                  <option key={index} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="tva_included" className="form-label">
                TVA Included
              </label>
              <div className="switch switch-sm h-full">
                <input 
                  className="order-2"
                  name="tva_included"
                  id="tva_included"
                  type="checkbox"
                  onChange={() => handleSwitchChange(index)}
                  value={accounting.tax_included}
                  checked={accounting.tax_included === 1} 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 col-span-3">
              <label htmlFor="documents" className="form-label">
                Accounting Documents
              </label>
              <DropZone 
                label={`Upload Documents ${index + 1}`}
                onChange={(files) => handleAccountingFileChange(files, index)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>
      </div>
      ))}
      
      <button
        type="button"
        onClick={addAccounting}
        className="btn btn-primary w-fit flex items-center gap-2.5"
      >
        <HiOutlinePlus /> Add Another Accounting
      </button>
    </div>
  )
}

interface ClientTaxesProps {
  taxes: Tax[];
  setTaxes: React.Dispatch<React.SetStateAction<Tax[]>>
}

const ClientTaxes: React.FC<ClientTaxesProps> = ({
  taxes,
  setTaxes
}) => {

  const removeTax = (index: number) => {
    if (taxes.length === 1) {
      toast.error("You cannot remove the last tax.");
      return;
    }
    const updatedTaxes = [...taxes];
    updatedTaxes.splice(index, 1);
    setTaxes(updatedTaxes);
  }
  const addTax = () => {
    setTaxes([...taxes, {
      name: '',
      type: 'percentage',
      value: 0,
      documents: null as File[] | null
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

  const handleChangeTaxType = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const taxtype = e.target.value;
    const updatedTaxes = [...taxes];
    updatedTaxes[index] = {...updatedTaxes[index], type: taxtype };
    setTaxes(updatedTaxes);
  }

  const handleTaxFileChange = (files: File[], index: number) => {
    setTaxes(prevTaxes => {
      const updatedTaxes = [...prevTaxes];
      updatedTaxes[index] = {...updatedTaxes[index], documents: files}
      return updatedTaxes;
    })
  }
  return (
    <div className="grid gap-5 w-full">
      {taxes.map((tax, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <div className="card-title">
              <h3>Tax #{index + 1}</h3>
            </div>
            <div className="card-tooltip">
              <button
                title="remove tax"
                type="button"
                onClick={() => removeTax(index)}
              >
                <HiOutlineXMark className="size-4" />
              </button>
            </div>
          </div>
          <div className="card-body grid gap-5">
            <div className="flex items-center gap-2.5">
              <label className="form-label max-w-56" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={tax.name}
                placeholder="Tax Name"
                onChange={(e) => handleTaxChange(e, index)}
                className="input"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <label className="form-label max-w-56" htmlFor="value">Value</label>
              <input
                type="number"
                name="value"
                value={tax.value}
                placeholder="0"
                onChange={(e) => handleTaxChange(e, index)}
                className="input"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <label className="form-label max-w-56" htmlFor={`type-${index}`}>Type</label>
              <div className="flex items-center gap-2">
                  <label key="percentage" className="radio-label flex items-center gap-2">
                    <input
                      type="radio"
                      name={`type-${index}`} 
                      value="percentage"
                      checked={tax.type === "percentage"}
                      onChange={(e) => handleChangeTaxType(e, index)}
                      className="radio"
                    />
                    <span>Percentage</span>
                  </label>
                  <label key="fixed" className="radio-label flex items-center gap-2">
                    <input
                      type="radio"
                      name={`type-${index}`}
                      value="fixed"
                      checked={tax.type === "fixed"}
                      onChange={(e) => handleChangeTaxType(e, index)}
                      className="radio"
                    />
                    <span>Fixed Amount</span>
                  </label>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <label className="form-label max-w-56" htmlFor="value">Value</label>
              <DropZone 
                label={`Upload Documents ${index + 1}`}
                onChange={(files) => handleTaxFileChange(files, index)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addTax}
        className="btn btn-primary w-fit"
      >
        <HiOutlinePlus /> Add Another Tax
      </button>
    </div>
  )
}
