import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const handleChange = (ev) => {
    setText(ev.target.value);
    if (ev.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>
      <nav>
        <div>Header</div>
        <div>
          <div>
            <input onKeyUp={handleChange} placeholder="Search post" name="text" />
          </div>
          <div><Link to="/">Home</Link></div>
          {loginData ? <>
            <div><Link to="/" onClick={onLogout}>Logout</Link></div>
            <div><Link to="/profile">{loginData.user.username}</Link></div>
            {loginData.user.role === 'admin' ?
              <div><Link to="/admin">Admin</Link></div> :
              null
            }
          </>
            :
            <>
              <div><Link to="/login">Login</Link></div>
              <div><Link to="/register">Register</Link></div>
            </>
          }
        </div>
      </nav>
    </>
  );
};

export default Header