import User from "../models/userModel.js"; // Adjust the path as necessary

export const heartDecrController = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (user.heartSlot === 0) {
    res.status(200).send(" Remaining heart is 0 ");
    return;
  }

  await User.findOneAndUpdate(
    { username },
    {
      $inc: {
        heartSlot: -1,
      },
    }
  );
  res.send("Success");
};
