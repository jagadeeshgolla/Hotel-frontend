import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiDownload } from "react-icons/fi";
import "./Inventory.css";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  location: string;
}

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 1, name: "Solar Panel", quantity: 10, location: "Warehouse A" },
    { id: 2, name: "Inverter", quantity: 5, location: "Warehouse B" },
    { id: 3, name: "Battery Pack", quantity: 2, location: "Warehouse A" },
  ]);

  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, location: "" });
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const locations = ["All", "Warehouse A", "Warehouse B"];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedLocation === "All" || item.location === selectedLocation)
  );

  const handleAddItem = () => {
    if (!newItem.name || newItem.quantity <= 0 || !newItem.location) return;
    setItems([...items, { id: Date.now(), ...newItem }]);
    setNewItem({ name: "", quantity: 0, location: "" });
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const downloadReport = () => {
    const headers = "Item Name,Quantity,Location\n";
    const rows = filteredItems.map((item) => `${item.name},${item.quantity},${item.location}`).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Inventory_Report_${selectedLocation}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>
      <div className="filters">
        <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <button className="download-btn" onClick={downloadReport}><FiDownload /> Download Report</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className={item.quantity <= 3 ? "low-stock" : ""}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
              <td>
                <FiEdit onClick={() => handleEditItem(item)} />
                <FiTrash2 onClick={() => handleDeleteItem(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredItems.some((item) => item.quantity <= 3) && <div className="low-stock-alert">⚠️ Some items are low on stock!</div>}
      <div className="add-item">
        <input type="text" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
        <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} />
        <select value={newItem.location} onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}>
          <option value="">Select Location</option>
          {locations.slice(1).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <button onClick={handleAddItem}><FiPlus /> Add Item</button>
      </div>
      {editingItem && (
        <div className="edit-item">
          <h3>Edit Item</h3>
          <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
          <input type="number" value={editingItem.quantity} onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })} />
          <button onClick={handleUpdateItem}>Update Item</button>
        </div>
      )}
    </div>
  );
};

export default Inventory;
