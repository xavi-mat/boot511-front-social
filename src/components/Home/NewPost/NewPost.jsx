import { Form, Input, Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { createPost } from "../../../features/posts/postsSlice";

const NewPost = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const doCreatePost = async (values) => {
    await dispatch(createPost(values));
    form.resetFields();
  }

  const onFinish = (values) => {
    doCreatePost(values);
  };

  return (
    <Form
      name="newPost"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{ text: "" }}
    >
      <Form.Item
        name="text"
        rules={[
          { required: true, message: 'Please input a text.', },
        ]}
      >
        <Input placeholder="What are you thinking?" />
      </Form.Item>

      <Space size="large">
        <Form.Item>
          <Button type="primary" htmlType="submit">Send</Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="reset">Clear</Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

export default NewPost