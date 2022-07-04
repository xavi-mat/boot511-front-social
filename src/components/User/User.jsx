import { Skeleton } from "antd";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSomeUser, reset } from "../../features/posts/postsSlice";
import Profile from "../Profile/Profile";

const User = () => {

  const { id } = useParams();
  const { user } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getUser = async () => {
    await dispatch(getSomeUser(id));
    dispatch(reset());
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return (<Skeleton avatar active />)
  }

  return (
    <Profile user={user} />
  )
}

export default User