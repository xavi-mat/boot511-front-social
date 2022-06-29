import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData);
  if (res.data) {
    localStorage.setItem("loginData", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/users/logout",
    { headers: { Authorization: user?.token } }
  );
  if (res.data) {
    localStorage.removeItem("loginData");
  }
  return res.data;
}

const authService = {
  register,
  login,
  logout,
};

export default authService;