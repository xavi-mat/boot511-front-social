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
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/users/logout",
    { headers: { Authorization: loginData?.token } }
  );
  if (res.data) {
    localStorage.removeItem("loginData");
  }
  return res.data;
}

const updateUser = async (data) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/users",
    data,
    { headers: { Authorization: loginData?.token } }
  );
  if (res.data) {
    // Update local storage
    loginData.user.avatar = res.data.user.avatar;
    localStorage.setItem("loginData", JSON.stringify(loginData));
  }
  return res.data;
}

const getRelations = async () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.get(
    API_URL + "/users/relations",
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const followUser = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/users/follow/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  if (res.data) {
    loginData.user.followingCount++;
    localStorage.setItem("loginData", JSON.stringify(loginData));
  }
  return res.data;
}

const authService = {
  register,
  login,
  logout,
  updateUser,
  getRelations,
  followUser,
};

export default authService;