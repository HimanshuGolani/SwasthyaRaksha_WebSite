// healthProfile.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HealthProfileSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  pancreatic: {
    type: Boolean,
    default: false,
  },
  sugarType: {
    type: String,
    enum: ["high-bp", "low-bp"],
    default: "Not entered",
  },
  diabetic: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    minlength: 10,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
    minlength: 6,
  },
});

export default mongoose.model("HealthProfile", HealthProfileSchema);
