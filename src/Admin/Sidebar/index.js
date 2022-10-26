import {LogoutOutlined ,ContainerOutlined, DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import * as actionCreators from '../Login/store/actionCreators'
import {useDispatch} from "react-redux"
  
  
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


  const Sidebar = () => {
    const dispatch= useDispatch()
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };


    const items = [
    
      getItem(<Link to="/admin-panel">Manage Product</Link>, '1',<Link to="/admin-panel"><DesktopOutlined /></Link> ),
      getItem(<Link to="/admin-order">Manage Delivery</Link>, '2',<Link to="/admin-order"><ContainerOutlined /></Link> ),
      getItem(<div onClick={()=>{dispatch(actionCreators.setLogout())}}>Logout</div>, '3',<div onClick={()=>{dispatch(actionCreators.setLogout())}}><LogoutOutlined /></div> ),
  
    ];

    return (
     <div style={{position: 'absolute',top:"0",left:"0"}}>
      
       <div
        style={{
          width: 256,
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
     </div>
    );
  };
  export default Sidebar;