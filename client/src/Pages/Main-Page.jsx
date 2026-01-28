import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  MapPin,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function MainPage() {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      className={`
        fixed inset-0 w-full h-full flex flex-col overflow-y-auto overflow-x-hidden
        transition-colors duration-700
        ${isDark ? "bg-[#020617] text-slate-200" : "bg-[#f4efe8] text-[#3b2f2f]"}
      `}
    >
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-600/15 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-sky-500/10 rounded-full blur-[140px]" />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-amber-400/20 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-orange-300/20 rounded-full blur-[140px]" />
          </>
        )}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 md:px-16 py-8">
        <div className="flex items-center gap-3">
          <div
            className={`
              p-2 rounded-xl
              ${isDark ? "bg-blue-600" : "bg-amber-700"}
            `}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">
            PARKIT
          </span>
        </div>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`
            p-3 rounded-2xl border backdrop-blur-md transition-all
            ${isDark
              ? "bg-white/5 border-white/10 hover:border-blue-500"
              : "bg-black/5 border-black/10 hover:border-amber-600"}
          `}
        >
          {isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-blue-700" />
          )}
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 py-12">
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-1.5 rounded-full border
            text-[10px] font-bold uppercase tracking-[0.25em] mb-8
            ${isDark
              ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
              : "bg-amber-600/10 border-amber-600/20 text-amber-700"}
          `}
        >
          <ShieldCheck size={14} />
          Verified Parking Spaces
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8">
          Find your spot <br />
          <span
            className={`
              text-transparent bg-clip-text
              ${isDark
                ? "bg-gradient-to-r from-blue-400 via-blue-600 to-sky-400"
                : "bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600"}
            `}
          >
            before you arrive.
          </span>
        </h1>

        <p
          className={`
            max-w-2xl text-lg md:text-xl mb-12
            ${isDark ? "text-slate-400" : "text-[#6b4e3d]"}
          `}
        >
          The smartest way to park in the city. Save up to 40% on parking rates
          and skip the stress of the search.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-5">
          <button
            onClick={() => navigate("/city")}
            className={`
              group flex items-center justify-center gap-3 px-10 py-5 rounded-2xl
              font-bold text-lg text-white transition-all
              ${isDark
                ? "bg-blue-600 hover:bg-blue-700 shadow-[0_20px_50px_rgba(37,99,235,0.45)]"
                : "bg-amber-700 hover:bg-amber-800 shadow-[0_20px_50px_rgba(161,98,7,0.45)]"}
            `}
          >
            <Search size={22} />
            Find Parking
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button
            className={`
              flex items-center justify-center gap-2 px-10 py-5 rounded-2xl
              font-bold text-lg border transition-all
              ${isDark
                ? "border-white/10 text-slate-300 hover:bg-white/5"
                : "border-black/10 text-[#4a3728] hover:bg-black/5"}
            `}
          >
            <Clock size={20} />
            View Schedule
          </button>
        </div>

        {/* Stats */}
        <div
          className={`
            mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 w-full max-w-5xl
            border-t
            ${isDark ? "border-white/10" : "border-black/10"}
          `}
        >
          {[
            ["1.2M+", "Stops Made"],
            ["15min", "Time Saved"],
            ["24/7", "Support"],
          ].map(([value, label], i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 ${
                i === 1
                  ? isDark
                    ? "border-x border-white/5 px-4"
                    : "border-x border-black/5 px-4"
                  : ""
              }`}
            >
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-[11px] uppercase tracking-[0.3em] opacity-60 font-bold text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-10 text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 text-center">
        © 2026 PARKIT · URBAN MOBILITY SOLUTIONS
      </footer>
    </div>
  );
}
