import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { TextArea } = Input;

const NewComment = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginData } = useSelector((state) => state.auth);

  const doCreateComment = async (values) => {
    // await dispatch(createComment(values));
    console.log("TODO: await dispatch(createComment(values));")
    form.resetFields();
  }

  const onFinish = (values) => {
    doCreateComment(values);
  };

  return (
    <div className="newpost-box">
      <div className="post-box">
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
                <Button className="round-button" size="large" onClick={() => alert("Not working key")}>
                  Add image
                </Button>
              </Form.Item>
              <Form.Item>
                <Button className="round-button" size="large" htmlType="reset">Clear</Button>
              </Form.Item>
              <Form.Item>
                <Button className="round-button" size="large" type="primary" htmlType="submit">Send</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default NewComment