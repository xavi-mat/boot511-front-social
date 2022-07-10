import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../../features/admin/adminSlice";
import PostAdmin from "./PostAdmin/PostAdmin";

const PostsAdmin = () => {

  const { postsData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const getPostsData = async (page) => {
    dispatch(getPosts(page));
  }

  useEffect(() => {
    getPostsData(1);
  // eslint-disable-next-line
  }, [])

  const post = postsData.posts?.map(
    (p, i) => <PostAdmin key={p._id + i} post={p} />
  );

  return (
    <div>{post}</div>
  )
}

export default PostsAdmin