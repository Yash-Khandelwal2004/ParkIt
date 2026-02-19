import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const RentParking = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [count, setCount] = useState("");
  const [type, setType] = useState("four wheeler");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const rentingData = { address, fee, count, type };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/parking/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rentingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Success:", data);
      setSuccess(true);

      setAddress("");
      setFee("");
      setCount("");
      setType("four wheeler");

      setTimeout(() => navigate("/my-parkings"), 1500);
    } catch (error) {
      console.log("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff7ed",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: "700",
    color: "rgba(253,230,138,0.6)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "8px",
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

      <div
        style={{
          flex: 1, position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: "500px",
            borderRadius: "24px", padding: "44px 40px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            {/* Icon */}
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="10" width="18" height="11" rx="2" stroke="#fbbf24" strokeWidth="2" />
                <path d="M7 10V7a5 5 0 0110 0v3" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#fff7ed", margin: "0 0 6px 0" }}>
              List Your Parking
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(253,230,138,0.5)", margin: 0, lineHeight: "1.5" }}>
              Rent out your parking space and start earning with ParkIt.
            </p>
          </div>

          {/* Success */}
          {success && (
            <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#86efac", fontSize: "13px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Parking listed successfully! Redirecting...
            </div>
          )}

          {/* Error */}
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
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Address */}
            <div>
              <label style={labelStyle}>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 12, MG Road, Bangalore"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>

            {/* Fee + Count side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Fee per Hour (₹)</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  placeholder="e.g. 50"
                  required
                  min="1"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
              <div>
                <label style={labelStyle}>Number of Slots</label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="e.g. 5"
                  required
                  min="1"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
            </div>

            {/* Type — styled select */}
            <div>
              <label style={labelStyle}>Parking Type</label>
              <div style={{ position: "relative" }}>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    WebkitAppearance: "none",
                    paddingRight: "40px",
                    cursor: "pointer",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                >
                  <option value="two wheeler" style={{ background: "#2a0f00", color: "#fff7ed" }}>Two Wheeler</option>
                  <option value="four wheeler" style={{ background: "#2a0f00", color: "#fff7ed" }}>Four Wheeler</option>
                </select>
                {/* Chevron icon */}
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(253,230,138,0.4)", pointerEvents: "none" }}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "2px 0" }} />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              style={{
                width: "100%", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: "700",
                background: (loading || success) ? "rgba(217,119,6,0.5)" : "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#1a0a00", border: "none",
                cursor: (loading || success) ? "not-allowed" : "pointer",
                boxShadow: (loading || success) ? "none" : "0 4px 20px rgba(245,158,11,0.4)",
                transition: "all 0.25s", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
              onMouseEnter={e => { if (!loading && !success) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(245,158,11,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = (loading || success) ? "none" : "0 4px 20px rgba(245,158,11,0.4)"; }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  Listing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  List Parking Spot
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div style={{ margin: "24px 0 0", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px" }}>
            <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(253,230,138,0.4)", margin: 0 }}>
              Want to see your listings?{" "}
              <span
                onClick={() => navigate("/my-parkings")}
                style={{ color: "#fbbf24", fontWeight: "700", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                View My Parkings
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(253,230,138,0.25); }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  );
};

export default RentParking;