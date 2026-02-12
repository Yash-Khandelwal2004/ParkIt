const mongoose = require("mongoose");
const Booking = require("../models/Booking-model");
const Parking = require("../models/Parking-model");

const createBooking = async (req, res) => {
  try {
    const { parkingId } = req.params;   
    const { count, startTime, endTime } = req.body;

    if (!count || !startTime || !endTime) {
      return res.status(400).json({
        message: "count, startTime and endTime are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(parkingId)) {
      return res.status(400).json({ message: "Invalid parkingId format" });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      return res.status(400).json({
        message: "End time must be after start time",
      });
    }

    // 🔒 Atomic slot check
    const parking = await Parking.findOneAndUpdate(
      { _id: parkingId, availableSlots: { $gte: count } },
      { $inc: { availableSlots: -count } },
      { new: true }
    );

    if (!parking) {
      return res.status(400).json({
        message: "Not enough parking slots available",
      });
    }

    const durationHours = (end - start) / (1000 * 60 * 60);
    const priceAtBooking = durationHours * parking.fee * count;

    const booking = await Booking.create({
      user: req.userInfo.userId,
      parking: parkingId,
      count,
      startTime: start,
      endTime: end,
      priceAtBooking,
      status: "confirmed",
    });

    return res.status(201).json({
      message: "Parking booked successfully",
      booking,
      remainingSlots: parking.availableSlots,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    console.log("bookingId received →", bookingId);

    // 1️⃣ bookingId required
    if (!bookingId) {
      return res.status(400).json({
        message: "bookingId parameter is required in URL",
      });
    }

    // 2️⃣ validate Mongo ObjectId format
    if (!mongoose.Types.ObjectId.isValid(String(bookingId))) {
      return res.status(400).json({
        message: "Invalid bookingId format",
      });
    }

    // 3️⃣ auth check
    if (!req.userInfo || !req.userInfo.userId) {
      return res.status(401).json({
        message: "Unauthorized: user not authenticated",
      });
    }

    // 4️⃣ find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // 5️⃣ only owner can delete
    if (booking.user.toString() !== req.userInfo.userId) {
      return res.status(403).json({
        message: "Not authorized to delete this booking",
      });
    }

    // 6️⃣ restore parking slots BEFORE delete
    const parking = await Parking.findByIdAndUpdate(
      booking.parking,
      { $inc: { availableSlots: booking.count } },
      { new: true }
    );

    if (!parking) {
      return res.status(500).json({
        message: "Parking record missing while restoring slots",
      });
    }

    // 7️⃣ delete booking permanently
    await Booking.findByIdAndDelete(bookingId);

    // 8️⃣ success response
    return res.status(200).json({
      message: "Booking deleted successfully",
      deletedBookingId: bookingId,
      restoredSlots: booking.count,
      availableSlotsNow: parking.availableSlots,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
};
