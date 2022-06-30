import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { notification } from "antd";

const Login = () => {

  const initialForm = { email: '', password: '' };
  const [formData, setFormData] = useState(initialForm);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
        placement:"bottomRight",
      });
    }
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
        placement:"bottomRight",
      });
      navigate("/profile");
    }
    dispatch(reset());
  // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  const onChange = (ev) => {
    setFormData(prevState => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    dispatch(login(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} />
      <input type="password" name="password" value={password} onChange={onChange} />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login