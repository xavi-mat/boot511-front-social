import { Button } from "antd";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import NewPost from "./NewPost/NewPost";
import Posts from "./Posts/Posts"

const Home = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <div>

      {
        loginData?.user ?
        <>
        <h1 className="text-header">Home</h1>
          <NewPost />
        </>
          :
          <div className="home-top">
          <h1 className="text-header">Home</h1>
          <div className="home-buttons-box">
            <Button className="round-button" type="primary" size="large"><Link to="/login">Login</Link></Button>
            <Button className="round-button" type="primary" size="large"><Link to="/register">Register</Link></Button>
          </div>
          </div>
      }
      <Posts />
    </div>
  )
}

export default Home