import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts");
  return res.data;
};

const postsService = {
  getAll,
};

export default postsService;