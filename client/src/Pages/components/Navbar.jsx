import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAuth } from "../auth/AuthContext";

const dropdownItems = [
  {
    label: "Book Parking",
    route: "/all-parkings",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Rent Out Parking",
    route: "/rent-parking",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="10" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M7 10V7a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "My Parkings",
    route: "/my-parkings",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "My Bookings",
    route: "/my-bookings",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Recalculate dropdown position whenever it opens
  useEffect(() => {
    if (dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 10,
        right: window.innerWidth - rect.right,
      });
    }
  }, [dropdownOpen]);

  // Close on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        // check if click is inside the portal dropdown
        const portalEl = document.getElementById("navbar-dropdown-portal");
        if (portalEl && portalEl.contains(e.target)) return;
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Close on scroll
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleNavItem = (route) => {
    setDropdownOpen(false);
    navigate(route);
  };

  return (
    <>
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 48px",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,180,60,0.2)",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        >
          <div
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 10px rgba(245,158,11,0.4)", flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: "22px", fontWeight: "bold", color: "#fbbf24", letterSpacing: "0.04em" }}>
            ParkIt
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <button
              ref={buttonRef}
              onClick={() => setDropdownOpen((o) => !o)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "7px 14px 7px 7px", borderRadius: "40px",
                background: dropdownOpen ? "rgba(251,191,36,0.18)" : "rgba(255,255,255,0.08)",
                border: "1px solid rgba(251,191,36,0.3)",
                cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: "700", color: "#1a0a00", flexShrink: 0,
                }}
              >
                {getInitials(user.name)}
              </div>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#fde68a" }}>
                {user.name?.split(" ")[0] || "Profile"}
              </span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                style={{ color: "#fde68a", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signin")}
                style={{
                  padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                  background: "rgba(255,255,255,0.08)", color: "#fde68a",
                  border: "1px solid rgba(251,191,36,0.3)", cursor: "pointer",
                  transition: "all 0.2s", fontFamily: "inherit",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                style={{
                  padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                  background: "linear-gradient(135deg, #d97706, #b45309)", color: "#fff",
                  border: "none", cursor: "pointer", boxShadow: "0 2px 14px rgba(217,119,6,0.4)",
                  transition: "all 0.2s", fontFamily: "inherit",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #f59e0b, #d97706)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #d97706, #b45309)"; }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── DROPDOWN PORTAL — renders at document.body level, never overlapped ── */}
      {dropdownOpen && user && createPortal(
        <div
          id="navbar-dropdown-portal"
          style={{
            position: "absolute",
            top: dropdownPos.top,
            right: dropdownPos.right,
            minWidth: "220px",
            borderRadius: "16px",
            background: "rgba(20, 8, 0, 0.97)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(251,191,36,0.25)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
            overflow: "hidden",
            zIndex: 99999,
          }}
        >
          {/* User info */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff7ed" }}>{user.name || "User"}</div>
            <div style={{ fontSize: "11px", color: "rgba(253,230,138,0.4)", marginTop: "2px" }}>{user.email || ""}</div>
          </div>

          {/* Menu items */}
          <div style={{ padding: "8px" }}>
            {dropdownItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavItem(item.route)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "10px",
                  background: "transparent", border: "none",
                  color: "rgba(253,230,138,0.75)", fontSize: "13px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.15s",
                  textAlign: "left", fontFamily: "'Georgia', serif", boxSizing: "border-box",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.1)"; e.currentTarget.style.color = "#fbbf24"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(253,230,138,0.75)"; }}
              >
                <span style={{ opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Sign out */}
          <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "10px",
                background: "transparent", border: "none",
                color: "rgba(252,165,165,0.75)", fontSize: "13px", fontWeight: "600",
                cursor: "pointer", transition: "all 0.15s",
                textAlign: "left", fontFamily: "'Georgia', serif", boxSizing: "border-box",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#fca5a5"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(252,165,165,0.75)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}