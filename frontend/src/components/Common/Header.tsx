import { FiMenu, FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import "./header.css"; // Import the CSS file

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const location = useLocation();

  // Dynamic Page Titles
  const pageTitles: { [key: string]: string } = {
    "/dashboard/home": "Home",
    "/dashboard/locations": "Locations",
    "/dashboard/inventory": "Inventory",
    "/dashboard/reports": "Reports",
    "/dashboard/settings": "Settings",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="header">
      {/* Left: Hamburger Menu */}
      <button className="menu-btn" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>

      {/* Center: Dynamic Page Title */}
      <h1 className="page-title">{currentTitle}</h1>

      {/* Right: Logout Button */}
      <button className="logout-btn" onClick={() => alert("Logged out!")}>
        <FiLogOut size={24} />
      </button>
    </header>
  );
};

export default Header;
