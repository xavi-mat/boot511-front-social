import { useNavigate } from "react-router-dom";

const MiniProfile = ({ user }) => {

  const navigate = useNavigate();

  const date = new Date(user.updatedAt)
    .toLocaleString(
      undefined,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    );

  const handleAuthorClick = (ev) => {
    ev.preventDefault();
    navigate("/user/" + user._id);
  }

  return (
    <div className="mini-box  miniprofile-content" onClick={handleAuthorClick}>
      <div className="avatar-box">
        <img
          src={user.avatar}
          className="avatar"
          alt={user.username}
        />
      </div>
      <div className="content-box">
        <div className="author-date-box">
          <span className="post-author">
            {user.username}
          </span>
          <span className="tone-down">
            Last seen: {date}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MiniProfile