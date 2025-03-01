import { Link, useOutletContext, useParams } from "react-router-dom"
import { Customer } from "../../types/Customer"
import moment from "moment";
import { Insurance } from "../../types/Insurance";

const Overview = () => {

  const { overviewCustomer, updateCustomer} = useOutletContext<{overviewCustomer:Customer, updateCustomer(c: Customer): void}>()
  const { customerId } = useParams<{ customerId: string }>();
  const stats = [
    { label: 'Taxes', value: overviewCustomer.taxes.length },
    { label: 'Insurances', value: overviewCustomer.insurances.length },
    { label: 'Accountings', value: overviewCustomer.accountings.length },
    { label: 'Files', value: overviewCustomer.documents?.length ?? 0 },
  ]
  const statusOptions = [
    { value: 0, label: "Active" },
    { value: 1, label: "Inactive" },
    { value: 2, label: "Pending" },
    { value: 3, label: "Cancelled" },
    { value: 4, label: "Expired" },
    { value: 5, label: "Suspended" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5 mt-4">
      <div className="col-span-2">
        <div className="card">
          <div className="card-body">
            <div className="flex lg:px-10 py-1.5 gap-2">
              {stats.map((stat, index) => (
                <>
                  <div
                    key={index}
                    className="flex-1 flex flex-col gap-1 text-center"
                  >
                    <span className="text-gray-900 text-2xl lg:text-2-5xl leading-none font-semibold">
                      {stat.value}
                    </span>
                    <span className="text-gray-700 text-sm">
                      {stat.label}
                    </span>
                  </div>
                  {index !== stats.length - 1 && (
                    <span className="not-last:border-e border-e-gray-300 my-1"></span>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="card grow">
          <div className="card-header">
            <div className="card-title">
              <h3>Latest Taxes</h3>
            </div>
          </div>
          <div className="card-body lg:pb-7.5 min-h-[210px]">
          <div className="grid gap-5 items-center">
            {overviewCustomer.taxes
              .slice(Math.max(overviewCustomer.taxes.length - 3, 0))
              .map((tax, index) => (              
                <div className="flex items-center justify-between channel-stats-bg rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] border border-gray-200 rounded-xl gap-2 px-4 py-2.75 bg-secondary-clarity" key={index}>
                  <div className="flex items-center gap-2.5">
                    <a className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px" href="#">
                      {tax.name} ({tax.type === 'percentage' ? `${tax.value} %` : tax.value.toFixed(2)})
                    </a>
                  </div>
                </div>
            ))}
          </div>
          </div>
          <div className="card-footer justify-center!">
            <Link to={`/customers/${customerId}/taxes`}  className="btn btn-link">
              View all Taxes
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-1">
      <div className="card grow">
          <div className="card-header">
            <div className="card-title">
              <h3>Latest Insurance</h3>
            </div>
          </div>
          <div className="card-body lg:pb-7.5">
            <div className="grid gap-5">
              {overviewCustomer.insurances
                .slice(Math.max(overviewCustomer.insurances.length - 1, 0))
                .map((insurance, index) => (              
                <div className="flex items-center channel-stats-bg justify-between border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-secondary-clarity"
                  key={index}>
                  <div className="flex items-center gap-3.5">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between w-full">
                        <a className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px" href="#">
                          {insurance.type}
                        </a>
                        <span className={`badge badge-sm badge-outline ${
                          statusOptions.find(option => option.label === insurance.status)?.value === 0 ? 'badge-success' :
                          insurance.status === 'Inactive' ? 'badge-dark' :
                          insurance.status === 'Pending' ? 'badge-warning' :
                          insurance.status === 'Cancelled' ? 'badge-danger' :
                          insurance.status === 'Expired' ? 'badge-muted' :
                          insurance.status === 'Suspended' ? 'badge-info' :
                          'badge-secondary'
                        }`}>
                          {insurance.status}
                        </span>
                      </div>
                      <span className="text-2sm text-gray-700">
                        Inception Date : {moment(insurance.inception_date).format('DD-MM-YYYY')}
                      </span>
                      <span className="text-2sm text-gray-700">
                        Expiration Date : {moment(insurance.expiration_date).format('DD-MM-YYYY')}
                      </span>
                      <span className="text-2sm text-gray-700">
                        Agency : {insurance.agency}
                      </span>
                      <span className="text-2sm text-gray-700">
                        Policy Number : {insurance.policy_number}
                      </span>
                      {/* <span className="text-2sm text-gray-700">
                        Status : {insurance.status}
                      </span> */}
                      <span className="text-2sm text-gray-700">
                        Cancellation Period : {insurance.cancellation_period} days
                      </span>
                      <span className="text-2sm text-gray-700">
                        Payment : {insurance.payment_amount} CHF {insurance.payment_frequency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer justify-center!">
            <Link to={`/customers/${customerId}/taxes`}  className="btn btn-link">
              View all Insurances
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Overview