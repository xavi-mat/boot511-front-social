import { Link } from "react-router-dom"

const MiniFooter = () => {
  return (
    <div className="right-container mini-footer">
      <div><Link to="/terms">Terms and conditions</Link>
      &nbsp;&nbsp;
      &copy; 2022 by Xavimat</div>
    </div>
  )
}

export default MiniFooter