import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelations } from "../../features/auth/authSlice";
import MiniProfile from "../MiniProfile/MiniProfile";

const Following = () => {

  const dispatch = useDispatch();
  const { following } = useSelector((state) => state.auth);

  const getUserData = async () => {
    await dispatch(getRelations());
  }

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const user = following?.map(u => (<MiniProfile key={u._id} user={u} />))

  return (
    <div>
      <h1 className="text-header">Following</h1>
      {user && user.length ?
        user
        :
        <div className="no-more-box">No results</div>
      }
    </div>
  )
}

export default Following