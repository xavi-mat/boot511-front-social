import { useState } from "react"
import { Drawer } from 'antd';
import LeftSider from "../LeftSider/LeftSider";

const DrawerMenu = () => {

  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => {
    setVisible(!visible);
  }

  return (<>
    <div className="drawer-button">
      <img
        src="/logo.png"
        alt="Tuitah"
        className="avatar"
        onClick={toggleDrawer}
      />
    </div>
    <Drawer placement="left" onClose={toggleDrawer} visible={visible}>
      <LeftSider toggleDrawer={toggleDrawer} />
    </Drawer>
  </>
  )
}

export default DrawerMenu