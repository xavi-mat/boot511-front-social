import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Post from "./Post/Post"
import { getAll, reset } from "../../../features/posts/postsSlice";

const Posts = () => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.posts);

  const getData = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div><h1>Loading...</h1></div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  )
}

export default Posts