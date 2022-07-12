import { Button, Menu, Popconfirm } from "antd";
import {
  UserOutlined,
  CopyOutlined,
  MessageOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { useDispatch } from "react-redux"
import { cleanAll } from "../../features/posts/postsSlice";
import PostsAdmin from "./PostsAdmin/PostsAdmin";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../features/auth/authSlice";
import UsersAdmin from "./UsersAdmin/UsersAdmin";
import CommentsAdmin from "./CommentsAdmin/CommentsAdmin";

const Admin = () => {

  const [currentTab, setCurrentTab] = useState('posts');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Users',
      key: 'users',
      icon: <UserOutlined />,
    },
    {
      label: 'Posts',
      key: 'posts',
      icon: <CopyOutlined />,
    },
    {
      label: 'Comments',
      key: 'comments',
      icon: <MessageOutlined />,
    },
    {
      label: 'Kaboom',
      key: 'kaboom',
      icon: <ThunderboltOutlined />,
      danger: true
    },
  ];

  const onKaboom = async () => {
    alert("Attention! We are going to KABOOM");
    await dispatch(cleanAll());
    dispatch(resetUser());
    navigate("/");
  }

  const onChangeTab = (ev) => {
    setCurrentTab(ev.key);
  };

  return (
    <div>
      <div className="home-top"><h1>Admin</h1></div>
      <Menu
        onClick={onChangeTab}
        selectedKeys={[currentTab]}
        mode="horizontal"
        items={tabs} />
      &nbsp;
      {currentTab === "users" ? <UsersAdmin /> : null}
      {currentTab === "posts" ? <PostsAdmin /> : null}
      {currentTab === "comments" ? <CommentsAdmin /> : null}
      {currentTab === "kaboom" ?
        <div className="home-buttons-box">
          <Popconfirm
            title="Are you sure you want to Kaboom?"
            okText="Yes, Kaboom everything"
            onConfirm={onKaboom}
            okButtonProps={{ danger: true }}>
            <Button type="primary" size="large" danger>KABOOM BUTTON</Button>
          </Popconfirm>
        </div>
        : null
      }
    </div>
  )
}

export default Admin