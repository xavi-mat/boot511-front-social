import { useSelector } from "react-redux"
import LogRegButtons from "./LogRegButtons/LogRegButtons";
import NewPost from "./NewPost/NewPost";
import Posts from "./Posts/Posts"

const Home = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <div>
      {
        loginData.user ?
        <>
        <h1 className="text-header">Home</h1>
          <NewPost />
        </>
          :
          <div className="home-top">
          <h1 className="text-header">Home</h1>
          <LogRegButtons />
          </div>
      }
      <Posts />
    </div>
  )
}

export default Home