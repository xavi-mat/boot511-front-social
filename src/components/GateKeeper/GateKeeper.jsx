import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "../Register/Register";
import Login from "../Login/Login";
import LeftSider from "../LeftSider/LeftSider";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import PostDetail from "../Home/Posts/PostDetail/PostDetail";
import Search from "../Search/Search";
import Admin from "../Admin/Admin";
import { useDispatch, useSelector } from "react-redux";
import MiniFooter from "../MiniFooter/MiniFooter";
import { Layout, Space, Spin } from 'antd';
import RightSider from "../RightSider/RightSider";
import AdminZone from "../../guards/AdminZone";
import PrivateZone from "../../guards/PrivateZone";
import NotFound from "../NotFound/NotFound";
import { setIsCollapsed } from "../../features/data/dataSlice";
import SearchBox from "../SearchBox/SearchBox";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import Legal from "../Legal/Legal";
import { useEffect, useState } from "react";
import { getPostsByUserId, getSomeUser } from "../../features/posts/postsSlice";
import { getRelations } from "../../features/auth/authSlice";
import Following from "../Following/Following";
import Followers from "../Followers/Followers";

const { Content, Sider } = Layout;

const GateKeeper = () => {

  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.data);
  const [isLoadingMain, setIsLoadingMain] = useState(true);

  const getInitialData = async () => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    const userId = loginData?.user?._id;
    if (userId) {
      await dispatch(getSomeUser(userId));
      await dispatch(getRelations());
      await dispatch(getPostsByUserId({ userId, page: 1 }));
    }
    setIsLoadingMain(false);
  }

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line
  }, [])

  if (isLoadingMain) {
    return (
      <div className="main-loader">
        <img src="/logo_big.png" alt="Ribbit" />
        <Space size="large">
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
        </Space>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Layout className="main-layout">
        {isCollapsed ?
          null
          :
          <Sider
            theme="light"
            breakpoint="xl"
            className="sider-left">
            <LeftSider />
          </Sider>
        }
        <Content className="main-container">
          {isCollapsed ?
            <div className="collapsed-top-box">
              <DrawerMenu />
              <SearchBox />
            </div>
            :
            null}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page/:page" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/search/:postText" element={<Search />} />
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/following" element={
              <PrivateZone>
                <Following />
              </PrivateZone>
            } />
            <Route path="/followers" element={
              <PrivateZone>
                <Followers />
              </PrivateZone>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminZone><Admin /></AdminZone>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Sider
          theme="light"
          width={350}
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed) => {
            dispatch(setIsCollapsed(collapsed));
          }}
          className="sider-right">
          <RightSider />
          <MiniFooter />
        </Sider>
      </Layout>
    </BrowserRouter>
  )
}

export default GateKeeper