import {ProSidebar, Menu,MenuItem,SubMenu, SidebarHeader, SidebarContent, SidebarFooter} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import "./SideBar.css";
import React from 'react';

const SideBarMenu = () => {
    const [active, setActive] = React.useState('home');

    const headerStyle = {
        padding: "24px",
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: "1px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap"
      };

    return (
        <div class="full-height position-fixed">
            <ProSidebar>
              <SidebarHeader style={headerStyle}>Gramophone</SidebarHeader>
              <SidebarContent>
                <Menu iconShape="circle">
                  <MenuItem>
                    Profile
                    <Link to="/profile" />
                  </MenuItem>
                  <MenuItem>
                    News
                    <Link to="/newsFeed" />
                  </MenuItem>
                  <MenuItem>
                    Users
                    <Link to="/users" />
                  </MenuItem>
                </Menu>
              </SidebarContent>
              <SidebarFooter style={{ textAlign: "center" }}>
                <div className="sidebar-btn-wrapper">
                    <Menu iconShape="circle">
                      <MenuItem>
                        Log out
                        <Link to="/" />
                      </MenuItem>
                    </Menu>
                </div>
              </SidebarFooter>
            </ProSidebar>
        </div>
    );
}

export default SideBarMenu;