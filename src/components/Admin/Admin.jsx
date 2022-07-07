import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts, reset, cleanAll } from "../../features/posts/postsSlice";
import PostAdmin from "./PostAdmin/PostAdmin";
import TryScroll from "./TryScroll/TryScroll";

const Admin = () => {

  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getAllPosts());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
  // eslint-disable-next-line
  }, []);



  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }

  return (
    <div>
      <h1>Admin</h1>
      {/* <hr/>
        <TryScroll/>
      <hr/> */}
      <button onClick={() => dispatch(cleanAll())}>CLEAN ALL</button>
      <PostAdmin />
    </div>
  )
}

export default Admin