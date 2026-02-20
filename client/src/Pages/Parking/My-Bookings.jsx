import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");

       
        const res = await fetch("http://localhost:3000/api/booking/my-bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        setBookings(data.data || data.bookings || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    setCancellingId(bookingId);
    setError("");
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/booking/cancel-parking/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancellation failed");

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      setError(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.07, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,180,60,0.08) 35px, rgba(255,180,60,0.08) 70px)", zIndex: 0 }} />

      <Navbar />

      <div style={{ flex: 1, position: "relative", zIndex: 1, padding: "48px", maxWidth: "960px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Page header */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
            My Account
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#fff7ed", margin: "0 0 8px 0" }}>
            My <span style={{ color: "#fbbf24" }}>Bookings</span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(253,230,138,0.55)", margin: 0 }}>
            All the parking spots you have reserved.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "80px 0", color: "rgba(253,230,138,0.6)", fontSize: "16px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
            </svg>
            Loading your bookings...
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ padding: "16px 20px", borderRadius: "12px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && bookings.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🅿️</div>
            <p style={{ color: "rgba(253,230,138,0.5)", fontSize: "16px", marginBottom: "24px" }}>You haven't booked any parkings yet.</p>
            <button
              onClick={() => navigate("/all-parkings")}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#1a0a00", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(245,158,11,0.4)", fontFamily: "inherit" }}
            >
              Browse Parkings
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        )}

        {/* Bookings list */}
        {!loading && !error && bookings.length > 0 && (
          <div style={{ display: "grid", gap: "16px" }}>
            {bookings.map((booking) => (
              <div
                key={booking._id}
                style={{
                  borderRadius: "18px", padding: "28px 32px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "20px", marginTop: "2px" }}>📍</span>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff7ed", margin: 0, lineHeight: "1.4" }}>
                
                      {booking.parking?.address || "Parking Address"}
                    </h3>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: booking.status === "confirmed" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", border: `1px solid ${booking.status === "confirmed" ? "rgba(74,222,128,0.3)" : "rgba(239,68,68,0.3)"}`, color: booking.status === "confirmed" ? "#86efac" : "#fca5a5", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Confirmed"}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "20px" }} />

                {/* Details grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "14px", marginBottom: "20px" }}>
                  {[
                    { label: "Total Price", value: `₹${booking.priceAtBooking?.toFixed(2)}`, highlight: true },
                    { label: "Slots Booked", value: booking.count },
                    { label: "Start Time", value: formatDate(booking.startTime) },
                    { label: "End Time", value: formatDate(booking.endTime) },
                    { label: "Type", value: booking.parking?.type },
                    { label: "Fee per hour", value: `₹${booking.parking?.fee}` },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.45)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px" }}>{label}</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: highlight ? "#fbbf24" : "#fff7ed" }}>{value ?? "—"}</div>
                    </div>
                  ))}
                </div>

                {/* Owner info */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "16px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(217,119,6,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#fbbf24", flexShrink: 0 }}>
                    {booking.parking?.owner?.name?.charAt(0)?.toUpperCase() || "O"}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#fde68a" }}>{booking.parking?.owner?.name || "Owner"}</div>
                    <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.4)" }}>{booking.parking?.owner?.email}</div>
                  </div>
                </div>

                {/* Cancel button */}
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  disabled={cancellingId === booking._id}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "700",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                    color: cancellingId === booking._id ? "rgba(252,165,165,0.4)" : "#fca5a5",
                    cursor: cancellingId === booking._id ? "not-allowed" : "pointer",
                    transition: "all 0.2s", fontFamily: "inherit", boxSizing: "border-box",
                  }}
                  onMouseEnter={e => {
                    if (cancellingId !== booking._id) {
                      e.currentTarget.style.background = "rgba(239,68,68,0.2)";
                      e.currentTarget.style.borderColor = "rgba(239,68,68,0.55)";
                      e.currentTarget.style.color = "#f87171";
                    }
                  }}
                  onMouseLeave={e => {
                    if (cancellingId !== booking._id) {
                      e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                      e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                      e.currentTarget.style.color = "#fca5a5";
                    }
                  }}
                >
                  {cancellingId === booking._id ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
                      </svg>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Cancel Booking
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default MyBookings;