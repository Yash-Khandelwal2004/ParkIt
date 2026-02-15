import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:3000/api/parking/my-booked",
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

        setBookings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  // Loading state
  if (loading) return <h2 style={{ textAlign: "center" }}>Loading bookings...</h2>;

  // Error state
  if (error)
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>
        {error}
      </h2>
    );

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "10px" }}>
      <h1 style={{ textAlign: "center" }}>My Booked Parkings</h1>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings found.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {bookings.map((parking) => (
            <div
              key={parking._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{parking.address}</h3>

              <p><strong>Fee per hour:</strong> ₹{parking.fee}</p>
              <p><strong>Total Slots:</strong> {parking.count}</p>
              <p><strong>Available Slots:</strong> {parking.availableSlots}</p>
              <p><strong>Type:</strong> {parking.type}</p>

              <hr />

              <p>
                <strong>Owner:</strong>{" "}
                {parking.owner?.name} ({parking.owner?.email})
              </p>

              <p style={{ color: "green", fontWeight: "bold" }}>
                ✅ You have booked this parking
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
