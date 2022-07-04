import { useNavigate } from "react-router-dom";
import {
  MessageOutlined,
  LikeOutlined,
  DeleteOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Button } from "antd";
import { useSelector } from "react-redux";

const PostCommentBox = ({ post }) => {

  const { user } = useSelector((state) => state.auth.loginData);
  const isAuthor = post.author?._id === user?._id;

  const navigate = useNavigate();
  const date = new Date(post.updatedAt)
    .toLocaleString(
      undefined,
      { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    );

  const handleAuthorClick = (ev) => {
    ev.preventDefault();
    navigate("/user/" + post.author?._id);
  }

  const handleDelete = (ev) => {
    ev.preventDefault();
    console.log("HANDLE DELETE", post._id);
  }

  const handleEdit = (ev) => {
    ev.preventDefault();
    console.log("HANDLE EDIT", post._id);
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
        <div className="post-info-box">
          {'commentsCount' in post ?
            <div><MessageOutlined /> {post.commentsCount} <span className="tone-down">Comments</span></div>
            :
            null}
          <div>
            <LikeOutlined /> {post.likesCount} <span className="tone-down">Likes</span>
          </div>
        </div>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
        {isAuthor ?
          <div className="post-info-box post-buttons-box">
            <Button danger onClick={handleDelete}><DeleteOutlined /></Button> <Button onClick={handleEdit}><FormOutlined /></Button>
          </div>
          : null}
      </div>
    </div>
  )
}

export default PostCommentBox