import Reward from "../models/generateModel.js"; // Ensure this points to the correct model file

// Function to add a new reward
export const addReward = async (req, res) => {
  const { title, password } = req.body; // Ensure you're using 'password'

  // Validate request data
  if (!title || !password) {
    return res
      .status(400)
      .json({ message: "Title and password are required." });
  }

  try {
    const newReward = new Reward({ title, password });
    await newReward.save();
    res.status(201).json(newReward); // Respond with the created reward
  } catch (error) {
    console.error("Error adding reward:", error);
    res.status(500).json({ message: "Error adding reward", error });
  }
};

export default {
  addReward,
};
