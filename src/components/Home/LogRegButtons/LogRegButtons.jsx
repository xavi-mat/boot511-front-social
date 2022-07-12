import { Button } from "antd"
import { Link } from "react-router-dom"

const LogRegButtons = () => {
  return (
    <div className="home-buttons-box">
      <Button className="wide-button" type="primary">
        <Link to="/login">Login</Link>
      </Button>
      <Button className="wide-button" type="primary">
        <Link to="/register">Register</Link>
      </Button>
    </div>
  )
}

export default LogRegButtons