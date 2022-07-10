import { Navigate } from "react-router-dom";

const UnloggedZone = ({ children }) => {
  const loginData = localStorage.getItem("loginData");
  return loginData ? children : <Navigate to="/" />;
}

export default UnloggedZone