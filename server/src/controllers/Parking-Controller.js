const Parking = require("../models/Parking-model");

const registerParking = async (req, res) => {
  try {
    const { address, owner, fee, count,type } = req.body;

    const checkforExistingParking = await Parking.findOne({
      $or: [{ address }],
    });
    if (checkforExistingParking) {
      return res.status(400).json({
        success: false,
        message: "Parking address already exists",
      });
    }

    const newlyCreatedParking = new Parking({
      owner: owner,
      address: address,
      count: count,
      fee: fee,
      type:type,
    });

    await newlyCreatedParking.save();

    if (newlyCreatedParking) {
      res.status(201).json({
        success: true,
        message: "Parking registered successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register! please try again.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured please try again",
    });
  }
};

const deleteParking = async (req, res) => {
  try {
    const getCurrentParkingId = req.params.id;
    const deleteParking = await Parking.findByIdAndDelete(getCurrentParkingId);

    if (!deleteParking) {
      res.status(404).json({
        success: false,
        message: "Parking is not found with this id",
      });
    }
    res.status(200).json({
      success: true,
      data: deleteParking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};


const getAllParkings = async (req, res) => {
  try {
    const allParkings = await Parking.find({});
    if (allParkings?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of Parkings fetched successfully",
        data: allParkings,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Parkings found in collection",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const getSingleParkingById = async (req, res) => {
  try {
    const getCurrentParkingID = req.params.id;
    const ParkingDetailsByID = await Parking.findById(getCurrentParkingID);

    if (!ParkingDetailsByID) {
      return res.status(404).json({
        success: false,
        message:
          "Parking with the current ID is not found! Please try with a different ID",
      });
    }

    res.status(200).json({
      success: true,
      data: ParkingDetailsByID,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};


module.exports={
  registerParking,
  deleteParking,
  getAllParkings,
  getSingleParkingById
};