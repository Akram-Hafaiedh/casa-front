import { useOutletContext } from "react-router-dom"
import { User } from "../../types/User";

const UserContracts : React.FC = () => {
    const user = useOutletContext<User>();
    return (
        <div>Contracts for {user?.first_name} {user?.last_name}</div>
    )
}

export default UserContracts