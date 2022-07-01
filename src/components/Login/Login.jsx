import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { notification, Form, Input } from "antd";

const Login = () => {

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
      navigate("/");
    }
    dispatch(reset());
  // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (<>
    <Form onFinish={onFinish}>
    <div>
      <Form.Item
        // label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email', },
        ]}
      >
        <Input placeholder='Email'  />
      </Form.Item>

      <Form.Item
        // label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!', },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

        <button type="submit">
          Login
        </button>
      </div>
    </Form>

        </>
  )
}

export default Login