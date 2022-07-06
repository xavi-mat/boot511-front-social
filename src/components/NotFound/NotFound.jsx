import RightSider from "../RightSider/RightSider";

const NotFound = () => {
  return (<>
    <div className="not-found-box">
      <h1>404 Page Not Found</h1>
      <h3>Try a search</h3>
      <RightSider autoFocus={true} />
    </div>
  </>
  )
}

export default NotFound