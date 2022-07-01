import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAll, reset, cleanAll } from "../../features/posts/postsSlice";
import PostAdmin from "./PostAdmin/PostAdmin";

const Admin = () => {

  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
  }, []);

 

  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={() => dispatch(cleanAll())}>CLEAN ALL</button>
      <PostAdmin />
    </div>
  )
}

export default Admin