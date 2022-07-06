import { useNavigate } from "react-router-dom";
import {
  MessageOutlined,
  LikeOutlined,
  DeleteOutlined,
  FormOutlined,
  LoadingOutlined,
  LikeTwoTone,
  LikeFilled,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, notification, Tooltip, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteComment,
  deletePost,
  likeComment,
  likePost,
  unlikeComment,
  unlikePost,
  updateComment,
  updatePost
} from "../../features/posts/postsSlice";
import { updateUser } from "../../features/auth/authSlice";
const { TextArea } = Input;

const PostCommentBox = ({ post, isDetail }) => {

  const { user } = useSelector((state) => state.auth.loginData);
  const isAuthor = post.author?._id === user?._id;
  const isPost = typeof post === "object" && 'commentsCount' in post;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isUnliking, setIsUnliking] = useState(false);
  const [isEditorOn, setIsEditorOn] = useState(false);
  const [postData, setPostData] = useState({ id: post._id, text: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const youLiked = isPost ?
    user?.likedPosts?.includes(post._id) :
    user?.likedComments?.includes(post._id);


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
    const text = postData.text.trim();
    if ((isPost && text.length < 3) || text.length < 1) {
      notification.error({
        message: "Error",
        description: "Please, input some valid characters."
      });
      return;
    } else {
      const validData = { ...postData, text };
      if (isPost) {
        await dispatch(updatePost(validData));
      } else {
        await dispatch(updateComment(validData));
      }
    }
    setIsEditing(false);
    setIsEditorOn(false);
  }

  const handleLike = async (ev) => {
    ev.preventDefault();
    setIsLiking(true);
    if (isPost) {
      const res = await dispatch(likePost(post._id));
      if (res.meta.requestStatus === "fulfilled") {
        const updatedUser = { ...user };
        updatedUser.likedPosts = [...updatedUser.likedPosts, post._id];
        await dispatch(updateUser(updatedUser));
      }
    } else {
      const res = await dispatch(likeComment(post._id));
      if (res.meta.requestStatus === "fulfilled") {
        const updatedUser = { ...user };
        updatedUser.likedComments = [...updatedUser.likedComments, post._id];
        await dispatch(updateUser(updatedUser));
      }
    }
    setIsLiking(false);
  }

  const handleUnlike = async (ev) => {
    ev.preventDefault();
    setIsUnliking(true);
    if (isPost) {
      const res = await dispatch(unlikePost(post._id));
      if (res.meta.requestStatus === "fulfilled") {
        const likedPosts = user.likedPosts.filter(pId => pId !== post._id)
        await dispatch(updateUser({ ...user, likedPosts }));
      }
    } else {
      const res = await dispatch(unlikeComment(post._id));
      if (res.meta.requestStatus === "fulfilled") {
        const likedComments = user.likedComments.filter(cId => cId !== post._id)
        await dispatch(updateUser({ ...user, likedComments }));
      }
    }
    setIsUnliking(false);
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
          <div>
            <Image className="post-image" src={post.image} alt="" preview={{ maskClassName: "post-image" }} />
          </div>
          :
          null
        }
        <div className="post-below-box">
          <div className="post-info-box">
            {isPost ?
              <div><MessageOutlined /> {post.commentsCount} <span className="tone-down">Comments</span></div>
              :
              null}
            <div>
              <LikeOutlined /> {post.likesCount} <span className="tone-down">Likes</span>
            </div>
            {user ?
              <div>
                {youLiked ?
                  <Tooltip title={"You like it. Click to delete your like"}>
                    <Button
                      shape="circle"
                      icon={<LikeFilled style={{ color: "#52c41a" }} />}
                      onClick={handleUnlike}
                      loading={isUnliking}
                    />
                  </Tooltip>
                  :
                  <Tooltip title="Click to give a like">
                    <Button
                      shape="circle"
                      icon={<LikeTwoTone twoToneColor="#52c41a" />}
                      onClick={handleLike}
                      loading={isLiking}
                    />
                  </Tooltip>
                }
              </div>
              : null
            }
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