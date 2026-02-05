const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body();

    const checkExistingUser = await User.findOne({
      $or: [{ email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists either with same email. Please try with a different email",
      });
    }

    const gensalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      name: username,
      email: email,
      password: hashedPassword,
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user! please try again.",
      });
    }
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exist",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
    const accessToken = jwt.sign(
      {
        userId: userExists._id,
        username: userExists.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      },
    );
    res.status(200).json({
      success: true,
      message: "Logged in successful",
      accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};


module.exports={registerUser,loginUser};