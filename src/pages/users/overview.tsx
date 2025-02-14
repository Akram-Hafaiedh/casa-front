import { HiOutlineCalendar, HiOutlineMapPin, HiOutlineEnvelope, HiOutlinePhone, HiOutlineDocumentText } from "react-icons/hi2";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { User } from "../../types/User";
import { DetailItem, InfoCard } from "../../components/cards/InfoCard";
import { calculateAge, getFileIcon } from "../../helpers/format";
import ProjectRow from "../../components/cards/ProjectRow";
import ProjectsCard from "../../components/cards/ProjectsCard";
import ClientsCard from "../projects/components/ClientsCard";

const UserOverview: React.FC = () => {
  const { overviewUser } = useOutletContext<{ overviewUser: User }>();
  const navigate = useNavigate();
  const userInfo = {
    age: overviewUser.birthday ? calculateAge(overviewUser.birthday) : "N/A",
    fullName: overviewUser.full_name || "N/A",
    firstName: overviewUser.first_name || "N/A",
    lastName: overviewUser.last_name || "N/A",
    email: overviewUser.email || "N/A",
    phone: overviewUser.phone || "N/A",
    address: overviewUser.address || '',
    postcode:  overviewUser.postal_code || '',
    city: overviewUser.city || '',
    birthday: overviewUser.birthday ? new Date(overviewUser.birthday).toLocaleDateString() : "N/A",
    ahvNumber: overviewUser.ahv_number || "N/A",
    idPassport: overviewUser.id_passport || "N/A",
  };

  const contractInfo = overviewUser.contract ? {
    type: overviewUser.contract.type || "N/A",
    startDate: overviewUser.contract.start_date ? new Date(overviewUser.contract.start_date).toLocaleDateString() : "N/A",
    endDate: overviewUser.contract.end_date ? new Date(overviewUser.contract.end_date).toLocaleDateString() : "N/A",
    status: overviewUser.contract.status || "N/A",
  } : null;
  
  const handleAddContract = () => {
    navigate(`/contracts/create`); // Navigate to the contracts route
  };

  console.log(overviewUser);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        <div className="col-span-1 space-y-6">
          <InfoCard title="Personal Info">

            <DetailItem label="First Name" value={userInfo.firstName} />
            <DetailItem label="Last Name" value={userInfo.lastName} />
            <DetailItem label="Birthday" value={userInfo.birthday} />
            {/* <DetailItem label="Gender" value={userInfo.gender} /> */}
            <DetailItem label="Age" value={userInfo.age} />
            <DetailItem label="Phone" value={userInfo.phone} />
            <DetailItem label="City" value={userInfo.city} />
            <DetailItem label="Address" value={userInfo.address} />
            <DetailItem label="Postcode" value={userInfo.postcode} />
            <DetailItem label="AHV N°" value={userInfo.ahvNumber} />
            <DetailItem label="Email" value={userInfo.email} isEmail />
            <DetailItem label="ID/Passport" value={userInfo.idPassport} />

          </InfoCard>
          <InfoCard title="Current Contract">
            {contractInfo ? (
              <>
                <DetailItem label="Type" value={contractInfo?.type} />
                <DetailItem label="Start Date" value={contractInfo?.startDate} />
                <DetailItem label="End Date" value={contractInfo?.endDate} />
                <DetailItem label="Status" value={contractInfo?.status} />
                {overviewUser.files?.contracts && overviewUser.files.contracts.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Contract Files</h4>
                    <div className="flex flex-col">
                      {overviewUser.files.contracts.map((file, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <HiOutlineDocumentText className="text-gray-500" />
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {file.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <img 
                      src="/images/illustrations/7.svg" 
                      className="mw-200px" 
                      alt="No contract" 
                    />
                    <button
                      onClick={handleAddContract}
                      className="btn btn-primary"
                    >
                      Add Contract
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </InfoCard>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Documents
              </h3>
            </div>
            <div className="card-body">
            {overviewUser.files && Object.entries(overviewUser.files)
              .filter(([type]) => type !== "contracts")
              .map(([type, files]) => (
                <div key={type} className="flex flex-col mb-3">
                  <img src="/images/folder-document.svg" alt="Folder" className="size-10" />
                  <span className="text-gray-500">{type}</span>
                  <div className="ml-6">
                    {files.slice(0, 4).map((file, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img src={getFileIcon(file.type)} alt={file.type} className="size-10" />
                        <span className="text-gray-700">{file.formatted_size}</span>
                      </div>
                    ))}
                  </div>
                  {files.length > 4 && (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-700">
                        More files available
                      </span>
                      <Link
                        to={`/users/${overviewUser.id}/files`}
                        className="btn btn-light"
                      >
                        View all
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 space-y-6">

          <ProjectsCard projects={overviewUser.projects} />

          <ClientsCard customers={overviewUser.clients} />
            
        </div>
    </div>
  );
};

export default UserOverview;
