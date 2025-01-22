import User from "../models/userModel.js";

export const getLeaderboard = async (req, res) => {
  try {
    // Fetch users sorted by points in descending order
    const users = await User.find({})
      .sort({ points: -1 }) // Assuming you have a 'points' field in your User model
      .limit(10); // Limit to top 10 users

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      points: user.points,
      rewards: user.rewards, // Modify according to your model structure
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
