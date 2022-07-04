import { useDispatch, useSelector } from "react-redux"
import {
  CalendarOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  CopyOutlined,
  TagsOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import { Col, Pagination, Row, Skeleton } from "antd";
import { getPostsByUserId, getSomeUser, reset } from "../../features/posts/postsSlice";
import { useEffect, useState } from "react";
import MiniPost from "./MiniPost/MiniPost";
import { useParams } from "react-router-dom";

const Profile = () => {

  const { userId } = useParams();
  const { user } = useSelector((state) => state.posts);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(posts.page);

  const getUser = async () => {
    await dispatch(getSomeUser(userId));
    await onPageChange(1)
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
        <div><img className="avatar-big" src={user.avatar} alt="" /></div>
        <h1><strong>{user.username}</strong></h1>
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
            <div className="icon-big"><TagsOutlined /> {user.commentsCount} <span className="tone-down">comments</span></div>
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