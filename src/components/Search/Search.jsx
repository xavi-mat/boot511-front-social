import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPostsData, searchPostsByText } from "../../features/posts/postsSlice";
import LogRegButtons from "../Home/LogRegButtons/LogRegButtons";
import { Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCommentBox from "../PostCommentBox/PostCommentBox";

const Search = () => {

  const { postText } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isStarting, setIsStarting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchForPosts = async (postText, page = 1) => {
    await dispatch(searchPostsByText({ postText, page }));
  }

  const getInitialSearch = async (postText) => {
    setIsStarting(true);
    await dispatch(resetPostsData());
    await searchForPosts(postText);
    setIsStarting(false);
  }

  useEffect(() => {
    getInitialSearch(postText);
    // eslint-disable-next-line
  }, [postText]);

  const loadMorePosts = async () => {
    if (isSearching) { return; }
    setIsSearching(true);
    await dispatch(searchPostsByText({ postText, page: posts.page + 1 }));
    setIsSearching(false);
  }

  const post = posts.posts?.map((post, i) => {
    return (
      <div key={post._id + i}>
        <Link to={"/post/" + post._id}>
          <PostCommentBox post={post} />
        </Link>
      </div>
    );
  });

  if (isStarting) {
    return (
      <div>
        <div className="home-top">
          <h1 className="text-header">Search results for &ldquo;{postText}&rdquo;</h1>
        </div>
        <div className="total-box">Total: </div>
        <div className="post-box">
          <Skeleton avatar active />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="home-top">
        <h1 className="text-header">Search results for &ldquo;{postText}&rdquo;</h1>
        {loginData.user ? null : <LogRegButtons />}
      </div>
      <div className="total-box">Total: {posts.total}</div>

      <div>
        <InfiniteScroll
          dataLength={posts.posts?.length ?? 0}
          next={loadMorePosts}
          hasMore={posts.posts?.length < posts.total}
          loader={<Skeleton avatar active />}
          endMessage={<div className="no-more-box">&nbsp;</div>}>
          {post}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Search