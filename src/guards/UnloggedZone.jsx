import { Navigate } from "react-router-dom";

const UnloggedZone = ({ children }) => {
  const loginData = localStorage.getItem("loginData");
  return loginData ? <Navigate to="/" /> : children;
}

export default UnloggedZone