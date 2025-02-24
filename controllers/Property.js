const Property = require("../models/Property");

// Fetch all property listings
module.exports.listings = async (req, res) => {
    try {
        // Fetch all properties from the database
        const allListings = await Property.find({});
        
        // Send the response
        return res.status(200).json({
            message: "Listings fetched successfully!",
            data: allListings,
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: "Error while fetching listings.",
            error: error.message,
        });
    }
};

// Add a new property
module.exports.add = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            address,
            city,
            country,
            userEmail,
            images,
            facilities,
            bedroomNum,
            balconyNum,
            furnish,
            petFriendly,
        } = req.body;

        // Check if all required fields are provided
        if (
            !title ||
            !description ||
            !price ||
            !address ||
            !city ||
            !country ||
            !userEmail ||
            !bedroomNum ||
            !balconyNum ||
            !furnish ||
            petFriendly === undefined
        ) {
            return res.status(400).json({
                message: "All required fields must be provided.",
            });
        }

        // Create a new Property instance
        const newProperty = new Property({
            title,
            description,
            price,
            address,
            city,
            country,
            userEmail,
            images,
            facilities,
            bedroomNum,
            balconyNum,
            furnish,
            petFriendly,
        });

        // Save the property to the database
        const savedProperty = await newProperty.save();

        // Send success response
        return res.status(201).json({
            message: "Property added successfully!",
            property: savedProperty,
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: "An error occurred while adding the property.",
            error: error.message,
        });
    }
};

module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params; 
        const updates = req.body; 

        // Validate property ID
        if (!id) {
            return res.status(400).json({ message: "Property ID is required." });
        }

        // Find the property by ID and update it
        const updatedProperty = await Property.findByIdAndUpdate(
            id,         // ID of the property to update
            updates,    // Updated fields
            { new: true, runValidators: true } // Options: return updated document, validate updates
        );

        // If the property is not found
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found." });
        }

        // Send success response
        return res.status(200).json({
            message: "Property updated successfully!",
            property: updatedProperty,
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: "An error occurred while updating the property.",
            error: error.message,
        });
    }
};

module.exports.show = async (req, res) => {


    try {
        const { id } = req.params; // Get the ID from the URL params

        // Find the property by ID
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        // Return the property data
        return res.status(200).json({
            message: "Property fetched successfully!",
            property,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching the property.",
            error: error.message,
        });
    }
};