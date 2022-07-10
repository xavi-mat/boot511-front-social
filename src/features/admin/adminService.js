import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getPosts = async (page) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.get(
    API_URL + "/admin/posts?page=" + page,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const activatePost = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/admin/post/activate/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const deactivatePost = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/admin/post/deactivate/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const adminService = {
  getPosts,
  activatePost,
  deactivatePost,
}

export default adminService;