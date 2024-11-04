import Reward from "../models/generateModel.js"; // Make sure this points to the correct model file
// Import the Reward model

export const getSelectedRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.status(200).json({ message: "Rewards fetched successfully", rewards });
  } catch (error) {
    console.error("Error fetching rewards:", error);
    res.status(500).json({ message: "Error fetching rewards", error });
  }
};
