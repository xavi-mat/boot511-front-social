import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelations } from "../../features/auth/authSlice";
import MiniProfile from "../MiniProfile/MiniProfile";

const Followers = () => {

  const dispatch = useDispatch();
  const { followers } = useSelector((state) => state.auth);

  const getUserData = async () => {
    await dispatch(getRelations());
  }

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const user = followers?.map(u => (<MiniProfile key={u._id} user={u} />));

  return (
    <div>
      <h1 className="text-header">Followers</h1>
      {user && user.length ?
        user
        :
        <div className="no-more-box">No results</div>
      }
    </div>
  )
}

export default Followers