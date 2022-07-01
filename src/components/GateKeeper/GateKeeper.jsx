import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "../Register/Register";
import Login from "../Login/Login";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import PostDetail from "../Home/Posts/PostDetail/PostDetail";
import Search from "../Search/Search";
import Admin from "../Admin/Admin";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

const GateKeeper = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Layout>
        <Layout>
          <Header><NavBar /></Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/search/:postTitle" element={<Search />} />
              <Route path="/admin" element={
                loginData?.user.role === "admin" ?
                  <Admin />
                  :
                  <Home />
              } />
            </Routes>
          </Content>
          <Footer />
        </Layout>
        <Sider>right sidebar</Sider>
      </Layout>
    </BrowserRouter>
  )
}

export default GateKeeper