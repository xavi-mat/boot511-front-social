import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Menu } from 'antd';
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
    { key: "home", icon: <UserOutlined/>, label: <NavLink to="/">Home</NavLink> },
  ];

  if (loginData) {
    items.push(
      { key: "profile", label: <NavLink to="/profile">{loginData.user.username}</NavLink> }
    );
    items.push(
      { key: "logout", label: <NavLink to="/" onClick={onLogout}>Logout</NavLink> }
    );
  } else {
    items.push(
      { key: "login", label: <NavLink to="/login">Login</NavLink> }
    );
    items.push(
      { key: "register", label: <NavLink to="/register">Register</NavLink> }
    );
  }

  return (
    <>
        <div className="logo" />
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