import { HiOutlinePlus } from "react-icons/hi2";
import ClientRow from "../../../components/cards/ClientRow";
import { Customer } from "../../../types/Customer";
import { Link } from "react-router-dom";

interface ClientsCardProps {
    customers: Customer[]; // Use the correct type for your project data
}

const ClientsCard: React.FC<ClientsCardProps> = ({ customers = [] }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">Customers</h3>
    </div>
    <div className="card-table scrollable-x-auto min-h-[400px] flex flex-col justify-between items-center">
      <table className="table text-end">
      {customers.length > 0 && (
          <thead>
              <tr>
                  <th className="text-start min-w-[150px] text-gray-700!">Full Name</th>
                  <th className="min-w-[100px] text-gray-700!">Phone</th>
                  <th className="text-start min-w-52 text-gray-700!">Address</th>
                  <th className="min-w-[110px] text-gray-700!">Created At</th>
                  <th className="w-[30px]"></th>
              </tr>
          </thead>
        )}
        <tbody>
          {customers.length > 0 ? (
            customers.map(customer => (
              <ClientRow
                  id={customer.id!}
                  key={customer.id}
                  full_name={customer.full_name}
                  phone={customer.phone}
                  address={customer.address}
                  city={customer.city}
                  postal_code={customer.postal_code}
                  created_at={customer.created_at!}
              />
            ))
          ) : (
            <tr className="grow">
              <td colSpan={5} className="text-center pt-15 pb-15">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="max-w-md">
                    <img
                      src="/images/illustrations/4.svg"
                      className="max-w-full h-52 object-contain mx-auto"
                      alt="Add customers"
                    />
                  </div>
                  <div className="text-center mt-5">
                    <h4 className="text-gray-800 font-bold mb-3">No Customers Found</h4>
                    <p className="text-gray-600 text-sm font-semibold mb-6 text-center">
                      You have not added any customers yet. 
                      <br />
                      Please add a customer to get started.
                    </p>
                    <Link className="btn btn-primary px-6" to="/customers/create">
                      <HiOutlinePlus className="text-lg mr-2" />
                      Add Customer
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
            )}
        </tbody>
      </table>
      {customers.length > 4 && (
        <div className="card-footer justify-center">
          <Link className="btn btn-link" to="/customers">All Customers</Link>
        </div>
      )}
    </div>
  </div>
);

export default ClientsCard;

