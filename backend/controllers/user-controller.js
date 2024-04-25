import User from "../model/User.js";
import bcrypt from "bcryptjs";

// Controller to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find();

    // If no users found, return 404 status with message
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    // Return users with 200 status
    return res.status(200).json({ users });
  } catch (err) {
    // If error occurs, log error and return 500 status with message
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while fetching users",
    });
  }
};

// Controller to sign up a new user
export const signup = async (req, res, next) => {
  const { role, name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedpassword = bcrypt.hashSync(password, 10); // Specify the number of salt rounds

    // Create new user object
    const user = new User({
      role,
      name,
      email,
      password: hashedpassword,
    });

    // Save user to database
    await user.save();
    console.log("The user from the signup", user);
    // Return newly created user with 201 status
    return res.status(201).json({ user });
  } catch (err) {
    // If error occurs, log error and return 500 status with message
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while signing up",
    });
  }
};

// Controller to log in an existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });

    // If user not found, return 404 status with message
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const ispasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    // If password is incorrect, return 400 status with message
    if (!ispasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // If login successful, return 200 status with message and user ID
    return res
      .status(200)
      .json({ message: "Login successful", id: existingUser._id });
  } catch (err) {
    // If error occurs, log error and return 500 status with message
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while logging in",
    });
  }
};
