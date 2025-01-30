import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/redux";

const PrivateRoute: React.FC = () => {
  const { accessToken } = useAppSelector((state) => state.userReducer);

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;