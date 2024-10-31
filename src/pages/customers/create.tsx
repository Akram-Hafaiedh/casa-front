import HomeLayout from "../../layouts/PrivateLayout";
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import { useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { toast } from "react-toastify";
import { Portfolio } from "../../types/Portfolio";


const CustomerCreate: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const [step, setStep] = useState(0);
  const steps = ['Client Info', 'Insurance', 'Accounting', 'Taxes'];
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    email: '',
    idPassport: '',
    portfolio: {
      insurances: [
        {
          type: '',
          agency: '',
          policy_number: '',
          inception_date: '',
          expiration_date: '',
          status: '',
          cancellation_period: 1,
          payment_amount: '',
          payment_frequency: '',
        },
      ],
      accountings: [
        {
          contract_start_date: '',
          tax_included: 0,
          status: '',
          documents: null,
        }
      ],
      taxes: [
        {
          name: '',
          percentage: '',
          type: '',
          documents: null,
        }
      ],
    },
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };


  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, field: keyof Portfolio) => {
    const { name, value, type } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      portfolio: {
        ...prevClient.portfolio,
        [field]: {
          ...prevClient.portfolio[field],
          [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      },
    }));
  };

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/clients', client);
      if (response.data.status.code === 201) {
        toast.success(response.data.status.message);
        setClient({
          firstName: '',
          lastName: '',
          birthDate: '',
          phone: '',
          address: '',
          postalCode: '',
          city: '',
          email: '',
          idPassport: '',
          portfolio: {
            insurances: [
              {
                type: '',
                agency: '',
                policy_number: '',
                inception_date: '',
                expiration_date: '',
                status: '',
                cancellation_period: 1,
                payment_amount: '',
                payment_frequency: '',
              },
            ],
            accountings: [
              {
                contract_start_date: '',
                tax_included: 0,
                status: '',
                documents: null,
              }
            ],
            taxes: [
              {
                name: '',
                percentage: '',
                type: '',
                documents: null,
              }
            ],
          }
        });
      }
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };
  return (
    <HomeLayout sidebar={<Sidebar />}>
    <div>
        <div className="flex items-center justify-between">
            <h1 className="mb-4 text-2xl font-bold">Create Customer</h1>
            <Link to="/customers" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Back to Customers</Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          {steps.map((label, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setStep(index)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${step === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Client Information</h2>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="date" name="birthDate" placeholder="Birth Date" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="city" placeholder="City" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="idPassport" placeholder="ID/Passport" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Portfolio - Insurances</h2>

              <input type="text" name="type" placeholder="Type" onChange={(e) => handlePortfolioChange(e, 'assurances')} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="agency" placeholder="Agency" onChange={(e) => handlePortfolioChange(e, 'assurances')} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="insuranceNumber" placeholder="Insurance Number" onChange={(e) => handlePortfolioChange(e, 'assurances')} className="w-full p-2 border rounded mb-2" />
              <input type="date" name="startDate" placeholder="Start Date" onChange={(e) => handlePortfolioChange(e, 'assurances')} className="w-full p-2 border rounded mb-2" />
              <input type="date" name="endDate" placeholder="End Date" onChange={(e) => handlePortfolioChange(e, 'assurances')} className="w-full p-2 border rounded mb-2" />
              
              <input type="number" name="cancellationPeriod" placeholder="Cancellation Period (months)" onChange={(e) => handlePortfolioChange(e, 'assurances[0]')} />
            <input type="number" name="paymentAmount" placeholder="Amount to Pay" onChange={(e) => handlePortfolioChange(e, 'assurances[0]')} />
            <input type="text" name="paymentFrequency" placeholder="Payment Frequency" onChange={(e) => handlePortfolioChange(e, 'assurances[0]')} />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Portfolio - Accountings</h2>
            <input type="date" name="contractStartDate" placeholder="Contract Start Date" onChange={(e) => handlePortfolioChange(e, 'accounting')} className="w-full p-2 border rounded mb-2" />
            <label className="flex items-center space-x-2">
              <span>Tax Included:</span>
              <input type="checkbox" name="taxIncluded" onChange={(e) => handlePortfolioChange(e, 'accounting')} />
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Portfolio - Taxes</h2>
            <input type="file" name="documents" multiple onChange={(e) => handlePortfolioChange(e, 'taxes')} />
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Back
            </button>
          )}
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
    </HomeLayout>
  )
}


export default CustomerCreate