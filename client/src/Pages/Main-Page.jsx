import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-amber-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          ParkIt
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/parkings")}
            className="bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            View Parkings
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="bg-amber-700 px-4 py-2 rounded-lg font-semibold hover:bg-amber-800"
          >
            My Bookings
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find & Book Parking Easily
          </h2>

          <p className="text-gray-600 mb-6">
            ParkIt helps you quickly discover available parking spaces in your
            city and reserve them in seconds. No more searching for parking —
            just book and park.
          </p>

          <button
            onClick={() => navigate("all-parkings")}
            className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 shadow"
          >
            Explore Parkings
          </button>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Quick Actions
          </h3>

          <p className="text-gray-600 mb-6">
            Manage your bookings or browse available parking spots near you.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("all-parkings")}
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Browse All Parkings
            </button>

            <button
              onClick={() => navigate("/my-bookings")}
              className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
