const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// Helper function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Generate tokens using the model methods
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, number, address } = req.body;

        if ([name, email, password, number, address].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        // Handle avatar upload
        const avatarLocalPath = req.files?.avatar?.[0]?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar || !avatar.url) {
            return res.status(400).json({ message: "Failed to upload avatar" });
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password,
            number,
            avatar: avatar.url,
            address,
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(201).json({ message: "User registered successfully", user: createdUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = { httpOnly: true, secure: true };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "User logged in successfully", user: loggedInUser, accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Logout a user
const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

        const options = { httpOnly: true, secure: true };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Refresh access token
const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized: Refresh token is missing" });
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);

        if (!user || incomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = { httpOnly: true, secure: true };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "Access token refreshed successfully", accessToken, refreshToken });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

// Change user password
const changeUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!(await user.isPasswordCorrect(oldPassword))) {
            return res.status(401).json({ message: "Invalid old password" });
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");

        return res.status(200).json({ message: "Current user fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    getCurrentUser,
};
