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
import { Layout } from 'antd';
import RightSider from "../RightSider/RightSider";
import AdminZone from "../../guards/AdminZone";
import UnloggedZone from "../../guards/UnloggedZone";
import NotFound from "../NotFound/NotFound";
import { setIsCollapsed } from "../../features/data/dataSlice";
import SearchBox from "../SearchBox/SearchBox";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

const { Content, Sider } = Layout;

const GateKeeper = () => {

  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.data);

  return (
    <BrowserRouter>
      <Layout className="main-layout">
        {isCollapsed ?
          null
          :
          <Sider
            theme="light"
            breakpoint="xl"
            className="sider-box">
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
            <Route path="/login" element={<UnloggedZone><Login /></UnloggedZone>} />
            <Route path="/register" element={<UnloggedZone><Register /></UnloggedZone>} />
            <Route path="/admin" element={<AdminZone><Admin /></AdminZone>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Sider
          theme="light"
          width={300}
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed) => {
            dispatch(setIsCollapsed(collapsed));
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