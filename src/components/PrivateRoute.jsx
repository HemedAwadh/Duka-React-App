import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check token once on mount
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  // While checking, don't render anything (optional: you can add a loader)
  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    // Navigate to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
