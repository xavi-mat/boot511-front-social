import { Navigate } from "react-router-dom";

const PrivateZone = ({ children }) => {
  const loginData = localStorage.getItem("loginData");
  return loginData ? children : <Navigate to="/" />;
}

export default PrivateZone
