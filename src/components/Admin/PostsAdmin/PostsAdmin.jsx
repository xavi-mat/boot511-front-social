import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPosts, resetPostsData } from "../../../features/admin/adminSlice";
import PostAdmin from "./PostAdmin/PostAdmin";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

const PostsAdmin = () => {

  const { postsData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const getPostsData = async (page) => {
    setIsSearching(true);
    await dispatch(getPosts(page));
    setIsSearching(false);
  }

  const getInitialPostsData = async () => {
    await dispatch(resetPostsData());
    await getPostsData(1);
  }

  useEffect(() => {
    setIsSearching(true);
    getInitialPostsData();
  // eslint-disable-next-line
  }, [])

  const loadMorePosts = () => {
    if (isSearching) { return; }
    getPostsData(postsData.page + 1);
  }

  const post = postsData.posts?.map(
    (p, i) => <PostAdmin key={p._id + i} post={p} />
  );

  return (
    <div>
      <InfiniteScroll
        dataLength={postsData.posts?.length ?? 0}
        next={loadMorePosts}
        hasMore={postsData.posts?.length < postsData.total}
        loader={<Skeleton active />}
        endMessage={<div className="no-more-box">&nbsp;</div>}>
        {post}
      </InfiniteScroll>
    </div>
  )
}

export default PostsAdmin