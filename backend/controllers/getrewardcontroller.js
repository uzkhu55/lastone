// In your rewardcontroller.js
import Reward from "../models/generateModel.js"; // Adjust the import as needed

// Function to get all rewards
export const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({});
    res.status(200).json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    res.status(500).json({ message: "Error fetching rewards", error });
  }
};
