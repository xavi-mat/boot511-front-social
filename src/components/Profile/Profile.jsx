import { useSelector } from "react-redux"

const Profile = () => {
  const { loginData } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Profile</h1>
      <p>{loginData.user.username}</p>
      <p>{loginData.user.email}</p>
    </div>
  )
}

export default Profile