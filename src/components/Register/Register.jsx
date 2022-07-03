import { Button, Checkbox, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import {Form} from "antd";

const Register = () => {

  const initialForm = { username: '', email: '', password: '', pass2: '' };
  const [formData, setFormData] = useState(initialForm);
  const { username, email, password, pass2 } = formData;
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
        placement: "bottomRight"
      });
    }
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
        placement: "bottomRight",
      });
    }
    dispatch(reset());
  // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const onChange = (ev) => {
    setFormData(prevState => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (password !== pass2) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match",
        placement: "bottomRight",
      });
    } else {
      dispatch(register(formData));
    }
  };

  return (
    <Form>
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={username} onChange={onChange} />
      <input type="email" name="email" value={email} onChange={onChange} />
      <input type="password" name="password" value={password} onChange={onChange} />
      <input type="password" name="pass2" value={pass2} onChange={onChange} />
      <Form.Item
          name="acceptTerms"
          valuePropName="checked"
          rules={[
            { required: true, message: 'Please accept terms and conditions.' },
          ]}
        >
          <Checkbox>I accept the Terms and Conditions.</Checkbox>
        </Form.Item>
      <button type="submit">Register</button>
      <Form.Item>
              <Button htmlType="reset">Clear</Button>
            </Form.Item>
    </form>
    </Form>
  )
}

export default Register