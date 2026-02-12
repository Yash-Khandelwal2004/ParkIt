const mongoose = require("mongoose");
const Parking = require("../models/Parking-model");

const registerParking = async (req, res) => {
  try {
    const { address, fee, count, type } = req.body;

    // 1️⃣ Basic validation
    if (!address || !fee || !count || !type) {
      return res.status(400).json({
        success: false,
        message: "address, fee, count and type are required",
      });
    }

    if (fee < 0 || count <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fee or slot count",
      });
    }

    // 2️⃣ Check existing parking by address
    const existingParking = await Parking.findOne({ address });
    if (existingParking) {
      return res.status(400).json({
        success: false,
        message: "Parking address already exists",
      });
    }

    // 3️⃣ Create parking
    const newlyCreatedParking = await Parking.create({
      owner: req.userInfo.userId,     // from auth middleware
      renter: req.userInfo.userId,    // linked user
      address,
      fee,
      count,
      availableSlots: count,          // IMPORTANT for booking logic
      type,
    });

    return res.status(201).json({
      success: true,
      message: "Parking registered successfully!",
      data: newlyCreatedParking,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
    });
  }
};


const deleteParking = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parking ID",
      });
    }

    const deletedParking = await Parking.findByIdAndDelete(id);

    if (!deletedParking) {
      return res.status(404).json({
        success: false,
        message: "Parking not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedParking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};


const getAllParkings = async (req, res) => {
  try {
    const allParkings = await Parking.find({}).populate("owner renter", "name email");

    return res.status(200).json({
      success: true,
      message: "List of parkings fetched successfully",
      data: allParkings,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};


const getSingleParkingById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parking ID",
      });
    }

    const parkingDetails = await Parking.findById(id).populate("owner renter", "name email");

    if (!parkingDetails) {
      return res.status(404).json({
        success: false,
        message: "Parking not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      data: parkingDetails,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const getMyOwnedParkings = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const myParkings = await Parking.find({ owner: userId })
      .populate("owner renter", "name email");

    return res.status(200).json({
      success: true,
      message: "User's owned parkings fetched successfully",
      count: myParkings.length,
      data: myParkings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};


const getMyBookedParkings = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const bookedParkings = await Parking.find({ renter: userId })
      .populate("owner renter", "name email");

    return res.status(200).json({
      success: true,
      message: "User's booked parkings fetched successfully",
      count: bookedParkings.length,
      data: bookedParkings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};


module.exports = {
  registerParking,
  deleteParking,
  getAllParkings,
  getSingleParkingById,
  getMyOwnedParkings,
  getMyBookedParkings,
};
