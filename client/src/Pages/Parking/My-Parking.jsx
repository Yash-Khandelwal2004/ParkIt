import React, { useEffect, useState } from "react";

const MyOwnedParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyParkings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/parking/my-owned",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setParkings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyParkings();
  }, []);

  // loading state
  if (loading) return <h2>Loading parkings...</h2>;

  // error state
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Owned Parkings</h1>

      {parkings.length === 0 ? (
        <p>No parkings registered yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {parkings.map((parking) => (
            <div
              key={parking._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
              }}
            >
              <h3>{parking.address}</h3>
              <p>Fee: ₹{parking.fee}</p>
              <p>Total Slots: {parking.count}</p>
              <p>Available Slots: {parking.availableSlots}</p>
              <p>Type: {parking.type}</p>

              {parking.renter ? (
                <p>
                  Booked by: {parking.renter.name} ({parking.renter.email})
                </p>
              ) : (
                <p style={{ color: "green" }}>No booking yet</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOwnedParkings;
