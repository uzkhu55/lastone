import User from "../models/userModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "uzkhuthef@gmail.com", // Your Gmail address
    pass: "isks vchs wpzp vtxk",
  },
});

const sendEmail = async (username) => {
  const mailOptions = {
    from: "uzkhuthef@gmail.com",
    to: "uzkhuthef@gmail.com",
    subject: "Heart Slot Added",
    text: `User ${username} wanted to heart slot.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export const addHeartSlot = async (req, res) => {
  try {
    const { username } = req.body; // Retrieve username from request body

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOneAndUpdate(
      { username },
      { $inc: { heartSlot: 1 } },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Call sendEmail with the username
    await sendEmail(username); // Send email with the username

    res.status(200).json({
      message: "Heart slot added successfully",
      user: {
        username: user.username,
        heartSlot: user.heartSlot,
      },
    });
  } catch (error) {
    console.error("Error adding heart slot:", error);
    res
      .status(500)
      .json({ message: "Failed to add heart slot", error: error.message });
  }
};
