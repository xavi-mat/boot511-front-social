import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";

const GateKeeper = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default GateKeeper