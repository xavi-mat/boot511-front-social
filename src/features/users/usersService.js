import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getUsersByName = async (name) => {
  const res = await axios.get(API_URL + "/users/search?name=" + name);
  return res.data;
};

const usersService = {
  getUsersByName,
};

export default usersService;