import { useSelector } from "react-redux"
import LogRegButtons from "./LogRegButtons/LogRegButtons";
import NewPost from "./NewPost/NewPost";
import Posts from "./Posts/Posts"

const Home = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="home-top">
        <h1 className="text-header">Home</h1>
        {loginData.user ? null : <LogRegButtons />}
      </div>
      {loginData.user?.active ? <NewPost /> : null}
      <Posts />
    </div>
  )
}

export default Home