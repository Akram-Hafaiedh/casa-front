import { Link, useOutletContext } from "react-router-dom"
import { Customer } from "../../types/Customer"

const Files = () => {
  const overviewCustomer = useOutletContext<Customer>()
  if (!overviewCustomer) {
    return <div>Loading...</div>
  }
  if (!overviewCustomer.files || overviewCustomer.files.length === 0) {
    return (
      <div className="card h-[calc(100%-2.3rem)]">
        <div className="card-body flex flex-col items-center justify-center gap-2.5 h-full">
            <div className="flex justify-center">
                <img alt="image" className="dark:hidden max-h-[230px]" src="/images/illustrations/14.svg" />
            </div>
            <div className="flex flex-col gap-5 lg:gap-7.5">
                <div className="flex flex-col gap-3 text-center">
                <h2 className="text-1.5xl font-semibold text-gray-900">
                  No Files Yet
                </h2>
                <p className="text-sm text-gray-800">
                  This customer doesn't have any files yet.
                </p>
                <Link to="/files" className="btn btn-primary">
                  Add File
                </Link>
              </div>
            </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      files
    </div>
  )
}
export default Files