import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsByText } from "../../features/posts/postsSlice";
import Post from "../Home/Posts/Post/Post";

const Search = () => {

  const { postText } = useParams();
  const dispatch = useDispatch();

  const getData = async (postText) => {
    await dispatch(getPostsByText(postText));
  }

  useEffect(() => {
    getData(postText);
  }, [postText]);

  return (
    <div><Post /></div>
  )
}

export default Search