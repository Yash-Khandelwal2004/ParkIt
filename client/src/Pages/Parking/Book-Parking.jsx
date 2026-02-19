import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const BookParking = () => {
  const { parkingId } = useParams();
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
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      setMessage("Parking booked successfully!");
      setTimeout(() => navigate("/my-bookings"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #5c2a00 70%, #7a3800 100%)",
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Texture */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.07, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,180,60,0.08) 35px, rgba(255,180,60,0.08) 70px)", zIndex: 0 }} />

      <Navbar />

      {/* Page content */}
      <div
        style={{
          flex: 1, position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: "480px",
            borderRadius: "24px", padding: "44px 40px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", color: "rgba(253,230,138,0.5)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: "20px", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(253,230,138,0.5)"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Parkings
            </button>

            {/* Icon */}
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#fbbf24" strokeWidth="2" />
                <circle cx="12" cy="9" r="2.5" stroke="#fbbf24" strokeWidth="2" />
              </svg>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#fff7ed", margin: "0 0 6px 0" }}>
              Book Parking
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(253,230,138,0.5)", margin: 0, lineHeight: "1.5" }}>
              Fill in the details below to reserve your spot.
            </p>
          </div>

          {/* Success message */}
          {message && (
            <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#86efac", fontSize: "13px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {message}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Number of slots */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(253,230,138,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Number of Slots
              </label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff7ed", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            {/* Start time */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(253,230,138,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff7ed", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", colorScheme: "dark" }}
                onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            {/* End time */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(253,230,138,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff7ed", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", colorScheme: "dark" }}
                onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "4px 0" }} />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: "700",
                background: loading ? "rgba(217,119,6,0.5)" : "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#1a0a00", border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 4px 20px rgba(245,158,11,0.4)",
                transition: "all 0.25s", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(245,158,11,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 20px rgba(245,158,11,0.4)"; }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Confirm Booking
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: invert(0.7); cursor: pointer; }
        input::placeholder { color: rgba(253,230,138,0.25); }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  );
};

export default BookParking;