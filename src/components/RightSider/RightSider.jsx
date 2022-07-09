import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getMoreLiked } from "../../features/posts/postsSlice";
import SearchBox from "../SearchBox/SearchBox";
import NanoPost from "./NanoPost/NanoPost";

const RightSider = () => {

  const dispatch = useDispatch();
  const { moreLiked } = useSelector((state) => state.posts);

  const getPosts = async () => {
    await dispatch(getMoreLiked());
  }

  useEffect(()=> {
    getPosts();
  // eslint-disable-next-line
  }, []);

  const post = moreLiked?.slice(0,4).map(post => (
    <NanoPost key={post._id} post={post} />
  ))

  return (
    <div className="right-container">
      <SearchBox />
      <div>
        <h2>What's favorite</h2>
        {post}
      </div>
    </div>
  )
}

export default RightSider