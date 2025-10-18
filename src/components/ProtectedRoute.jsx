import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not authenticated, redirect them to the sign-in page
    return <Navigate to="/signin" replace />;
  }

  // If the user is authenticated, render the component they were trying to access
  return children;
};

export default ProtectedRoute;