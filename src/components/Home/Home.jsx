import { useSelector } from "react-redux"
import NewPost from "./NewPost/NewPost";
import Posts from "./Posts/Posts"

const Home = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Home</h1>
      {
        loginData?.user ?
          <NewPost />
          :
          null
      }
      <Posts />
    </div>
  )
}

export default Home