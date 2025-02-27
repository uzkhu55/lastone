import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import Otp from "../models/optModel.js";

const otpStore = {};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS, // Use environment variable
  },
  logger: true,
  debug: true,
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable
    to, // Recipient address
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error); // Log email errors
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, images } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();

    await sendOtpEmail(email, otp);
    await Otp.create({ email, otp });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      isVerified: false,
      images,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message:
        "User created successfully! Please verify your email with the OTP.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating user:", error); // Log errors
    res.status(500).json({ success: false, message: "Failed to create user." });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const otpEntry = await Otp.findOne({ email });
    if (!otpEntry || otpEntry.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "OTP verified successfully! Account is now active.",
      user,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error); // Log errors
    res
      .status(500)
      .json({ success: false, message: "OTP verification failed." });
  }
};
