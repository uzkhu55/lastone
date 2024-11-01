import User from "../models/userModel.js";

export const adminHeartSlot = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOneAndUpdate(
      { username },
      { $inc: { heartSlot: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Heart slot added successfully",
      user: {
        username: user.username,
        heartSlot: user.heartSlot,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add heart slot", error: error.message });
  }
};
