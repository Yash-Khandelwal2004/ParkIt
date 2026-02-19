import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MyOwnedParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyParkings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/parking/my-owned", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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

      <div style={{ flex: 1, position: "relative", zIndex: 1, padding: "48px", maxWidth: "960px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Page header */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
            My Listings
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#fff7ed", margin: "0 0 8px 0" }}>
            My <span style={{ color: "#fbbf24" }}>Owned Parkings</span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(253,230,138,0.55)", margin: 0 }}>
            Parking spots you've listed for rent on ParkIt.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "80px 0", color: "rgba(253,230,138,0.6)", fontSize: "16px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
            </svg>
            Loading your parkings...
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ padding: "16px 20px", borderRadius: "12px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && parkings.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🏗️</div>
            <p style={{ color: "rgba(253,230,138,0.5)", fontSize: "16px", marginBottom: "24px" }}>
              You haven't listed any parking spots yet.
            </p>
            <button
              onClick={() => navigate("/rent-parking")}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#1a0a00", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(245,158,11,0.4)", fontFamily: "inherit" }}
            >
              List a Parking Spot
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        )}

        {/* Parking list */}
        {!loading && !error && parkings.length > 0 && (
          <div style={{ display: "grid", gap: "16px" }}>
            {parkings.map((parking) => (
              <div
                key={parking._id}
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
                {/* Top row: address + status badge */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "20px", marginTop: "2px" }}>📍</span>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff7ed", margin: 0, lineHeight: "1.4" }}>
                      {parking.address}
                    </h3>
                  </div>

                  {/* Availability badge */}
                  {parking.renter ? (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                      Currently Rented
                    </div>
                  ) : (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#86efac", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                      Available
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "20px" }} />

                {/* Stat cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginBottom: "20px" }}>
                  {[
                    { label: "Fee per hour", value: `₹${parking.fee}`, highlight: true },
                    { label: "Total Slots", value: parking.count },
                    { label: "Available Slots", value: parking.availableSlots, color: parking.availableSlots > 0 ? "#86efac" : "#fca5a5" },
                    { label: "Type", value: parking.type },
                  ].map(({ label, value, highlight, color }) => (
                    <div key={label} style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.45)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px" }}>{label}</div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: color || (highlight ? "#fbbf24" : "#fff7ed") }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Renter info or no-booking message */}
                {parking.renter ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(217,119,6,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#fbbf24", flexShrink: 0 }}>
                      {parking.renter?.name?.charAt(0)?.toUpperCase() || "R"}
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>Booked by</div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#fde68a" }}>{parking.renter.name}</div>
                      <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.4)" }}>{parking.renter.email}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderRadius: "10px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "rgba(134,239,172,0.7)", fontSize: "13px", fontWeight: "600" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    No booking yet — your spot is open
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default MyOwnedParkings;