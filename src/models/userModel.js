
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  verifyOtp: String,
  verifyOtpExpiry: Number,
  resendVerifyOtpExpiry: Number,
  isVerified: Boolean,
});

const User = mongoose.model.User || mongoose.model("User", UserSchema);

export default User;
