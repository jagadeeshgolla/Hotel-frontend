import { useState } from "react";
import "./reports.css";

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Sample locations
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"];

  // Sample inventory data
  const inventoryData = [
    { item: "Laptops", data: { "New York": 120, "Los Angeles": 95, "Chicago": 110, "Houston": 80, "San Francisco": 130 } },
    { item: "Monitors", data: { "New York": 100, "Los Angeles": 85, "Chicago": 90, "Houston": 75, "San Francisco": 105 } },
    { item: "Keyboards", data: { "New York": 200, "Los Angeles": 150, "Chicago": 180, "Houston": 140, "San Francisco": 190 } },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  // Function to convert inventory data to CSV format
  const convertToCSV = (data: any[], columns: string[]) => {
    const header = ["Inventory", ...columns].join(",");
    const rows = data.map(row => [row.item, ...columns.map(col => row.data[col] || "0")].join(","));
    return [header, ...rows].join("\n");
  };

  // Function to download CSV file
  const downloadCSV = (csvData: string, fileName: string) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download full inventory report
  const handleDownloadAllReports = () => {
    const csvData = convertToCSV(inventoryData, locations);
    downloadCSV(csvData, "Full_Inventory_Report.csv");
  };

  // Download location-specific report
  const handleDownloadLocationReport = () => {
    if (!selectedLocation) {
      alert("Please select a location.");
      return;
    }
    const filteredData = inventoryData.map(row => ({
      item: row.item,
      data: { [selectedLocation]: row.data[selectedLocation] }
    }));
    const csvData = convertToCSV(filteredData, [selectedLocation]);
    downloadCSV(csvData, `Report_${selectedLocation}.csv`);
  };

  return (
    <div className="reports-container">
      <h2>Reports</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search reports..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Filter by Location */}
      <select value={selectedLocation} onChange={handleLocationChange} className="location-filter">
        <option value="">Filter by Location</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>

      {/* Download Buttons */}
      <div className="download-buttons">
        <button className="download-btn all-reports" onClick={handleDownloadAllReports}>
          Download Entire Report
        </button>
        <button className="download-btn location-report" onClick={handleDownloadLocationReport}>
          Download {selectedLocation ? selectedLocation : "Location"} Report
        </button>
      </div>

      {/* Inventory Report Table */}
      <table className="reports-table">
        <thead>
          <tr>
            <th>Inventory</th>
            {locations.map((location, index) => (
              <th key={index}>{location}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inventoryData
            .filter(row => row.item.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                {locations.map((location, locIndex) => (
                  <td key={locIndex}>{row.data[location]}</td>
                ))}
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
