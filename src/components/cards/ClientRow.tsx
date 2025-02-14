import { Link } from "react-router-dom";
import { User } from "../../types/User";
import moment from "moment";
import { HiOutlineEye } from "react-icons/hi2";

interface ProjectRowProps {
    id: number;
    full_name: string;
    phone: string;
    address: string;
    postal_code: number;
    city: string;
    created_at: string;
}

const ClientRow: React.FC<ProjectRowProps> = ({ id, full_name, phone, address, city, postal_code, created_at }) => (
    <tr className="border-b">
        <td className="text-start">
            <Link className="text-sm font-medium text-gray-900 hover:text-primary"
                to={`/customers/${id}/overview`}>
                {full_name}
            </Link>
        </td>
        <td>
            <span className="text-sm font-medium text-gray-700">{phone}</span>
        </td>
        <td>
            <span className="text-sm font-medium text-gray-700">{city}, {postal_code}</span>
        </td>
        <td className="text-sm font-medium text-gray-700">
            {moment(created_at).fromNow()}
        </td>
        <td>
            <Link className="btn btn-sm btn-icon btn-light btn-clear"
                to={`/customers/${id}/overview`}>
                    <HiOutlineEye className="size-5" />
            </Link>
        </td>
    </tr>
);

export default ClientRow;