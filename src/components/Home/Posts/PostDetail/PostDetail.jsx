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

  if (isLoading) {
    return (
      <div>
        <h1>Post detail</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  const comment = post.comments?.map(comment => (
    <div className="post-box" key={comment._id}>
      <div className="avatar-box">
        <img
          src={comment.author?.avatar}
          className="avatar"
          alt={comment.author?.username} />
      </div>
      <div className="content-box">
        <div className="post-author">{comment.author?.username}</div>
        <div>{comment.text}</div>
        {comment.image ?
          <div><img className="post-image" src={comment.image} alt="" /></div>
          :
          null
        }
      </div>
    </div>
  ))

  return (
    <div>
      <h1>Post detail</h1>
      <div className="post-box" key={post._id}>
        <div className="avatar-box">
          <img
            src={post.author?.avatar}
            className="avatar"
            alt={post.author?.username} />
        </div>
        <div className="content-box">
          <div className="post-author">{post.author?.username}</div>
          <div>{post.text}</div>
          {post.image ?
            <div><img className="post-image" src={post.image} alt="" /></div>
            :
            null
          }
        </div>
      </div>
      <div>{comment}</div>
    </div>
  )
}

export default PostDetail