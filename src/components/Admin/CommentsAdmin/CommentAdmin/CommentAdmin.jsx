import { Button, Image, Tag } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { activateComment, deactivateComment } from "../../../../features/admin/adminSlice";

const CommentAdmin = ({ comment }) => {

  const dispatch = useDispatch();
  const [changing, setChanging] = useState(false);
  const created = (new Date(comment.createdAt)).toLocaleString();
  const updated = (new Date(comment.updatedAt)).toLocaleString();

  const handleActivate = async () => {
    setChanging(true);
    await dispatch(activateComment(comment._id));
    setChanging(false);
  }

  const handleDeactivate = async () => {
    setChanging(true);
    await dispatch(deactivateComment(comment._id));
    setChanging(false);
  }

  return (
    <div className={
      comment.active ?
        "admin-post-active"
        :
        "admin-post-inactive"}>
      <div className="admin-post-top">
        <div>
          Comment to post:&nbsp;
          <Link to={"/post/" + comment.postId}>{comment.postId}</Link>
          <span>
            &nbsp;&nbsp;&nbsp;
            {comment.active ?
              <Tag color="green">ACTIVE</Tag>
              :
              <Tag color="red">INACTIVE</Tag>
            }
          </span>
        </div>
        <div>
          {comment.active ?
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
          <Link className="post-author" to={"/user/" + comment.author._id}>
            {comment.author.username}
          </Link>
          &npsp;&lt;{comment.author.email}&gt;
          <p>{comment.text}</p>
          <div>
            Likes: {comment.likesCount}&nbsp;&nbsp;
            Created: {created}&nbsp;&nbsp;
            Updated: {updated}
          </div>
        </div>
        <div>
          {comment.image ?
            <Image src={comment.image} className="admin-post-image" alt="" />
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default CommentAdmin