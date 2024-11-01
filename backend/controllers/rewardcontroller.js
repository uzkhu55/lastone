// controllers/rewardcontroller.js
import Reward from "../models/generateModel.js"; // Make sure this points to the correct model file

export const addReward = async (req, res) => {
  const { name, availability } = req.body;

  try {
    const newReward = new Reward({ name, availability });
    await newReward.save();
    res.status(201).json(newReward);
  } catch (error) {
    console.error("Error adding reward:", error);
    res.status(500).json({ message: "Error adding reward", error });
  }
};

// New function to seed default rewards
export const seedDefaultRewards = async (req, res) => {
  const defaultRewards = [
    {
      title: "Computer (1 Available) Invite 3 Members To Unlock",
      code: "CODE1",
    },
    { title: "iPhone 13 Pro Max (2 Available)", code: "CODE2" },
    { title: "30,000₮ (111 Available)", code: "CODE3" },
    { title: "30,000$ (1 Available)", code: "CODE4" },
    { title: "Car (1 Available)", code: "CODE5" },
    { title: "3 Room Apartment (1 Available)", code: "CODE6" },
    { title: "Gremix Special", code: "CODE7" },
    { title: "Cami's Special", code: "CODE8" },
    { title: "Car (2 Available)", code: "CODE9" },
    { title: "Samsung 24 Ultra (1 Available)", code: "CODE10" },
    { title: "Mobicom Gifts (10,000 Available)", code: "CODE11" },
  ];

  try {
    // Clear existing rewards (optional)
    await Reward.deleteMany({});

    // Insert default rewards
    const createdRewards = await Reward.insertMany(defaultRewards);
    res
      .status(201)
      .json({
        message: "Default rewards added successfully",
        rewards: createdRewards,
      });
  } catch (error) {
    console.error("Error seeding default rewards:", error);
    res.status(500).json({ message: "Error seeding default rewards", error });
  }
};
