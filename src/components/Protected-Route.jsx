import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component, user, isAdminRoute, admin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isAdminRoute) {
      if (!admin) {
        navigate("/");
      }
    }
  }, []);
  return <Component />;
};

export default ProtectedRoute;
