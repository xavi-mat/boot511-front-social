import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const handleChange = (ev) => {
    ev.preventDefault();
    setText(ev.target.value);
    if (ev.key === "Enter" && text.length > 0) {
      navigate("/search/" + text);
    }
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const items = [
    { key: "home", label: <Link to="/">Home</Link> },
  ];

  if (loginData) {
    items.push(
      { key: "profile", label: <Link to="/profile">{loginData.user.username}</Link> }
    );
    items.push(
      { key: "logout", label: <Link to="/" onClick={onLogout}>Logout</Link> }
    );
  } else {
    items.push(
      { key: "login", label: <Link className="nav-link" to="/login">Login</Link> }
      );
    items.push(
      { key: "register", label: <Link className="nav-link" to="/register">Register</Link> }
      );
  }
  items.push({key:"search", label:<input type="text" placeholder="Search" onKeyUp={handleChange} name="text" />})



  return (
    <>
      <Header>
          <div className="logo" />
          <Menu theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={items}
            />
        </Header>
      {/* <div>
        <Link className="navbar-brand" to="/">Logo</Link>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {
              loginData ? <>

                <li className="nav-item dropdown">

                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/" onClick={onLogout}>Logout</Link>
                  </div>
                </li>
                {
                  loginData.user.role === 'admin' ?
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">Admin</Link>
                    </li>
                    :
                    null
                }
              </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
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

export default NavBar