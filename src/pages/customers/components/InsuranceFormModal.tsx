// components/modals/InsuranceFormModal.tsx
import { Fragment, useEffect, useState } from "react";
import { Insurance, statusOptions } from "../../../types/Insurance";
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import useAxiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";

interface InsuranceFormModalProps {
    initialInsurance?: Insurance | null;
    customerId: number;
    onSave: (insurance: Omit<Insurance, 'id'>) => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
}
const InsuranceFormModal: React.FC <InsuranceFormModalProps> = ({ isOpen, initialInsurance, customerId, onSave, onClose }) => {
  const axiosInstance = useAxiosInstance();
  const [insuranceData, setInsuranceData] = useState<Omit<Insurance, 'id'>>(
    initialInsurance || { 
      agency: '', 
      type: '', 
      policy_number: 0, 
      inception_date: new Date(), 
      expiration_date: new Date(), 
      status: 1, 
      cancellation_period: 1, 
      payment_amount: 0, 
      payment_frequency: 'Mensuel', 
    }
  );

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


  useEffect(() => {
    if (initialInsurance) {
      setInsuranceData(initialInsurance);
    }
  }, [initialInsurance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response
      if (initialInsurance) {
        response = await axiosInstance.put(`/customers/${customerId}/insurances/${initialInsurance.id}`, insuranceData);
      } else {
        response = await axiosInstance.post(`/customers/${customerId}/insurances`, insuranceData);
      }
      if (response?.data?.status?.code === 200 || response?.data?.status?.code === 201) {
        toast.success(response.data.status.message);
        await onSave(response.data.data.insurance);
        onClose();
      }
      if (response.data.status.code === 400){
        Object.keys(response.data.errors).forEach((key) => {
            response.data.errors[key].forEach((error: string) => {
                toast.error(`${error}`);
            });
        });
      }

    } catch (error) {
        console.error('Error creating / updating insurance:', error);
        toast.error('An error occurred while creating the insurance. Please try again later');
    }
  };

  if (!isOpen) return null;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} as="div" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900 pl-7">
              {initialInsurance ? 'Edit Insurance' : 'Create New Insurance'}
            <Description as="p" className="text-sm text-gray-500 mb-4">
              {initialInsurance ? 'Edit existing insurance details' : 'Add a new insurance configuration'}
            </Description>
            </DialogTitle>
            <button type="button" title="Close" className="p-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
              <HiOutlineXMark className="h-6 w-6" />
            </button>
          </div>
  
          {/* Body */}
          <div className="mt-4">
            
            <form onSubmit={handleSubmit} className="px-4">
              {/* Form fields */}
                {/* Agency input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="agency">
                    Agency
                  </label>
                  <select
                    id="agency"
                    value={insuranceData.agency}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, agency: e.target.value }))}
                    className="select flex-1"
                    required
                  >
                    <option value="" disabled>Select an agency</option>
                    {agencyOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Type input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    value={insuranceData.type}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, type: e.target.value }))}
                    className="select flex-1"
                    required
                  >
                    <option value="" disabled>Select a type</option>
                    {insuranceTypes.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Policy number input */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="policyNumber">
                Policy Number
                  </label>
                  <input
                    type="text"
                    id="policyNumber"
                    value={insuranceData.policy_number}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, policyNumber: e.target.value }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Inception date input */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="inceptionDate">
                Inception Date
                  </label>
                  <input
                    type="date"
                    id="inceptionDate"
                    value={moment(insuranceData.inception_date).format('YYYY-MM-DD')}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, inceptionDate: new Date(e.target.value) }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Expiration date input */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="expirationDate">
                Expiration Date
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    value={moment(insuranceData.expiration_date).format('YYYY-MM-DD')}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, expirationDate: new Date(e.target.value) }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Status select */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
                  Status
                  </label>
                  <select
                    id="status"
                    value={insuranceData.status}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, status: Number(e.target.value) }))}
                    className="select flex-1"
                    required
                  >
                    {statusOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Cancellation period input */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="cancellationPeriod">
                Cancellation Period
                  </label>
                  <input
                    type="number"
                    id="cancellationPeriod"
                    value={insuranceData.cancellation_period}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, cancellationPeriod: parseInt(e.target.value) }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Payment amount input */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="paymentAmount">
                Payment Amount
                  </label>
                  <input
                    type="number"
                    id="paymentAmount"
                    value={insuranceData.payment_amount}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, paymentAmount: parseFloat(e.target.value) || 0 }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Payment frequency select */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="paymentFrequency">
                  Payment Frequency
                  </label>
                  <select
                    id="paymentFrequency"
                    value={insuranceData.payment_frequency}
                    onChange={(e) => setInsuranceData(prev => ({ ...prev, paymentFrequency: e.target.value }))}
                    className="select flex-1"
                    required
                  >
                    {paymentFrequencyOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
  
              {/* Footer */}
              <div className="mt-6">
                <div className="flex gap-4 justify-end">
                  <button type="button" onClick={onClose} className="btn btn-light btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </Transition>
  );
};

export default InsuranceFormModal;

