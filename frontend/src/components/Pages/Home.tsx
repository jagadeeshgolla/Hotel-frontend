import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import styles

const Home = () => {
  const navigate = useNavigate();
  const [locationCount, setLocationCount] = useState(10); // Example count, fetch dynamically in real use

  return (
    <div className="home-container">
      {/* Locations Card */}
      <div className="locations-card">
        <h2>Total Locations</h2>
        <p className="count">{locationCount}</p>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="buttons">
          <button onClick={() => navigate("/dashboard/locations")}>Locations</button>
          <button onClick={() => navigate("/dashboard/inventory")}>Inventory</button>
          <button onClick={() => navigate("/dashboard/reports")}>Reports</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
