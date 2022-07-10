import { useDispatch, useSelector } from "react-redux"
import {
  CalendarOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  CopyOutlined,
  MessageOutlined,
  SkinOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Col, Pagination, Row, Skeleton, Tooltip, Upload, notification, Space, Popconfirm } from "antd";
import { changeFollowersNum, getPostsByUserId, getSomeUser, reset } from "../../features/posts/postsSlice";
import { useEffect, useState } from "react";
import MiniPost from "./MiniPost/MiniPost";
import { useParams } from "react-router-dom";
import { followUser, getRelations, unfollowUser, updateUser } from "../../features/auth/authSlice";

const Profile = () => {

  const { userId } = useParams();
  const { user } = useSelector((state) => state.posts);
  const { following, followers } = useSelector((state) => state.auth);
  const { loginData } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(posts.page);
  const [fileList, setFileList] = useState([]);
  const [readyToSend, setReadyToSend] = useState(false);
  const [userAvatar, setUserAvatar] = useState(user?.avatar);
  const [isSending, setIsSending] = useState(false);
  const [tryingFollow, setTryingFollow] = useState(false);
  const [youFollow, setYouFollow] = useState(false);
  const [followsYou, setFollowsYou] = useState(false);

  const getUser = async () => {
    await dispatch(getSomeUser(userId));
    await dispatch(getRelations());
    await onPageChange(1);
  }
  const onPageChange = async (page) => {
    setCurrentPage(page);
    await dispatch(getPostsByUserId({ userId, page }));
    dispatch(reset());
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    setUserAvatar(user?.avatar)
  }, [user])

  useEffect(() => {
    const followingIds = following.map(f => f._id);
    setYouFollow(followingIds.includes(userId));
    // eslint-disable-next-line
  }, [following]);

  useEffect(() => {
    const followersIds = followers.map(f => f._id);
    setFollowsYou(followersIds.includes(userId));
    // eslint-disable-next-line
  }, [followers]);

  if (isLoading || !user) {
    return (
      <div>
        <div className="profile-top">
          <div><Skeleton active avatar={{ size: 100 }} /></div>
          <h1><Skeleton.Input active title={{ width: 200 }} /></h1>
        </div>
        <div className="profile-data">
          <Skeleton active />
        </div>
        <div><Skeleton active /></div>
      </div>
    );
  }

  const date = (new Date(user.createdAt))
    .toLocaleDateString(
      undefined,
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

  const post = posts.posts?.map(post => (
    <MiniPost key={post._id} post={post} />
  ))

  const handleRemoveImage = () => {
    setFileList([]);
  }

  const handleAvatarChange = (info) => {
    const file = info.file;
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
      setFileList([file])
      const url = URL.createObjectURL(file);
      setUserAvatar(url)
      setReadyToSend(true);
    }
  }

  const sendNewAvatar = async () => {
    setIsSending(true);
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append('avatar', fileList[0]);
      await dispatch(updateUser(formData));
      setFileList([]);
      setReadyToSend(false);
    }
    setIsSending(false);
  }

  const clearImage = () => {
    setUserAvatar(user?.avatar)
    setReadyToSend(false);
  }

  const handleFollow = async () => {
    setTryingFollow(true);
    await dispatch(followUser(userId))
    dispatch(changeFollowersNum(1))
    setTryingFollow(false);
  }

  const handleUnfollow = async () => {
    setTryingFollow(true);
    await dispatch(unfollowUser(userId))
    dispatch(changeFollowersNum(-1))
    setTryingFollow(false);
  }

  // Action button under avatar: Follow/Unfollow/ChangeMyAvatar/Nothing
  const actionButton = loginData.user ?
    loginData.user._id === userId ?
      <Space>
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={() => false}
          onRemove={handleRemoveImage}
          onChange={handleAvatarChange}
          customRequest={(a) => console.log(a)}
          fileList={fileList}>
          <Button className="action-button" icon={<UploadOutlined />}>Change</Button>
        </Upload>
        <Button
          hidden={!readyToSend}
          type="primary"
          onClick={sendNewAvatar}
          loading={isSending}>
          Click to send image
        </Button>
        <Button
          hidden={!readyToSend}
          onClick={clearImage}>
          Clear image
        </Button>
      </Space>
      :
      youFollow ?
        <Tooltip title="You follow this user. Click to unfollow">
          <Popconfirm
            placement="right"
            title={"Are you sure you want to unfollow this user?"}
            onConfirm={handleUnfollow}
            okText="Unfollow"
            okButtonProps={{danger:true}}>
            <Button
              className="action-button"
              // onClick={handleUnfollow}
              loading={tryingFollow}>
              Unfollow
            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip title="Click to follow">
          <Button
            className="action-button"
            onClick={handleFollow}
            loading={tryingFollow}
            type="primary">
            Follow
          </Button>
        </Tooltip>
    :
    null;

  const paginationBar = (
    <div className="pagination-box">
      <Pagination
        current={currentPage}
        onChange={onPageChange}
        total={posts.total}
        showSizeChanger={false}
      />
    </div>
  );

  return (
    <div>
      <div className="profile-top">
        <div className="profile-top-left">
          <div><img className="avatar-big" src={userAvatar} alt="" /></div>
          <div>
            <h1 className="username-big">{user.username}</h1>
            <div className="green-notice">{followsYou ? "Follows you!" : null}</div>
          </div>
        </div>
        <div>{actionButton}</div>
      </div>
      <div className="profile-data">
        <Row>
          <Col span={12}>
            <div className="icon-big"><UsergroupAddOutlined /> {user.followingCount} <span className="tone-down">following</span></div>
          </Col>
          <Col span={12}>
            <div className="icon-big"><TeamOutlined /> {user.followersCount} <span className="tone-down">followers</span></div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="icon-big"><CopyOutlined /> {user.postsCount} <span className="tone-down">posts</span></div>
          </Col>
          <Col span={12}>
            <div className="icon-big"><MessageOutlined /> {user.commentsCount} <span className="tone-down">comments</span></div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="icon-big"><SkinOutlined /> <span className="tone-down">Role:</span> {user.role}</div>
          </Col>
          <Col span={12}>
            <div className="icon-big"><CalendarOutlined /> <span className="tone-down">Joined</span> {date}</div>
          </Col>
        </Row>
      </div>
      {paginationBar}
      <div>{post}</div>
      {paginationBar}
    </div>
  )
}

export default Profile