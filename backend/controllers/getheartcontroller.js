import User from "../models/userModel.js";

export const getHeartCount = async (req, res) => {
  try {
    const { username } = req.query; // Get username from query parameters
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ heartCount: user.heartSlot }); // Return heart count
  } catch (error) {
    console.error("Error fetching heart count:", error);
    res.status(500).json({ message: "Failed to fetch heart count" });
  }
};
