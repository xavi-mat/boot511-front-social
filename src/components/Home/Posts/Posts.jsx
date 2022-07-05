import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Post from "./Post/Post"
import { getAllPosts, reset } from "../../../features/posts/postsSlice";
import { Space, Skeleton } from "antd";

const Posts = () => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.posts);

  const getData = async () => {
    await dispatch(getAllPosts());
    dispatch(reset());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div>
        <h3>
          <Space className="pagination-box">
            <Skeleton.Button /><Skeleton.Button />
            <Skeleton.Button /><Skeleton.Button />
          </Space>
        </h3>
        <div className="post-box"><Skeleton avatar active /></div>
      </div>
    );
  }

  return (
    <div>
      <Post />
    </div>
  )
}

export default Posts