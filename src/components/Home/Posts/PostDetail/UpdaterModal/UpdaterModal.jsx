import { Modal, Form, Input, Button, notification, Mentions } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, updatePost } from "../../../../../features/posts/postsSlice";
import PostPreviewer from "../../../../PostPreviewer/PostPreviewer";
import { getUsersByName } from "../../../../../features/data/dataSlice";
const { Option } = Mentions;

// const { TextArea } = Input;

const UpdaterModal = ({ editorData, setEditorData }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    form.setFieldsValue(editorData)
    setText(editorData.text);
    // eslint-disable-next-line
  }, [editorData]);

  const handleChangeText = (value) => {
    setText(value);
  }

  const onSelect = async (option) => {
    const newValue = text.match(/.+@/) ?? '@';
    const newMention = option.value + "<" + option.key + "> "
    await setText(newValue + newMention)
    // Move cursor to end
    const mentionsBox = document.querySelector("#editable-area")
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
    setEditorData({ ...editorData, text: text.trim(), loading: true })
    // const text = values.text.trim();
    values.text = text.trim();
    if ((editorData.isPost && values.text.length < 3) || values.text.length < 1) {
      notification.error({
        message: "Error",
        description: "Please, input some valid characters."
      });
      return;
    } else {
      const validData = { ...values, text: values.text };
      if (editorData.isPost) {
        await dispatch(updatePost(validData));
      } else {
        await dispatch(updateComment(validData));
      }
    }
    setEditorData({ ...editorData, loading: false, visible: false });
  }

  return (
    <Modal
      title="Edit"
      visible={editorData.visible}
      footer={[]}
      onCancel={() => { setEditorData({ ...editorData, visible: false }) }}>
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item name="id" hidden={true}><Input /></Form.Item>
        <Mentions
              id="editable-area"
              maxLength={280}
              autoSize
              placeholder="Write here"
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
        <PostPreviewer text={text} />
        <div className="editor-buttons-box">
          <Button
            className="editor-button wide-button"
            onClick={() => { setEditorData({ visible: false }) }}>
            Cancel
          </Button>
          <Form.Item className="editor-button">
            <Button
              className="wide-button"
              type="primary"
              htmlType="submit"
              loading={editorData.loading}>
              Edit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default UpdaterModal