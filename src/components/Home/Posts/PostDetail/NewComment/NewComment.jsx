import { Form, Button, notification, Upload, Mentions } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../../../features/posts/postsSlice";
import PostPreviewer from "../../../../PostPreviewer/PostPreviewer";
import { getUsersByName } from "../../../../../features/data/dataSlice";
const { Option } = Mentions;

const NewComment = () => {

  const [fileList, setFileList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginData } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.data);

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

  const handleClear = () => {
    handleRemoveImage();
    setText("");
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
      setText("");
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
          // initialValues={{ text: "" }}
          autoComplete="off">
          {/* <Form.Item
            name="text"
            rules={[{ required: true, message: 'Please input a text.' }]}> */}
            {/* <TextArea
              showCount
              maxLength={280}
              autoSize
              placeholder="Write an answer"
              onChange={handleChangeText}
            /> */}
            <Mentions
              id="mentionable-box"
              maxLength={280}
              autoSize
              placeholder="Write an answer"
              onSearch={onSearch}
              onChange={handleChangeText}
              onSelect={onSelect}
              defaultValue=""
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
          {/* </Form.Item> */}
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
                  className="wide-button"
                  htmlType="reset"
                  onClick={handleClear}>
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
  );
}

export default NewComment