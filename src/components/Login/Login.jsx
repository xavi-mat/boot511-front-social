import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, notification, Form, Input, Space } from 'antd';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
        placement: "bottomRight",
      });
    }
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
        placement: "bottomRight",
      });
      navigate("/");
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  const onFinish = async (values) => {
    setIsSpinning(true);
    await dispatch(login(values));
    setIsSpinning(false);
  };

  return (<>
    <div className="form-box">
      <h1>Log in</h1>
      <Form onFinish={onFinish}>
        <div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email.', },
            ]}>
            <Input className="input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder='Email' />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password.', },
            ]}>
            <Input.Password
              className="input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password" />
          </Form.Item>
          <Space size="large">
            <Form.Item>
              <Button
                id="login-button"
                type="primary"
                htmlType="submit"
                className="login-form-button">
                {isSpinning ? <LoadingOutlined /> : null}
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="reset">Clear</Button>
            </Form.Item>
          </Space>
        </div>
      </Form>
    </div>
  </>)
}

export default Login