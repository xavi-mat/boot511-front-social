import { useState } from "react";
import { Mentions } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUsersByName } from "../../features/data/dataSlice";
import SearchBox from "../SearchBox/SearchBox";
const { Option } = Mentions;

const RightSider = () => {

  const [value, setValue] = useState("")
  const { users } = useSelector((state) => state.data);
  const dispatch = useDispatch();

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
        {users ?
          users.map(u => (
            <Option key={u._id} value={u.username}>
              <img src={u.avatar} alt={u._id} className="mini-avatar" />
              <span> {u.username}</span>
            </Option>
          ))
          : null}
      </Mentions>


      <hr />
    </div>
  )
}

export default RightSider