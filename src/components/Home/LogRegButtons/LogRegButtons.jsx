import { Button } from "antd"
import { Link } from "react-router-dom"

const LogRegButtons = () => {
  return (
    <div className="home-buttons-box">
      <Button className="round-button" type="primary" size="large"><Link to="/login">Login</Link></Button>
      <Button className="round-button" type="primary" size="large"><Link to="/register">Register</Link></Button>
    </div>
  )
}

export default LogRegButtons