import { Form, Button, Checkbox, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import Legal from "../Legal/Legal";
const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {

  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [isSpinning, setIsSpinning] = useState(false);
  const [emailLink, setEmailLink] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
        placement: "top"
      });
    }
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
        placement: "top",
      });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords do not match.'));
    },
  });

  const validateAgreement = (_, value) =>
    value ?
      Promise.resolve() :
      Promise.reject(new Error('Should accept agreement'))

  const onFinish = async (values) => {
    setIsSpinning(true);
    await dispatch(register(values));
    setIsSpinning(false);
    setEmailLink(true);
  };

  return (<>
    <div className="form-box">
      <h1>Register</h1>
      {emailLink ?
        <h1 className="center-box">
          <a
            href={API_URL + "/fakeEmail.html"}
            target="_blank"
            rel="noreferrer">
            ACCESS EMAIL HERE
          </a>
        </h1>
        : null}
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please, write your username.' },
            { min: 3, message: "Username too short." },
            { max: 40, message: "Username too long." }
          ]}>
          <Input className="input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder='Username' />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'Please, write a valid email.' },
            { required: true, message: 'Please, input your email.' }
          ]}>
          <Input className="input"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder='Email' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' }
          ]}
          hasFeedback
        >
          <Input.Password
            className="input"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password.' },
            validatePassword,
          ]}
        >
          <Input.Password className="input"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <div className="author-date-box">
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: validateAgreement
              },
            ]}
          >
            <Checkbox>I accept the Terms and Conditions.</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset" className="hide-xsmall">Clear</Button>
          </Form.Item>
          <Form.Item>
            <Button
              id="login-button"
              type="primary"
              htmlType="submit"
              className="spin-form-button">
              {isSpinning ? <LoadingOutlined /> : null}
              Register
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
    <Legal />
  </>)
}

export default Register