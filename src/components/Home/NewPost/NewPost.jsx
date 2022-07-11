import { Form, Button, notification, Upload, Mentions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../features/posts/postsSlice";
import { getUsersByName } from "../../../features/data/dataSlice";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import PostPreviewer from "../../PostPreviewer/PostPreviewer";
const { Option } = Mentions;

// const { TextArea } = Input;

const NewPost = () => {

  const [fileList, setFileList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginData } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.data);

  const handleUpload = (file) => {
    // File validations: Type and size
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

  const handleClearForm = () => {
    setText("");
    handleRemoveImage();
  }

  const handleChangeText = (value) => {
    setText(value);
  }

  const onSelect = async (option) => {
    const newValue = text.match(/.+@/) ?? '@';
    const newMention = option.value + "<" + option.key + "> "
    await setText(newValue + newMention)
    // Move cursor to end
    const mentionsBox = document.querySelector("#mentionable-box")
    const end = mentionsBox.value.length;
    mentionsBox.setSelectionRange(end, end);
    mentionsBox.focus();
  };

  const onSearch = async (search) => {
    if (search.length > 0) {
      dispatch(getUsersByName(search));
    }
  }

  const onFinish = async (values) => {
    setIsSending(true);
    values.text = text.trim();
    if (values.text.length < 3) {
      notification.error({
        message: "Error",
        description: "Please, input at least three valid characters."
      });
    } else {
      const formData = new FormData();
      if (fileList.length > 0) {
        formData.append('image', fileList[0])
      }
      formData.append('text', values.text)
      await dispatch(createPost(formData));
      setText("");
      form.resetFields();
      setFileList([]);
    }
    setIsSending(false);
  };

  return (
    <>
      <div className="post-box">
        <div className="avatar-box hide-xsmall">
          <img
            src={loginData.user.avatar}
            className="avatar"
            alt={loginData.user.username} />
        </div>
        <div className="content-box top-margin">
          <Form
            name="newPost"
            form={form}
            onFinish={onFinish}
            // initialValues={{ text: "" }}
            autoComplete="off">
            <Mentions
              id="mentionable-box"
              maxLength={280}
              autoSize
              placeholder="What are you thinking?"
              onSearch={onSearch}
              onChange={handleChangeText}
              onSelect={onSelect}
              defaultValue=""
              autoFocus
              value={text} >
              {users ?
                users.map(u => (
                  <Option key={u._id} value={u.username}>
                    <img src={u.avatar} alt={u._id} className="mini-avatar" />
                    <span> {u.username}</span>
                  </Option>
                ))
                : null}
            </Mentions>
            <div className="length-counter-box"><span className="tone-down">{text.length} / 280</span></div>
            <PostPreviewer text={text} />
            <div className="newpost-buttons">
              <Form.Item className="to-front">
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
              <div className="newpost-right-buttons">
                <Form.Item>
                  <Button
                    className="wide-button hide-xsmall"
                    htmlType="reset"
                    onClick={handleClearForm}>
                    Clear
                  </Button>
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
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default NewPost