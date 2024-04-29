import User from "../model/User.js";
import HealthProfile from "../model/HealthProfile.js";
export const getHealthProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("healthProfiles");
    if (!user) {
      return res.status(404).json({ message: "No Health Profile Found" });
    }
    return res.status(200).json({ profileData: user.healthProfiles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching Health Profile" });
  }
};

export const createHealthProfile = async (req, res) => {
  const {
    user,
    bloodGroup,
    age,
    pancreatic,
    sugarType,
    diabetic,
    phoneNumber,
    address,
    city,
    pincode,
  } = req.body;

  console.log(req.body);

  try {
    // Check if the user exists
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new health profile
    const profileData = await HealthProfile.create({
      user: user,
      bloodGroup,
      age,
      pancreatic,
      sugarType,
      diabetic,
      phoneNumber,
      address,
      city,
      pincode,
    });

    // Update the user document to include the health profile reference
    existingUser.healthProfiles = profileData._id;
    await existingUser.save();

    return res.status(200).json({ savedProfile: profileData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding Health Profile" });
  }
};
