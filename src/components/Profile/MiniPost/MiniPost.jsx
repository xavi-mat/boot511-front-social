import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../../features/posts/postsSlice";
import {
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
  MessageOutlined,
  LikeOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";

const MiniPost = ({ post }) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.loginData);

  const isAuthor = post.author === user?._id;
  const date = (new Date(post.updatedAt))
    .toLocaleString(
      undefined,
      { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    );

  const doDeletePost = async (id) => {
    setIsDeleting(true);
    await dispatch(deletePost(id));
    setIsDeleting(false);
  }

  return (
    <div className="mini-post">
      {post.image ?
        <img className="mini-post-image" src={post.image} alt="" />
        : null}
      <div className="mini-post-text">
        <div className="tone-down go-right">{date}</div>
        <div>{post.text}</div>
        <div className="go-right">
          <LikeOutlined /> {post.likesCount} <span className="tone-down">Likes </span>
          &nbsp;&nbsp;&nbsp;
          <MessageOutlined /> {post.commentsCount} <span className="tone-down">Comments</span>
        </div>
      </div>
      <div className="mini-post-buttons">
        <Button><Link to={"/post/" + post._id}><EyeOutlined /></Link></Button>
        {isAuthor ?
          <Popconfirm
            placement="bottomRight"
            title={"Are you sure you want to delete the post?"}
            onConfirm={() => { doDeletePost(post._id) }}
            okText="Delete"
            okButtonProps={{ danger: true }}>
            <Button danger>{isDeleting ? <LoadingOutlined /> : <DeleteOutlined />}</Button>
          </Popconfirm>
          :
          null
        }
      </div>
    </div>
  )
}

export default MiniPost