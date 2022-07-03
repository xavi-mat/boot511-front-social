import { useNavigate } from "react-router-dom";

const PostCommentBox = ({ post }) => {

  const navigate = useNavigate();
  const date = new Date(post.updatedAt).toLocaleString('ca');

  const handleAuthorClick = (ev) => {
    ev.preventDefault();
    navigate("/user/" + post.author?._id);
  }

  return (
    <div className="post-box">
      <div className="avatar-box">
        <img
          src={post.author?.avatar}
          className="avatar"
          alt={post.author?.username} />
      </div>
      <div className="content-box">
        <div className="author-date-box">
          <span className="post-author" onClick={handleAuthorClick}>
            {post.author?.username}
          </span>
          <span className="tone-down">
            {date}
          </span>
        </div>
        <div>{post.text}</div>
        {post.image ?
          <div><img className="post-image" src={post.image} alt="" /></div>
          :
          null
        }
      </div>
    </div>
  )
}

export default PostCommentBox