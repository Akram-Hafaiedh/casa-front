import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

type RequiredRoleType = string | string[];

interface ProtectedRouteProps {
    element: React.ReactElement;
    requiredRole?: RequiredRoleType;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {

    console.log(Array.isArray(requiredRole), requiredRole);
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader isLoading={loading} />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    if (requiredRole) {
        if (Array.isArray(requiredRole)) {
            if (!requiredRole.some((role) => user?.roles?.includes(role))) {
                toast.warning('You do not have permission to access this page.');
                return <Navigate to="/home" />;
            }
        } else if (!user?.roles?.includes(requiredRole)) {
            toast.warning('You do not have permission to access this page.');
            return <Navigate to="/home" />;
        }
    }

    return element;
};

export default ProtectedRoute;
