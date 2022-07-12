import { Button, Image, Tag } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { activatePost, deactivatePost } from "../../../../features/admin/adminSlice";

const PostAdmin = ({ post }) => {

  const dispatch = useDispatch();
  const [changing, setChanging] = useState(false);
  const created = (new Date(post.createdAt)).toLocaleString();
  const updated = (new Date(post.updatedAt)).toLocaleString();

  const handleActivate = async () => {
    setChanging(true);
    await dispatch(activatePost(post._id));
    setChanging(false);
  }

  const handleDeactivate = async () => {
    setChanging(true);
    await dispatch(deactivatePost(post._id));
    setChanging(false);
  }

  return (
    <div className={
      post.active ?
        "admin-post-active"
        :
        "admin-post-inactive"}>
      <div className="admin-post-top">
        <div>
          <Link to={"/post/" + post._id}>{post._id}</Link>
          <span>
            &nbsp;&nbsp;&nbsp;
            {post.active ?
              <Tag color="green">ACTIVE</Tag>
              :
              <Tag color="red">INACTIVE</Tag>
            }
          </span>
        </div>
        <div>
          {post.active ?
            <Button danger onClick={handleDeactivate} loading={changing}>
              Deactivate
            </Button>
            :
            <Button onClick={handleActivate} loading={changing}>
              Activate
            </Button>
          }
        </div>
      </div>
      <div className="admin-post">
        <div className="admin-post-left">
          <Link className="post-author" to={"/user/" + post.author._id}>
            {post.author.username}
          </Link>
          &nbsp;&lt;{post.author.email}&gt;
          <p>{post.text}</p>
          <div>
            Comments: {post.commentsCount}&nbsp;&nbsp;Likes: {post.likesCount}
          </div>
          <div>Created: {created}&nbsp;&nbsp;Updated: {updated}</div>
        </div>
        <div>
          {post.image ?
            <Image src={post.image} className="admin-post-image" alt="" />
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default PostAdmin