import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getUsers = async (page) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.get(
    API_URL + "/admin/users?page=" + page,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const activateUser = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/admin/user/activate/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const deactivateUser = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/admin/user/deactivate/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

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

const getComments = async (page) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.get(
    API_URL + "/admin/comments?page=" + page,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const activateComment = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/admin/comment/activate/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const deactivateComment = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/admin/comment/deactivate/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const adminService = {
  getUsers,
  activateUser,
  deactivateUser,
  getPosts,
  activatePost,
  deactivatePost,
  getComments,
  activateComment,
  deactivateComment,
}

export default adminService;