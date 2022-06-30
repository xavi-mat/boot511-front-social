import { Form, Input, Button } from "antd";

const NewPost = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: 'Please input a title.', },
        ]}
      >
        <Input placeholder="Title"/>
      </Form.Item>

      <Form.Item
        name="body"
        rules={[
          { required: true, message: 'Please write some text.', },
        ]}
      >
        <Input placeholder="Body" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Send</Button>
      </Form.Item>
    </Form>
  );
}

export default NewPost