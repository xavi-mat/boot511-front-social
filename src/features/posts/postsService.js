import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAll = async (page) => {
  const res = await axios.get(API_URL + "/posts?page=" + page);
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(API_URL + "/posts/id/" + id);
  return res.data;
}

const getPostsByText = async (postText) => {
  const res = await axios.get(API_URL + "/posts/search?text=" + postText);
  return res.data;
};

const deletePost = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/posts/id/" + id,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
};

const cleanAll = async () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/users/clean-all",
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
};

const createPost = async (postData) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.post(
    API_URL + "/posts",
    postData,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
};

const postsService = {
  getAll,
  getById,
  getPostsByText,
  deletePost,
  cleanAll,
  createPost,
};

export default postsService;