const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password, picture, address } = req.body;

    // Check if all required fields are provided
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered with this phone number." });
    }

    // Create a new user
    const newUser = new User({ name, phone, email, password, picture, address });
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required." });
    }

    // Find the user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get User Profile
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    // Handle invalid ObjectId or other database errors
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { registerUser, loginUser, getUser };
