import User from "../model/User.js";
import HealthProfile from "../model/HealthProfile.js";

export const createHealthProfile = async (req, res) => {
  try {
    const {
      user,
      name,
      age,
      gender,
      phoneNumber,
      email,
      heartDisease,
      hypertension,
      allergies,
      diabetes,
    } = req.body;

    console.log(req.body);

    // Create a new health profile
    const healthProfile = new HealthProfile({
      name,
      age,
      gender,
      phoneNumber,
      email,
      heartDisease,
      hypertension,
      allergies,
      diabetes,
      user,
    });

    // Save the health profile
    await healthProfile.save();
    console.log(healthProfile);
    // Update the user document with the health profile
    const updatedUser = await User.findByIdAndUpdate(
      user,
      { $set: { healthProfile: healthProfile } },
      { new: true }
    ).populate("healthProfile");

    console.log(updatedUser);

    res.status(201).json({
      success: true,
      message: "Health profile created successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error creating health profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getHealthProfile = async (req, res) => {
  try {
    console.log(req.params.id);
    // Find the user by ID and populate the healthProfile field
    const user = await User.findById(req.params.id);

    if (!user || !user.healthProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Health profile not found" });
    }

    res.status(200).json({ success: true, healthProfile: user.healthProfile });
  } catch (error) {
    console.error("Error getting health profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
