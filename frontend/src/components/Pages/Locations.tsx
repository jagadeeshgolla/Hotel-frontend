import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "./locations.css"; // Import CSS for styling

const Locations = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "New York Office" },
    { id: 2, name: "Los Angeles Branch" },
    { id: 3, name: "Chicago HQ" },
  ]);
  const [search, setSearch] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // Add new location
  const handleAddLocation = () => {
    if (newLocation.trim() === "") return;
    setLocations([...locations, { id: Date.now(), name: newLocation }]);
    setNewLocation("");
  };

  // Delete location
  const handleDelete = (id: number) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  // Start editing a location
  const handleEdit = (id: number, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  // Save edited location
  const handleSaveEdit = () => {
    setLocations(locations.map((loc) => (loc.id === editId ? { ...loc, name: editName } : loc)));
    setEditId(null);
    setEditName("");
  };

  return (
    <div className="locations-container">
      <div className="locations-header">
        <input
          type="text"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="locations-add">
        <input
          type="text"
          placeholder="New Location Name"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="add-input"
        />
        <button onClick={handleAddLocation} className="add-btn">
          <FiPlus /> Add
        </button>
      </div>

      <table className="locations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Location Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations
            .filter((loc) => loc.name.toLowerCase().includes(search.toLowerCase()))
            .map((location, index) => (
              <tr key={location.id}>
                <td>{index + 1}</td>
                <td>
                  {editId === location.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    location.name
                  )}
                </td>
                <td>
                  {editId === location.id ? (
                    <button onClick={handleSaveEdit} className="save-btn">Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(location.id, location.name)} className="edit-btn">
                        <FiEdit />
                      </button>
                      <button onClick={() => handleDelete(location.id)} className="delete-btn">
                        <FiTrash2 />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Locations;
