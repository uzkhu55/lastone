import User from "../models/userModel.js"; // Adjust the path as necessary

export const getUserByUsername = async (req, res) => {
  const { username } = req.params; // Get the username from the request parameters

  try {
    const user = await User.findOne({ username }); // Find user by username
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send user data as response
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
