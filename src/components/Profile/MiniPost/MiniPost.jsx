import { useNavigate } from "react-router-dom";
import {
  MessageOutlined,
  LikeOutlined
} from '@ant-design/icons';
import Replacer from "../../Replacer/Replacer";

const MiniPost = ({ post }) => {

  const navigate = useNavigate();

  const date = (new Date(post.updatedAt))
    .toLocaleString(
      undefined,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    );

  const goToPost = () => {
    navigate("/post/" + post._id);
  }

  return (
    <div className="mini-box" onClick={goToPost}>
      {post.image ?
        <img className="mini-box-image" src={post.image} alt="" />
        : null}
      <div className="mini-box-text">
        <div className="tone-down go-right">{date}</div>
        <div><Replacer text={post.text} /></div>
        <div className="go-right">
          <LikeOutlined /> {post.likesCount}&nbsp;
          <span className="tone-down">Likes </span>
          &nbsp;&nbsp;&nbsp;
          <MessageOutlined /> {post.commentsCount}&nbsp;
          <span className="tone-down">Comments</span>
        </div>
      </div>
    </div>
  )
}

export default MiniPost