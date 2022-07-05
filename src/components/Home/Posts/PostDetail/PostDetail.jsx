import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getById, getCommentsByPostId, reset } from "../../../../features/posts/postsSlice";
import PostCommentBox from "../../../PostCommentBox/PostCommentBox";
import LogRegButtons from "../../LogRegButtons/LogRegButtons";
import NewComment from "./NewComment/NewComment";
import { Skeleton } from "antd";
import NotFound from "../../../NotFound/NotFound";

const PostDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, commentsData } = useSelector((state) => state.posts);
  const [loadingComments, setLoadingComments] = useState(false);
  const { loginData } = useSelector(state => state.auth);

  const getPost = async (id) => {
    await dispatch(getById(id));
    dispatch(reset());
  }

  const getComments = async (id, page = 1) => {
    await dispatch(getCommentsByPostId({ postId: id, page }));
  }

  useEffect(() => {
    getPost(id);
    getComments(id, 1);
    // eslint-disable-next-line
  }, []);

  const loadMoreComments = async () => {
    if (loadingComments) { return; }
    setLoadingComments(true);
    setTimeout(async () => {
      await dispatch(getCommentsByPostId({
        postId: id, page: commentsData.page + 1
      }));
      setLoadingComments(false);
    }, 2000);
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-header">Post detail</h1>
        <Skeleton avatar active />
      </div>
    );
  }

  if (!post) {
    return <NotFound />
  }

  const comment = commentsData.comments?.map((comment, i) => (
    <div key={i}>
      <PostCommentBox post={comment} isDetail={true} />
    </div>
  ))

  return (
    <div>
      {loginData?.user ?
        <>
          <h1 className="text-header">Post detail</h1>
          <PostCommentBox post={post} isDetail={true} />
          <NewComment />
        </>
        :
        <>
          <div className="home-top">
            <h1 className="text-header">Post detail</h1>
            <LogRegButtons />
          </div>
          <PostCommentBox post={post} isDetail={true} />
        </>
      }
      <div>
        <InfiniteScroll
          dataLength={comment?.length ?? 0}
          next={loadMoreComments}
          hasMore={comment?.length < commentsData.total}
          loader={<Skeleton avatar active />}
          endMessage={<div className="no-more-box">No more comments</div>}
        // scrollableTarget="scrollableDiv"
        >
          {comment}
        </InfiniteScroll>
      </div>
      {/* <div>{comment}</div> */}
    </div>
  )
}

export default PostDetail