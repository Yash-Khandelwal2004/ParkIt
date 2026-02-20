import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Navbar from "./components/Navbar";

export default function MainPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
      {/* Texture overlay */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.07, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,180,60,0.08) 35px, rgba(255,180,60,0.08) 70px)", zIndex: 0 }} />

      <Navbar />

      {/* Main Content */}
      <div
        style={{
          flex: 1, position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "60px 48px",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: "1100px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "64px", alignItems: "center",
          }}
        >
          {/* Left Section */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
              Instant Booking
            </div>

            <h2 style={{ fontSize: "52px", fontWeight: "800", color: "#fff7ed", lineHeight: "1.15", margin: "0 0 20px 0" }}>
              Find & Book <span style={{ color: "#fbbf24" }}>Parking</span> Effortlessly
            </h2>

            <p style={{ fontSize: "17px", color: "rgba(253,230,138,0.65)", lineHeight: "1.7", margin: "0 0 36px 0", maxWidth: "420px" }}>
              ParkIt helps you quickly discover available parking spaces in your city and reserve them in seconds. No more circling the block — just book and park.
            </p>

            <button
              onClick={() => user ? navigate("/all-parkings") : navigate("/signin")}
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#1a0a00", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(245,158,11,0.4)", transition: "all 0.25s", letterSpacing: "0.02em", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(245,158,11,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(245,158,11,0.4)"; }}
            >
              Explore Parkings
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            {/* Stats */}
            {/* <div style={{ display: "flex", gap: "40px", marginTop: "48px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[["500+", "Spots"], ["2min", "Avg. Booking"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#fbbf24" }}>{val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right Section — Card */}
          <div style={{ borderRadius: "24px", padding: "40px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fbbf24" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fbbf24" opacity="0.6" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fbbf24" opacity="0.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#fbbf24" />
              </svg>
            </div>

            <h3 style={{ fontSize: "26px", fontWeight: "700", color: "#fff7ed", margin: "0 0 10px 0" }}>Quick Actions</h3>
            <p style={{ fontSize: "14px", color: "rgba(253,230,138,0.5)", lineHeight: "1.65", margin: "0 0 28px 0" }}>
              Manage your bookings or browse available parking spots near you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => user ? navigate("/all-parkings") : navigate("/signin")}
                style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(96,165,250,0.25)", color: "#93c5fd", cursor: "pointer", transition: "all 0.2s", textAlign: "left", fontFamily: "inherit", boxSizing: "border-box" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.22)"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.25)"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  Browse All Parkings
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              <button
                onClick={() => user ? navigate("/my-bookings") : navigate("/signin")}
                style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(74,222,128,0.25)", color: "#86efac", cursor: "pointer", transition: "all 0.2s", textAlign: "left", fontFamily: "inherit", boxSizing: "border-box" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.22)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.12)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.25)"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  View My Bookings
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>

            <div style={{ margin: "28px 0 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(253,230,138,0.3)", letterSpacing: "0.04em" }}>
             Your city. Your spot. Your time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}