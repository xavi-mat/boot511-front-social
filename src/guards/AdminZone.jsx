import { Navigate } from "react-router-dom";

const AdminZone = ({ children }) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  return loginData?.user?.role === "admin" ? children : <Navigate to="/" />
}

export default AdminZone