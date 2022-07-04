import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Register from "../Register/Register";
import Login from "../Login/Login";
import LeftSider from "../LeftSider/LeftSider";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import PostDetail from "../Home/Posts/PostDetail/PostDetail";
import Search from "../Search/Search";
import Admin from "../Admin/Admin";
import { useSelector } from "react-redux";
import MiniFooter from "../MiniFooter/MiniFooter";
import { Layout } from 'antd';
import RightSider from "../RightSider/RightSider";
const { Content, Sider } = Layout;

const GateKeeper = () => {

  const { loginData } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Layout>
        <Sider
          theme="light"
          breakpoint="lg"
          className="sider-box">
          <LeftSider />
        </Sider>
        <Content className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/search/:postText" element={<Search />} />
            <Route path="/user/:userId" element={<Profile />} />

            {loginData.user ?
              <>
                {/* <Route path="/prof ile" element={<Profile user={loginData.user} />} /> */}
              </>
              :
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            }

            {loginData.user?.role === "admin" ?
              <Route path="/admin" element={<Admin />} />
              :
              null
            }

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          className="sider-box">
          <RightSider />
          <MiniFooter />
        </Sider>
      </Layout>
    </BrowserRouter>
  )
}

export default GateKeeper