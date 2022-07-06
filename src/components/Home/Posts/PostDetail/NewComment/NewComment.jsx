import { Form, Input, Button, notification, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../../../features/posts/postsSlice";
const { TextArea } = Input;

const NewComment = () => {

  const [fileList, setFileList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginData } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.posts);

  const handleUpload = (file) => {
    // Validations: Type and size
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.error({ message: "Please, select a jpg or png file" });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.error({ message: "Image too large" });
    }
    if (isJpgOrPng && isLt2M) {
      setFileList([file]);
    }
    return false;
  }

  const handleRemoveImage = () => {
    setFileList([]);
  }

  const onFinish = async (values) => {
    setIsSending(true);
    values.text = values.text.trim();
    if (values.text.length < 1) {
      notification.error({
        message: "Error",
        description: "Please, input some valid characters."
      });
    } else {
      const formData = new FormData();
      if (fileList.length > 0) {
        formData.append('image', fileList[0])
      }
      formData.append('text', values.text)
      formData.append('postId', post._id)
      await dispatch(createComment(formData));
      form.resetFields();
      setFileList([]);
    }
    setIsSending(false);
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
              <Upload
                name="image"
                beforeUpload={handleUpload}
                onRemove={handleRemoveImage}
                fileList={fileList}>
                <Button
                  className="wide-button"
                  icon={<UploadOutlined />}>
                  Add image
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button className="wide-button" htmlType="reset">Clear</Button>
            </Form.Item>
            <Form.Item>
              <Button
                className="wide-button"
                type="primary"
                htmlType="submit"
                loading={isSending}>
                Send
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default NewComment