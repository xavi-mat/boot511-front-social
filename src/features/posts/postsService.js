import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getAllPosts = async (page) => {
  const res = await axios.get(API_URL + "/posts?page=" + page);
  return res.data;
};

const getPostById = async (id) => {
  const res = await axios.get(API_URL + "/posts/id/" + id);
  return res.data;
}

const searchPostsByText = async (postData) => {
  const res = await axios.get(
    API_URL + "/posts/search?text=" + postData.postText + "&page=" + postData.page
  );
  return res.data;
};

const getPostsByUserId = async ({ userId, page = 1 }) => {
  const res = await axios.get(
    API_URL + "/posts/user-id/" + userId + "?page=" + page
  );
  return res.data;
}

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
    {
      headers: {
        Authorization: loginData?.token,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return res.data;
};

const createComment = async (commentData) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.post(
    API_URL + "/comments",
    commentData,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
};

const getSomeUser = async (id) => {
  const res = await axios.get(API_URL + "/users/id/" + id);
  return res.data;
};

const deleteComment = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(API_URL + "/comments/id/" + id,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
};

const updatePost = async (postData) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/posts/id/" + postData.id,
    postData,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const updateComment = async (commentData) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/comments/id/" + commentData.id,
    commentData,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const getCommentsByPostId = async (data) => {
  const res = await axios.get(
    API_URL + "/comments/post-id/" + data.postId + "?page=" + data.page
  )
  return res.data;
}

const likePost = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/posts/like/id/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const unlikePost = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/posts/like/id/" + id,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const likeComment = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.put(
    API_URL + "/comments/like/" + id,
    {},
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const unlikeComment = async (id) => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const res = await axios.delete(
    API_URL + "/comments/like/" + id,
    { headers: { Authorization: loginData?.token } }
  );
  return res.data;
}

const getMoreLiked = async () => {
  const res = await axios.get(API_URL + "/posts/more-liked");
  return res.data;
}

const postsService = {
  getAllPosts,
  getPostById,
  searchPostsByText,
  deletePost,
  cleanAll,
  createPost,
  createComment,
  getPostsByUserId,
  getSomeUser,
  deleteComment,
  updatePost,
  updateComment,
  getCommentsByPostId,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
  getMoreLiked,
};

export default postsService;