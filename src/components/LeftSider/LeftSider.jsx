import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Menu, Popconfirm } from 'antd';
import {
  SettingOutlined,
  HomeOutlined,
  UsergroupAddOutlined ,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  TeamOutlined
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
    // { key: "/", icon: <img src="/logo.png" alt="Tuitah" className="avatar" />, label: <NavLink to="/">Tuitah</NavLink> },
    { key: "/", icon: <HomeOutlined />, label: <NavLink to="/">Home</NavLink> },
  ];

  if (loginData?.user) {
    items.push(
      { key: "/profile", icon: <UserOutlined />, label: <NavLink to="/profile">{loginData.user.username}</NavLink> }
    );
    items.push(
      { key: "following", icon: <UsergroupAddOutlined  />, label: <NavLink to="/">Following</NavLink> }
    );
    items.push(
      { key: "followers", icon: <TeamOutlined />, label: <NavLink to="/">Followers</NavLink> }
    );
    if (loginData.user.role === "admin") {
      items.push(
        { key: "admin", icon: <SettingOutlined />, label: <NavLink to="/admin">Admin</NavLink> }
      );
    }
    items.push(
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <Popconfirm placement="right" title={"Are you sure you watn to logout?"} onConfirm={onLogout}>
          <NavLink to="/">Logout</NavLink>
        </Popconfirm>
      }
    );
  } else {
    items.push(
      { key: "/login", icon: <LoginOutlined />, label: <NavLink to="/login">Login</NavLink> }
    );
    items.push(
      { key: "/register", icon: <UserAddOutlined />, label: <NavLink to="/register">Register</NavLink> }
    );
  }

  return (
    <>
      <div className="center-box">
        <img src="/logo.png" alt="Tuitah" className="avatar" />
      </div>
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