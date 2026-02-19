import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  // Filter by city
  useEffect(() => {
    const filtered = parkings.filter((p) =>
      p.address.toLowerCase().includes(searchCity.toLowerCase())
    );
    setFilteredParkings(filtered);
  }, [searchCity, parkings]);

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

      {/* Page Content */}
      <div style={{ flex: 1, position: "relative", zIndex: 1, padding: "48px", maxWidth: "1200px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
            Browse Spots
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#fff7ed", margin: "0 0 8px 0" }}>
            Available <span style={{ color: "#fbbf24" }}>Parkings</span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(253,230,138,0.55)", margin: 0 }}>
            Find and book the perfect parking spot in your city.
          </p>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(253,230,138,0.4)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by city or address..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff7ed", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
            onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "80px 0", color: "rgba(253,230,138,0.6)", fontSize: "16px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
            </svg>
            Loading parkings...
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
        {!loading && !error && filteredParkings.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🅿️</div>
            <p style={{ color: "rgba(253,230,138,0.5)", fontSize: "16px" }}>No parkings found for that location.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filteredParkings.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {filteredParkings.map((parking) => (
              <div
                key={parking._id}
                style={{ borderRadius: "18px", padding: "24px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", gap: "10px", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "18px", marginTop: "1px" }}>📍</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff7ed", margin: 0, lineHeight: "1.4" }}>{parking.address}</h3>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "4px 0" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "rgba(253,230,138,0.5)" }}>Fee per hour</span>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "#fbbf24" }}>₹{parking.fee}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "rgba(253,230,138,0.5)" }}>Available Slots</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: parking.availableSlots > 0 ? "#86efac" : "#fca5a5" }}>
                      {parking.availableSlots > 0 ? `${parking.availableSlots} open` : "Full"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "rgba(253,230,138,0.5)" }}>Type</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#fde68a", padding: "2px 10px", borderRadius: "999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>{parking.type}</span>
                  </div>
                </div>

                <p style={{ fontSize: "12px", color: "rgba(253,230,138,0.35)", margin: 0 }}>Owner: {parking.owner?.name}</p>

                <button
                  onClick={() => navigate(`/book/${parking._id}`)}
                  disabled={parking.availableSlots === 0}
                  style={{ marginTop: "6px", width: "100%", padding: "12px", border: "none", borderRadius: "10px", background: parking.availableSlots === 0 ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #f59e0b, #d97706)", color: parking.availableSlots === 0 ? "rgba(253,230,138,0.3)" : "#1a0a00", fontWeight: "700", fontSize: "14px", cursor: parking.availableSlots === 0 ? "not-allowed" : "pointer", boxShadow: parking.availableSlots === 0 ? "none" : "0 4px 14px rgba(245,158,11,0.35)", transition: "all 0.2s", fontFamily: "inherit" }}
                  onMouseEnter={e => { if (parking.availableSlots > 0) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(245,158,11,0.5)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = parking.availableSlots === 0 ? "none" : "0 4px 14px rgba(245,158,11,0.35)"; }}
                >
                  {parking.availableSlots === 0 ? "Fully Booked" : "Book Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(253,230,138,0.25); }
      `}</style>
    </div>
  );
};

export default AllParkings;