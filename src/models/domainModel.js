import mongoose from "mongoose";

const DomainSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  customDomain: { type: String, required: true, unique: true },
  status: { type: String, enum: ["pending", "verified"], default: "pending" },
});

export default mongoose.models.Domain || mongoose.model("Domain", DomainSchema);
