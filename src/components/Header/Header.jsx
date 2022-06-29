import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);
  const onLogout = (ev) => {
    ev.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav>
      <span>Header</span>
      <div>
        {loginData ? <>
          <span><Link to="/" onClick={onLogout}>Logout</Link></span>
          <span><Link to="/profile">{loginData.user.username}</Link></span>
        </>
          :
          <>
            <span><Link to="/login">Login</Link></span>
            <span><Link to="/register">Register</Link></span>
          </>
        }
      </div>
    </nav>
  );
};

export default Header