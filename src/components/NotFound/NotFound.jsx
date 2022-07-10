import SearchBox from "../SearchBox/SearchBox";

const NotFound = () => {
  return (<>
    <div className="not-found-box">
      <h1>404 Page Not Found</h1>
      <h3>Try a search</h3>
      <SearchBox autoFocus={true} />
      <div className="center-box">
        <img src="/logo_big.png" alt="Ribbit" />
      </div>
    </div>
  </>
  )
}

export default NotFound