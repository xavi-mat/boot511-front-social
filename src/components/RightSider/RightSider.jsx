import { useState } from "react";
import {Input} from "antd";
import { useNavigate } from "react-router-dom";

const RightSider = () => {

  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleChange = (ev) => {
    ev.preventDefault();
    setText(ev.target.value);
    if (ev.key === "Enter" && text.length > 0) {
      navigate("/search/" + text);
    }
  };

  return (
    <div>
    <Input type="text" placeholder="Search" onKeyUp={handleChange} name="text" />
    </div>
  )
}

export default RightSider