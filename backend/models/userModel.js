import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    points: { type: Number, default: 0 },
    username: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true }, // Assuming you're hashing passwords
    heartSlot: { type: Number, default: 0 }, // Track heart slots
    isAdmin: { type: Boolean, default: false, required: true }, // Track email verification status
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
