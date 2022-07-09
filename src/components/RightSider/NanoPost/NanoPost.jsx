import { useNavigate } from "react-router-dom";
import {
  MessageOutlined,
  LikeOutlined
} from '@ant-design/icons';
import Replacer from "../../Replacer/Replacer";

const NanoPost = ({ post }) => {

  const navigate = useNavigate();

  const date = (new Date(post.updatedAt))
    .toLocaleString(
      undefined,
      { year: 'numeric', month: 'numeric', day: 'numeric' }
    );

  const goToPost = () => {
    navigate("/post/" + post._id);
  }

  return (
    <div className="nano-post" onClick={goToPost}>
      {post.image ?
        <img className="nano-post-image" src={post.image} alt="" />
        : null}
      <div><strong>{post.author2.username}</strong></div>
      <div className="nano-post-text">
        <div><Replacer text={post.text} /></div>
        <div className="nano-post-bottom tone-down">
          {date}
          &nbsp;&nbsp;&nbsp;
          <LikeOutlined /> {post.likesCount}
          &nbsp;
          <MessageOutlined /> {post.commentsCount}
        </div>
      </div>
    </div>
  )
}

export default NanoPost