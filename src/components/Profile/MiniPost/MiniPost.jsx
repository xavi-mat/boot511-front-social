import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../../features/posts/postsSlice";
import {
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
  TagsOutlined,
  LikeOutlined
} from '@ant-design/icons';
import { useDispatch } from "react-redux";

const MiniPost = ({post}) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const dateCreated = (new Date(post.createdAt)).toLocaleString();
  const dateUpdated = (new Date(post.updatedAt)).toLocaleString();

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
      <div>{post.text}</div>
      <div className="tone-down">{dateCreated} {dateUpdated}</div>
      <div className="tone-down"><LikeOutlined /> {post.likesCount} <TagsOutlined />{post.commentsCount}</div>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </div>
      <div className="mini-post-buttons">
        <Button><Link to={"/post/" + post._id}><EyeOutlined /></Link></Button>
        <Popconfirm
          placement="bottomRight"
          title={"Are you sure you want to delete the post?"}
          onConfirm={() => { doDeletePost(post._id) }}
          okText="Delete"
          okButtonProps={{ danger: true }}>
          <Button danger>{isDeleting ? <LoadingOutlined />  : <DeleteOutlined />}</Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default MiniPost