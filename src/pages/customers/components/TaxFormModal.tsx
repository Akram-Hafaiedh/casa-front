// components/modals/TaxFormModal.tsx
import { Fragment, useEffect, useState } from "react";
import { Tax } from "../../../types/Tax";
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import useAxiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

interface TaxFormModalProps {
    initialTax?: Tax | null;
    customerId: number;
    onSave: (tax: Omit<Tax, 'id'>) => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
}
const TaxFormModal: React.FC <TaxFormModalProps> = ({ isOpen, initialTax, customerId, onSave, onClose }) => {
  const axiosInstance = useAxiosInstance();
  const [taxData, setTaxData] = useState<Omit<Tax, 'id'>>(
    initialTax || { 
      name: '', 
      value: 0, 
      type: 'percentage', 
      documents: null 
    }
  );

  useEffect(() => {
    if (initialTax) {
      setTaxData(initialTax);
    }
  }, [initialTax]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response
      if (initialTax) {
        response = await axiosInstance.put(`/customers/${customerId}/taxes/${initialTax.id}`, taxData);
      } else {
        response = await axiosInstance.post(`/customers/${customerId}/taxes`, taxData);
      }
      if (response?.data?.status?.code === 200 || response?.data?.status?.code === 201) {
        toast.success(response.data.status.message);
        await onSave(response.data.data.tax);
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
        console.error('Error creating / updating tax:', error);
        toast.error('An error occurred while creating the tax. Please try again later');
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
              {initialTax ? 'Edit Tax' : 'Create New Tax'}
            <Description as="p" className="text-sm text-gray-500 mb-4">
              {initialTax ? 'Edit existing tax details' : 'Add a new tax configuration'}
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
                {/* Name input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={taxData.name}
                    onChange={(e) => setTaxData(prev => ({ ...prev, name: e.target.value }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Value input */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="value">
                Value
                  </label>
                  <input
                    type="number"
                    id="value"
                    value={taxData.value}
                    onChange={(e) => setTaxData(prev => ({
                      ...prev,
                      value: parseFloat(e.target.value) || 0
                    }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Type radio buttons */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="type">
                  Type
                  </label>
                  <div className="flex gap-4">
                    {/* Radio buttons */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="percentage"
                        name="type"
                        value="percentage"
                        checked={taxData.type === 'percentage'}
                        onChange={(e) => setTaxData(prev => ({ ...prev, type: e.target.value }))}
                        className="radio"
                      />
                      <label htmlFor="percentage" className="ml-2">
                        Percentage
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="fixed"
                        name="type"
                        value="fixed"
                        checked={taxData.type === 'fixed'}
                        onChange={(e) => setTaxData(prev => ({ ...prev, type: e.target.value }))}
                        className="radio"
                      />
                      <label htmlFor="fixed" className="ml-2">
                        Fixed
                      </label>
                    </div>
                  </div>
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

export default TaxFormModal;
