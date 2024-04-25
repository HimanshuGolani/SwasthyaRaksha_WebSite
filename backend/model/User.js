import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  healthProfiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthProfile",
    },
  ],
  prescriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
  ],
  labReports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabReport",
    },
  ],
  role: {
    type: String,
    enum: ["Doctor", "Normal-User"],
    default: "Normal-User",
    required: true,
  },
  doctorInfo: {
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});

export default mongoose.model("User", userSchema);
