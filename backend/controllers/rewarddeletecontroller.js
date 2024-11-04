// In your rewardcontroller.js
import Reward from "../models/generateModel.js"; // Ensure the path is correct

// Function to delete a reward by ID
export const deleteReward = async (req, res) => {
  const { id } = req.params; // Get the reward ID from the request parameters

  try {
    const reward = await Reward.findByIdAndDelete(id);
    if (!reward) {
      return res.status(404).json({ message: "Reward not found." });
    }
    res.status(200).json({ message: "Reward deleted successfully." });
  } catch (error) {
    console.error("Error deleting reward:", error);
    res.status(500).json({ message: "Error deleting reward", error });
  }
};
