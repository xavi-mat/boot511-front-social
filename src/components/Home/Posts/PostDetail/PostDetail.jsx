import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getById } from "../../../../features/posts/postsSlice";

const PostDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <div>
      <h1>Post detail</h1>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <div>By {post.author.username}</div>
    </div>
  )
}

export default PostDetail