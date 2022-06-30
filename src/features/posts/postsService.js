import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts");
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(API_URL + "/posts/id/" + id);
  return res.data;
}

const getPostsByTitle = async (postTitle) => {
  const res = await axios.get(API_URL + "/posts/search?title=" + postTitle);
  return res.data;
};

const deletePost = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/posts/id/" + id,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}
const postsService = {
  getAll,
  getById,
  getPostsByTitle,
  deletePost,
};

export default postsService;