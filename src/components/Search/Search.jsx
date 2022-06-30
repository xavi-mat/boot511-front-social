import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsByTitle } from "../../features/posts/postsSlice";
import Post from "../Home/Posts/Post/Post";

const Search = () => {

  const { postTitle } = useParams();
  const dispatch = useDispatch();

  const getData = async (postTitle) => {
    await dispatch(getPostsByTitle(postTitle));
  }

  useEffect(() => {
    getData(postTitle);
  }, [postTitle]);

  return (
    <div><Post /></div>
  )
}

export default Search