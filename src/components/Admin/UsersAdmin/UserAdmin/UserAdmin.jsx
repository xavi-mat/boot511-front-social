import { useState } from "react";
import { useDispatch } from "react-redux"
import { activateUser, deactivateUser } from "../../../../features/admin/adminSlice";
import { Link } from "react-router-dom";
import { Button, Image, Tag } from "antd";

const UserAdmin = ({ user }) => {

  const dispatch = useDispatch();
  const [changing, setChanging] = useState(false);
  const created = (new Date(user.createdAt)).toLocaleString();
  const updated = (new Date(user.updatedAt)).toLocaleString();

  const handleActivate = async () => {
    setChanging(true);
    await dispatch(activateUser(user._id));
    setChanging(false);
  }

  const handleDeactivate = async () => {
    setChanging(true);
    await dispatch(deactivateUser(user._id));
    setChanging(false);
  }

  return (
    <div className={
      user.active ?
        "admin-post-active"
        :
        "admin-post-inactive"}>
      <div className="admin-post-top">
        <div>
          <Link to={"/user/" + user._id}>{user._id}</Link>
          <span>&nbsp;&nbsp;&nbsp;{user.active ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">INACTIVE</Tag>}</span>
        </div>
        <div>
          {user.active ?
            <Button danger onClick={handleDeactivate} loading={changing}>Deactivate</Button>
            :
            <Button onClick={handleActivate} loading={changing}>Activate</Button>
          }
        </div>
      </div>
      <div className="admin-post">
        <div className="admin-post-left">
          <Link className="post-author" to={"/user/" + user._id}>{user.username}</Link>&nbsp;
          &lt;{user.email}&gt;&nbsp;
          Role: {user.role}
          <div>
            Posts: {user.postsCount}&nbsp;&nbsp;
            Comments: {user.commentsCount}&nbsp;&nbsp;
            Followers: {user.followersCount}&nbsp;&nbsp;
            Following: {user.followingCount}
          </div>
          <div>Created: {created}&nbsp;&nbsp;Updated: {updated}</div>
        </div>
        <div>
          {user.avatar ? <Image src={user.avatar} className="avatar" alt="" /> : null}
        </div>
      </div>
    </div>
  )
}

export default UserAdmin