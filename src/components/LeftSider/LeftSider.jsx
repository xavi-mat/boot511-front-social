import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Menu, Popconfirm } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const LeftSider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);


  const onLogout = (ev) => {
    ev.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const items = [
    { key: "/", icon: <MenuUnfoldOutlined />, label: <NavLink to="/">Home</NavLink> },
  ];

  if (loginData) {
    items.push(
      { key: "/profile", icon: <UserOutlined />, label: <NavLink to="/profile">{loginData.user.username}</NavLink> }
    );
    items.push(
      { key: "following", icon: <UserOutlined />, label: <NavLink to="/">Following</NavLink> }
    );
    items.push(
      { key: "followers", icon: <UserOutlined />, label: <NavLink to="/">Followers</NavLink> }
    );
    if (loginData.user.role === "admin") {
      items.push(
        { key: "admin", icon: <MenuFoldOutlined />, label: <NavLink to="/admin">Admin</NavLink> }
      );
    }
    items.push(
      {
        key: "logout",
        icon: <UserOutlined />,
        label: <Popconfirm placement="right" title={"Are you sure you watn to logout?"} onConfirm={onLogout}>
          <NavLink to="/">Logout</NavLink>
        </Popconfirm>
      }
    );
  } else {
    items.push(
      { key: "/login", icon: <UserOutlined />, label: <NavLink to="/login">Login</NavLink> }
    );
    items.push(
      { key: "/register", icon: <UserOutlined />, label: <NavLink to="/register">Register</NavLink> }
    );
  }

  return (
    <>
      <Menu
        mode="vertical"
        items={items}
      />
      {/* <div>
        <NavLink to="/">Logo</NavLink>
        <div id="navbarColor02">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {
              loginData ? <>

                <li>

                  <div>
                    <NavLink to="/profile">Profile</NavLink>
                    <div></div>
                    <NavLink to="/" onClick={onLogout}>Logout</NavLink>
                  </div>
                </li>
                {
                  loginData.user.role === 'admin' ?
                    <li>
                      <NavLink to="/admin">Admin</NavLink>
                    </li>
                    :
                    null
                }
              </>
                :
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
            }
          </ul>
          <div >
            <input type="text" placeholder="Search" onKeyUp={handleChange} name="text" />
            <button type="submit" onClick={handleChange}>Search</button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LeftSider