import { Input } from "antd"
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const SearchBox = ({ autoFocus = false }) => {

  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate("/search/" + value);
  }

  return (
    <div className="search-box">
      <Search
        placeholder="Search"
        onSearch={handleSearch}
        autoFocus={autoFocus}
      />
    </div>
  )
}

export default SearchBox