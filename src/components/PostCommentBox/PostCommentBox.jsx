import { useNavigate } from "react-router-dom";
import {
  MessageOutlined,
  LikeOutlined,
  DeleteOutlined,
  FormOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteComment, deletePost, updatePost } from "../../features/posts/postsSlice";
const { TextArea } = Input;

const PostCommentBox = ({ post, isDetail }) => {

  const { user } = useSelector((state) => state.auth.loginData);
  const isAuthor = post.author?._id === user?._id;
  const isPost = typeof post === "object" && 'commentsCount' in post;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditorOn, setIsEditorOn] = useState(false);
  const [postData, setPostData] = useState({ id: post._id, text: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = new Date(post.updatedAt)
    .toLocaleString(
      undefined,
      { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    );

  const handleAuthorClick = (ev) => {
    ev.preventDefault();
    navigate("/user/" + post.author?._id);
  }

  const handleDelete = async (ev) => {
    ev.preventDefault();
    setIsDeleting(true);
    if (isPost) {
      await dispatch(deletePost(post._id));
      navigate("/");
    } else {
      await dispatch(deleteComment(post._id))
    }
    setIsDeleting(false);
  }

  const toggleEditForm = (ev) => {
    ev.preventDefault();
    setIsEditorOn(!isEditorOn);
  }

  const handleOnChange = (ev) => {
    setPostData({ ...postData, text: ev.target.value })
  }

  const handleEdit = async () => {
    setIsEditing(true);
    if (isPost) {
      await dispatch(updatePost(postData))
    } else {
      console.log("UPDATE COMMENT")
    }
    setIsEditing(false);
    setIsEditorOn(false);
  }

  return (
    <div className="post-box">
      <div className="avatar-box">
        <img
          src={post.author?.avatar}
          className="avatar"
          alt={post.author?.username} />
      </div>
      <div className="content-box">
        <div className="author-date-box">
          <span className="post-author" onClick={handleAuthorClick}>
            {post.author?.username}
          </span>
          <span className="tone-down">
            {date}
          </span>
        </div>
        <div>{post.text}</div>
        {post.image ?
          <div><img className="post-image" src={post.image} alt="" /></div>
          :
          null
        }
        <div className="post-info-box">
          {isPost ?
            <div><MessageOutlined /> {post.commentsCount} <span className="tone-down">Comments</span></div>
            :
            null}
          <div>
            <LikeOutlined /> {post.likesCount} <span className="tone-down">Likes</span>
          </div>
        </div>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
        {isAuthor && isDetail ?
          <>
            <div className="post-info-box post-buttons-box">
              <Popconfirm
                placement="bottomRight"
                title={"Are you sure you want to delete this?"}
                onConfirm={handleDelete}
                okText="Delete"
                okButtonProps={{ danger: true }}>
                <Button danger>{isDeleting ? <LoadingOutlined /> : <DeleteOutlined />}</Button>
              </Popconfirm>
              <Button onClick={toggleEditForm}><FormOutlined /></Button>
            </div>
            <Modal
              title="Edit"
              visible={isEditorOn}
              okText="Edit"
              onOk={handleEdit}
              onCancel={toggleEditForm}
              confirmLoading={isEditing}>
              <Form initialValues={{ text: post.text }}>
                <Form.Item name="text">
                  <TextArea showCount
                    maxLength={280}
                    autoSize
                    onChange={handleOnChange}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </>
          : null}
      </div>
    </div>
  )
}

export default PostCommentBox