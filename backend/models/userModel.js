import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true }, // Assuming you're hashing passwords
    heartSlot: { type: Number, default: 0 }, // Track heart slots
    isVerified: { type: Boolean, default: false }, // Track email verification status
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
