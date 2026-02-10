const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      unique: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fee: {
      type: Number,
      required: true,
      min: 0,
    },

    // total slots in parking
    count: {
      type: Number,
      required: true,
      min: 1,
    },

    // remaining available slots (used in booking controller)
    availableSlots: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      required: true,
      enum: ["two wheeler", "four wheeler"],
      default: "four wheeler",
    },

    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parking", parkingSchema);
