import { useDispatch, useSelector } from "react-redux"
import {
  CalendarOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  CopyOutlined,
  TagsOutlined,
  SkinOutlined,
  EyeOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Button, Col, Popconfirm, Row } from "antd";
import { Link } from "react-router-dom";
import { deletePost } from "../../features/posts/postsSlice";

const Profile = () => {

  const { user } = useSelector((state) => state.auth.loginData);
  const dispatch = useDispatch();

  const date = (new Date(user.createdAt))
    .toLocaleDateString(
      undefined,
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

  const doDeletePost = async (id) => {
    console.log("first")
    await dispatch(deletePost(id));
    console.log("2")
  }

  const post = user.posts.map(post => (
    <div key={post._id} className="mini-post">
      {post.image ?
        <img className="mini-post-image" src={post.image} alt="" />
        : null}
      <div className="mini-post-text">{post.text}</div>
      <div>
        <div><Button><Link to={"/post/" + post._id}><EyeOutlined /></Link></Button></div>
        <div>
          <Popconfirm
          placement="bottomRight"
          title={"Are you sure you want to delete the post?"}
          onConfirm={()=>{doDeletePost(post._id)}}
          okText="Delete"
          okButtonProps={{danger:true}}>
            <Button danger><DeleteOutlined /></Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  ))
  return (
    <div>
      <div className="profile-top">
        <div><img className="avatar-big" src={user.avatar} alt="" /></div>
        <h1><strong>{user.username}</strong></h1>
      </div>
      {/* <div className="icon-big"><MailOutlined /> {user.email}</div> */}
      <Row>
        <Col span={12}>
          <div className="icon-big"><UsergroupAddOutlined /> {user.followingCount} <span className="tone-down">following</span></div>
        </Col>
        <Col span={12}>
          <div className="icon-big"><TeamOutlined /> {user.followersCount} <span className="tone-down">followers</span></div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="icon-big"><CopyOutlined /> {user.postsCount} <span className="tone-down">posts</span></div>
        </Col>
        <Col span={12}>
          <div className="icon-big"><TagsOutlined /> {user.commentsCount} <span className="tone-down">comments</span></div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="icon-big"><SkinOutlined /> <span className="tone-down">Role:</span> {user.role}</div>
        </Col>
        <Col span={12}>
          <div className="icon-big"><CalendarOutlined /> <span className="tone-down">Joined</span> {date}</div>
        </Col>
      </Row>
      <div>{post}</div>
    </div>
  )
}

export default Profile