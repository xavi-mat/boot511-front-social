import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import PostDetail from "../Home/Posts/PostDetail/PostDetail";
import Search from "../Search/Search";
import Admin from "../Admin/Admin";
import { useSelector } from "react-redux";

const GateKeeper = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/search/:postTitle" element={<Search />} />
        {/* {loginData?.user.role === "admin" ?
          <Route path="/admin" element={<Admin />} />
          : null
        } */}
        <Route path="/admin" element={
          loginData?.user.role === "admin" ?
            <Admin />
            : <Home />
        }
        />


      </Routes>
    </BrowserRouter>
  )
}

export default GateKeeper