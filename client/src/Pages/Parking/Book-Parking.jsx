import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookParking = () => {
  const { parkingId } = useParams(); // 👈 from URL
  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/booking/book-parking/${parkingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            count: Number(count),
            startTime,
            endTime,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      setMessage("✅ Parking booked successfully!");

      // optional redirect after success
      setTimeout(() => navigate("/my-bookings"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Book Parking</h2>

      <form onSubmit={handleBooking} style={{ display: "grid", gap: 12 }}>
        <label>Number of Slots</label>
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />

        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>

      {message && <p style={{ color: "green", marginTop: 15 }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
    </div>
  );
};

export default BookParking;
