import { useState } from "react";
import "./settings.css";

const Settings = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    privacy: true, // Privacy setting toggle
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePrivacyToggle = () => {
    setUser({ ...user, privacy: !user.privacy });
  };

  const handleSaveChanges = () => {
    alert("Settings saved successfully!");
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      <div className="settings-form">
        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
        </div>

        {/* Privacy Toggle */}
        <div className="form-group">
          <label>Privacy</label>
          <div className="toggle-switch">
            <input type="checkbox" checked={user.privacy} onChange={handlePrivacyToggle} />
            <span className="slider"></span>
          </div>
        </div>

        {/* Save Button */}
        <button className="settings-save-btn" onClick={handleSaveChanges}>Save Changes</button>

        {/* Logout Button (Scoped to Settings) */}
        <button className="settings-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;
