import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getPostById, getCommentsByPostId, reset, emptyComments } from "../../../../features/posts/postsSlice";
import PostCommentBox from "../../../PostCommentBox/PostCommentBox";
import LogRegButtons from "../../LogRegButtons/LogRegButtons";
import NewComment from "./NewComment/NewComment";
import { Skeleton } from "antd";
import NotFound from "../../../NotFound/NotFound";
import UpdaterModal from "./UpdaterModal/UpdaterModal";

const PostDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, commentsData } = useSelector((state) => state.posts);
  const [loadingComments, setLoadingComments] = useState(false);
  const [editorData, setEditorData] = useState({ text: "", id: "" })
  const { loginData } = useSelector(state => state.auth);

  const getPost = async (id) => {
    dispatch(emptyComments());
    await dispatch(getPostById(id));
    dispatch(reset());
  }

  const getComments = async (id, page = 1) => {
    await dispatch(getCommentsByPostId({ postId: id, page }));
  }

  useEffect(() => {
    getPost(id);
    getComments(id, 1);
    // eslint-disable-next-line
  }, [id]);

  const loadMoreComments = async () => {
    if (loadingComments) { return; }
    setLoadingComments(true);
    await dispatch(getCommentsByPostId({
      postId: id, page: commentsData.page + 1
    }));
    setLoadingComments(false);
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-header">Post detail</h1>
        <div className="post-box">
          <Skeleton avatar active />
        </div>
      </div>
    );
  }

  if (!post) {
    return <NotFound />
  }

  const comment = commentsData.comments?.map((comment, i) => (
    <div key={i}>
      <PostCommentBox
        post={comment}
        isDetail={true}
        editorData={editorData}
        setEditorData={setEditorData} />
    </div>
  ))

  return (
    <div>
      <>
        <div className="home-top">
          <h1 className="text-header">Post detail</h1>
          {loginData?.user ? null : <LogRegButtons />}
        </div>
        <PostCommentBox
          post={post}
          isDetail={true}
          editorData={editorData}
          setEditorData={setEditorData} />
        {loginData?.user?.active ? <NewComment /> : null}
      </>
      <div>
        <InfiniteScroll
          dataLength={comment?.length ?? 0}
          next={loadMoreComments}
          hasMore={comment?.length < commentsData.total}
          loader={<Skeleton avatar active />}
          endMessage={<div className="no-more-box">&nbsp;</div>}>
          {comment}
        </InfiniteScroll>
        {editorData.visible ?
          <UpdaterModal editorData={editorData} setEditorData={setEditorData} />
          :
          null
        }
      </div>
    </div>
  )
}

export default PostDetail