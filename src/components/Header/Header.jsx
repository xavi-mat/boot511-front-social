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
      <div>Header</div>
      <div>
          <div><Link to="/">Home</Link></div>
        {loginData ? <>
          <div><Link to="/" onClick={onLogout}>Logout</Link></div>
          <div><Link to="/profile">{loginData.user.username}</Link></div>
        </>
          :
          <>
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/register">Register</Link></div>
          </>
        }
      </div>
    </nav>
  );
};

export default Header