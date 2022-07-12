import { Link } from "react-router-dom"

const MiniFooter = () => {
  return (
    <div className="right-container mini-footer">
      <div>
        <Link to="/terms">Terms and conditions</Link>
        &nbsp;
        &copy; 2022 by&nbsp;
        <a
          href="https://www.linkedin.com/in/xavier-matoses/"
          target="_blank"
          rel="noreferrer">
          Xavimat
        </a>
      </div>
    </div>
  )
}

export default MiniFooter