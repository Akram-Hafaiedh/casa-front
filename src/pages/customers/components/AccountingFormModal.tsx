// components/modals/AccountingFormModal.tsx
import { Fragment, useEffect, useState } from "react";
import { Accounting } from "../../../types/Accounting";
import { Description, Dialog, DialogPanel, DialogTitle, Switch, Transition } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import useAxiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { statusOptions } from "../../../types/Insurance";

interface AccountingFormModalProps {
    initialAccounting?: Accounting | null;
    customerId: number;
    onSave: (accounting: Omit<Accounting, 'id'>) => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
}
const AccountingFormModal: React.FC <AccountingFormModalProps> = ({ isOpen, initialAccounting, customerId, onSave, onClose }) => {
  const axiosInstance = useAxiosInstance();
  const [accountingData, setAccountingData] = useState<Omit<Accounting, 'id'>>(initialAccounting || {
    start_date: new Date(),
    tax_included: 0,
    status: 1,
    documents: null,
  });

  useEffect(() => {
    if (initialAccounting) {
      setAccountingData(initialAccounting);
    }
  }, [initialAccounting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response
      if (initialAccounting) {
        response = await axiosInstance.put(`/customers/${customerId}/accountings/${initialAccounting.id}`, accountingData);
      } else {
        response = await axiosInstance.post(`/customers/${customerId}/accountings`, accountingData);
      }
      if (response?.data?.status?.code === 200 || response?.data?.status?.code === 201) {
        toast.success(response.data.status.message);
        await onSave(response.data.data.accounting);
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
        console.error('Error creating / updating accounting:', error);
        toast.error('An error occurred while creating the accounting. Please try again later');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length) {
      setAccountingData(prev => ({ ...prev, documents: e.target.files[0] }));
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
              {initialAccounting ? 'Edit Accounting' : 'Create New Accounting'}
            <Description as="p" className="text-sm text-gray-500 mb-4">
              {initialAccounting ? 'Edit existing accounting details' : 'Add a new accounting configuration'}
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
                {/* Start date input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={moment(accountingData.start_date).format('YYYY-MM-DD')}
                    onChange={(e) => setAccountingData(prev => ({ ...prev, start_date: new Date(e.target.value) }))}
                    className="input flex-1"
                    required
                  />
                </div>
  
                {/* Tax included input */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="taxIncluded">
                        Tax Included
                    </label>
                    <Switch
                    checked={accountingData.tax_included === 1}
                    onChange={(value) => setAccountingData(prev => ({ ...prev, tax_included: value ? 1 : 0 }))}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600"                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                    </Switch>
                </div>
  

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
                    Status
                    </label>
                    <select
                    id="status"
                    value={accountingData.status}
                    onChange={(e) => setAccountingData(prev => ({ ...prev, status: Number(e.target.value) }))}
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
  
                {/* Documents input */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="documents">
                        Documents
                    </label>
                    <input
                        type="file"
                        id="documents"
                        onChange={handleFileChange}
                        className="input flex-1"
                    />
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

export default AccountingFormModal;

