import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const initialForm = { email: '', password: '' };
  const [formData, setFormData] = useState(initialForm);
  const { email, password } = formData;
  const onChange = (ev) => {
    setFormData(prevState => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };
  const dispatch = useDispatch();
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