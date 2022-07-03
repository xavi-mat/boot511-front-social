import { useDispatch, useSelector } from "react-redux"
import { deletePost } from "../../../features/posts/postsSlice";

const PostAdmin = () => {

  const { posts } = useSelector((state) => state.posts);
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const post = posts.posts?.map((post) => {
    return (
      <div key={post._id}>
        <div>{post.text}</div>
        {loginData?.user._id === post.author._id ?
          <button onClick={() => dispatch(deletePost(post._id))}>🗑️</button>
          :
          null}
      </div>
    );
  })
  return (
    <div>{post}</div>
  )
}

export default PostAdmin