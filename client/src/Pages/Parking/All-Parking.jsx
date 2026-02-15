import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [filteredParkings, setFilteredParkings] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch all parkings
  useEffect(() => {
    const fetchParkings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/parking/allparkings");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setParkings(data.data);
        setFilteredParkings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParkings();
  }, []);

  // Filter by city inside address
  useEffect(() => {
    const filtered = parkings.filter((p) =>
      p.address.toLowerCase().includes(searchCity.toLowerCase())
    );
    setFilteredParkings(filtered);
  }, [searchCity, parkings]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading parkings...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "10px" }}>
      <h1 style={{ textAlign: "center" }}>Available Parkings</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by city in address..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "15px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {filteredParkings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No parkings found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredParkings.map((parking) => (
            <div
              key={parking._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
              {/* ADDRESS — clearly visible */}
              <h3 style={{ marginBottom: "8px", color: "#222" }}>
                📍 {parking.address}
              </h3>

              <p><strong>Fee per hour:</strong> ₹{parking.fee}</p>
              <p><strong>Available Slots:</strong> {parking.availableSlots}</p>
              <p><strong>Parking Type:</strong> {parking.type}</p>

              {/* Owner info (optional but useful) */}
              <p style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>
                Owner: {parking.owner?.name}
              </p>

              <button
                onClick={() => navigate(`/book/${parking._id}`)}
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#007bff",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllParkings;
