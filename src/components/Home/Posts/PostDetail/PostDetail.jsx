import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getById, reset } from "../../../../features/posts/postsSlice";
import PostCommentBox from "../../../PostCommentBox/PostCommentBox";
import LogRegButtons from "../../LogRegButtons/LogRegButtons";
import NewComment from "./NewComment/NewComment";

const PostDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);
  const { loginData } = useSelector(state => state.auth);

  const getPost = async (id) => {
    await dispatch(getById(id));
    dispatch(reset());
  }

  useEffect(() => {
    getPost(id);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-header">Post detail</h1>
        <h2>Loading...</h2>
      </div>
    );
  }
  const comment = post.comments?.map(comment => (
    <div key={comment._id}>
      <PostCommentBox post={comment} />
    </div>
  ))

  return (
    <div>
      {loginData?.user ?
        <>
          <h1 className="text-header">Post detail</h1>
          <PostCommentBox post={post} />
          <NewComment />
        </>
        :
        <div className="home-top">
          <h1 className="text-header">Post detail</h1>
          <LogRegButtons />
        </div>
      }
      <div>{comment}</div>
    </div>
  )
}

export default PostDetail