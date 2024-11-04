import User from "../models/userModel.js";

export const addPoints = async (req, res) => {
  const { points, username } = req.body; // Extract points and username from the request body

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username }, // Query by username
      { $inc: { points: points } }, // Increment points
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.status(200).json({
        message: "Points added successfully!",
        points: updatedUser.points,
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error adding points:", error);
    res.status(500).json({ message: "Failed to add points." });
  }
};
