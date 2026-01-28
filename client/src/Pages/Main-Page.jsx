import { useEffect, useState } from "react";
import { Moon, Sun, MapPin, Search, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function MainPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    /* h-screen + w-full + flex flex-col ensures it fills the viewport exactly */
    <div className={`
      relative min-h-screen w-full flex flex-col transition-colors duration-1000 ease-in-out
      ${theme === "dark" ? "bg-[#020617] text-slate-100" : "bg-[#f8fafc] text-slate-900"}
    `}>
      
      {/* Background Orbs - Adjusted to be absolutely positioned relative to the screen */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      {/* Header - Using px-6 to px-16 for responsive padding */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-16 py-8">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">ParkEase</span>
        </div>

        <button
          onClick={toggleTheme}
          className="group p-3 rounded-2xl bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all duration-300"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-yellow-400 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon size={20} className="text-blue-600 transition-transform group-hover:-rotate-12" />
          )}
        </button>
      </header>

      {/* Hero Section - flex-grow ensures this section takes up all remaining space */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-6 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6 transition-all duration-700">
          <ShieldCheck size={14} />
          Verified Parking Spaces
        </div>

        <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
          Find your spot <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-emerald-500">
            before you arrive.
          </span>
        </h2>

        <p className="max-w-2xl text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">
          The smartest way to park in the city. Save up to 40% on parking rates and skip the stress of the search.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="group flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1">
            <Search size={22} />
            Find Parking
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className={`
            flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all 
            ${theme === 'dark' 
              ? 'border-slate-800 text-slate-300 hover:bg-slate-800/50' 
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
          `}>
            <Clock size={20} />
            View Schedule
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 dark:border-slate-800 pt-12 w-full max-w-4xl">
            <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold tracking-tight">1.2M+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Stops Made</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-slate-200 dark:border-slate-800">
                <span className="text-2xl font-bold tracking-tight">15min</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Time Saved</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold tracking-tight">24/7</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Support</span>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 w-full text-center text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
        © 2026 PARKEASE · Built for the modern driver
      </footer>
    </div>
  );
}