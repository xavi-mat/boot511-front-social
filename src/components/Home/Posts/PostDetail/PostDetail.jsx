import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getById, reset } from "../../../../features/posts/postsSlice";

const PostDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);

  const getPost = async (id) => {
    await dispatch(getById(id));
    dispatch(reset());
  }

  useEffect(() => {
    getPost(id);
  }, []);

  return (
    <div>
      <h1>Post detail</h1>
      {isLoading ?
        <h1>Loading...</h1>
        :
        <>
          <div><img src={post.image} /></div>
          <div>{post.title}</div>
          <div>{post.body}</div>
          <div>By {post.author?.username}</div>
          <div><img src={post.author?.avatar} /></div>
        </>
      }
    </div>
  )
}

export default PostDetail