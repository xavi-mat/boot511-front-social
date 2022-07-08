import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Menu, Popconfirm } from 'antd';
import {
  SettingOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  TeamOutlined
} from '@ant-design/icons';

const LeftSider = ({ toggleDrawer }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);

  const onLogout = (ev) => {
    ev.preventDefault();
    toggleDrawer();
    dispatch(logout());
    navigate("/");
  };

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <NavLink to="/" onClick={toggleDrawer}>Home</NavLink>
    },
  ];

  // Logged in buttons
  if (loginData?.user) {
    items.push(
      {
        key: loginData.user._id,
        icon: <UserOutlined />,
        label: <Link to={"/user/" + loginData.user._id} onClick={toggleDrawer}>
          {loginData.user.username}
        </Link>
      }
    );
    items.push(
      {
        key: "following",
        icon: <UsergroupAddOutlined />,
        label: <NavLink to="/following" onClick={toggleDrawer}>
          Following
        </NavLink>
      }
    );
    items.push(
      {
        key: "followers",
        icon: <TeamOutlined />,
        label: <NavLink to="/followers" onClick={toggleDrawer}>
          Followers
        </NavLink>
      }
    );
    if (loginData.user.role === "admin") {
      items.push(
        {
          key: "admin",
          icon: <SettingOutlined />,
          label: <NavLink to="/admin" onClick={toggleDrawer}>Admin</NavLink>
        }
      );
    }
    items.push(
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <Popconfirm
          placement="right"
          title={"Are you sure you want to logout?"}
          onConfirm={onLogout}
          okText="Logout">
          <NavLink to="/logout">Logout</NavLink>
        </Popconfirm>
      }
    );

    // Unlogged buttons
  } else {
    items.push(
      {
        key: "/login",
        icon: <LoginOutlined />,
        label: <NavLink to="/login" onClick={toggleDrawer}>Login</NavLink>
      }
    );
    items.push(
      {
        key: "/register",
        icon: <UserAddOutlined />,
        label: <NavLink to="/register" onClick={toggleDrawer}>Register</NavLink>
      }
    );
  }

  return (
    <>
      <div className="center-box">
        <NavLink to="/" onClick={toggleDrawer}>
          <img src="/logo.png" alt="Tuitah" className="avatar" />
        </NavLink>
      </div>
      <Menu
        mode="vertical"
        items={items}
      />
    </>
  );
};

export default LeftSider