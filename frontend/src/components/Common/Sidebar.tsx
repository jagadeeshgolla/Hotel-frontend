import { FiHome, FiMapPin, FiBox, FiBarChart2, FiSettings } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css"; // Import the CSS file

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <nav className="sidebar-menu">
        <ul>
          <SidebarItem to="/dashboard/home" icon={<FiHome />} label="Home" collapsed={isCollapsed} active={location.pathname === "/dashboard/home"} />
          <SidebarItem to="/dashboard/locations" icon={<FiMapPin />} label="Locations" collapsed={isCollapsed} active={location.pathname === "/dashboard/locations"} />
          <SidebarItem to="/dashboard/inventory" icon={<FiBox />} label="Inventory" collapsed={isCollapsed} active={location.pathname === "/dashboard/inventory"} />
          <SidebarItem to="/dashboard/reports" icon={<FiBarChart2 />} label="Reports" collapsed={isCollapsed} active={location.pathname === "/dashboard/reports"} />
          <SidebarItem to="/dashboard/settings" icon={<FiSettings />} label="Settings" collapsed={isCollapsed} active={location.pathname === "/dashboard/settings"} />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, collapsed, active }: { to: string; icon: JSX.Element; label: string; collapsed: boolean; active: boolean }) => {
  return (
    <li className={`sidebar-item ${active ? "active" : ""}`}>
      <Link to={to} className="sidebar-link">
        <span className="icon">{icon}</span>
        {!collapsed && <span className="label">{label}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
