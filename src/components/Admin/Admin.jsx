import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAll, reset } from "../../features/posts/postsSlice";
import PostAdmin from "./PostAdmin/PostAdmin";

const Admin = () => {

  const { isLoading } = useSelector((state) => state.posts);
  const dispach = useDispatch();

  const getPostsAndReset = async () => {
    await dispach(getAll());
    dispach(reset());
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
      <PostAdmin />
    </div>
  )
}

export default Admin