import { useState } from "react";
import { Mentions } from "antd";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersByName } from "../../features/data/dataSlice";
import SearchBox from "../SearchBox/SearchBox";
const { Option } = Mentions;

// import Replacer from "../PostCommentBox/Replacer/Replacer";

const RightSider = () => {

  // const navigate = useNavigate();
  // const [text, setText] = useState("");
  const [value, setValue] = useState("")
  const { users } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  // const handleChange = (ev) => {
  //   ev.preventDefault();
  //   setText(ev.target.value);
  //   if (ev.key === "Enter" && text.length > 0) {
  //     navigate("/search/" + text);
  //   }
  // };

  const onChange = (value) => {
    setValue(value);
  };

  const onSelect = async (option) => {
    const newValue = value.match(/.+@/) ?? '@';
    await setValue(newValue + option.value + "<" + option.key + "> ")
    // Move cursor to end
    const mentionsBox = document.querySelector("#mentions-box")
    const end = mentionsBox.value.length;
    mentionsBox.setSelectionRange(end, end);
    mentionsBox.focus();
  };

  const onSearch = async (search) => {
    if (search.length > 0) {
      dispatch(getUsersByName(search));
    }
  }

  return (
    <div className="right-container">
      <SearchBox />


      <hr />
      {/* ------------------------------------------------------------ */}

      <h3>TESTING MENTIONS:</h3>
      <Mentions
        id="mentions-box"
        style={{
          width: '100%',
        }}
        onSearch={onSearch}
        onChange={onChange}
        onSelect={onSelect}
        defaultValue=""
        value={value}
        autoSize >
        {users.map(u => (
          <Option key={u._id} value={u.username}>
            <img src={u.avatar} alt={u._id} className="mini-avatar" />
            <span> {u.username}</span>
          </Option>
        ))}
        {/* <Option key="62c56fbede253af1abdc7e24" value="Fernando Jerde">Fernando Jerde</Option>
        <Option key="62c5bb9bb3068e6604ca8e48" value="xavimat">xavimat</Option>
        <Option key="62c56fbdde253af1abdc7e1e" value="Eddie Powlowski">Eddie Powlowski</Option> */}
      </Mentions>


      <hr />
    </div>
  )
}

export default RightSider