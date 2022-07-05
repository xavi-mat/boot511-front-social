import { Form, Input, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../../../features/posts/postsSlice";
const { TextArea } = Input;

const NewComment = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginData } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.posts);

  const onFinish = async (values) => {
    values.text = values.text.trim();
    if (values.text.length < 1) {
      notification.error({
        message: "Error",
        description: "Please, input some valid characters."
      });
    } else {
      values.postId = post._id;
      await dispatch(createComment(values));
      form.resetFields();
    }
  };

  return (
    <div className="newcomment-box">
      <div className="avatar-box">
        <img
          src={loginData?.user.avatar}
          className="avatar"
          alt={loginData?.user.username} />
      </div>
      <div className="content-box top-margin">
        <Form
          name="newComment"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ text: "" }}>
          <Form.Item
            name="text"
            rules={[{ required: true, message: 'Please input a text.' }]}>
            <TextArea
              showCount
              maxLength={280}
              autoSize
              placeholder="Write an answer"
            />
          </Form.Item>

          <div className="newpost-buttons">
            <Form.Item>
              <Button className="wide-button" onClick={() => alert("Not working key")}>
                Add image
              </Button>
            </Form.Item>
            <Form.Item>
              <Button className="wide-button" htmlType="reset">Clear</Button>
            </Form.Item>
            <Form.Item>
              <Button className="wide-button" type="primary" htmlType="submit">Send</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default NewComment