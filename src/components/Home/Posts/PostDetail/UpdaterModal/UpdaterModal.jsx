import { Modal, Form, Input, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment, updatePost } from "../../../../../features/posts/postsSlice";
import PostPreviewer from "../../../../PostPreviewer/PostPreviewer";
const { TextArea } = Input;

const UpdaterModal = ({ editorData, setEditorData }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    form.setFieldsValue(editorData)
    setText(editorData.text);
    // eslint-disable-next-line
  }, [editorData]);

  const handleChangeText = (ev) => {
    setText(ev.target.value);
  }

  const onFinish = async (values) => {
    setEditorData({ ...editorData, text: values.text, loading: true })
    const text = values.text.trim();
    if ((editorData.isPost && text.length < 3) || text.length < 1) {
      notification.error({
        message: "Error",
        description: "Please, input some valid characters."
      });
      return;
    } else {
      const validData = { ...values, text };
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
        onFinish={onFinish}>
        <Form.Item name="id" hidden={true}><Input /></Form.Item>
        <Form.Item name="text">
          <TextArea showCount
            maxLength={280}
            autoSize
            onChange={handleChangeText}
            autoFocus
          />
        </Form.Item>
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