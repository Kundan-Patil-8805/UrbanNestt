const bcrypt = require('bcrypt');
const ModelUser = require("../models/user");

// Signup route
module.exports.signup = async (req, res) => {
    try {
        const { name, email, password, number, address } = req.body;

        // Validate request body
        if (!name || !email || !password || !number || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email already exists
        const existingUser = await ModelUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const User = new ModelUser({
            name,
            email,
            password: hashedPassword, // Store hashed password
            number,
            address,
        });

        const newUser = await User.save();

        if (newUser) {
            res.status(201).json({
                success: true,
                message: "Signup successful 🎉",
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to create user",
            });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error 😞",
        });
    }
};

// Login route
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user in the database
        const loginUser = await ModelUser.findOne({ email });

        if (!loginUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, loginUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("Logged in successfully:", loginUser.email);
        res.status(200).json({
            success: true,
            message: "Login successful 🎉",
            user: { email: loginUser.email },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error 😞",
        });
    }
};
