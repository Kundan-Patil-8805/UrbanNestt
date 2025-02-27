const Property = require("../models/Property");
const fs = require("fs");
const multer = require("multer");

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fetch all property listings
module.exports.listings = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error });
    }
};

// Add a new property
module.exports.add = async (req, res) => {
    try {
        const {
            id, title, address, reg_no, contact, not_pet_friendly, description,
            property_type, facing, bedrooms, balcony, total_area, price_per_sq_ft,
            floor, age, parking_available, furnish, situation, price, luxury,
            swimming_pool, playground, visitors_parking, intercom_facility, power_backup,
            fire_safety_installed, neighborhood_perks, geojson, images
        } = req.body;

        // Create a new property document
        const newProperty = new Property({
            id,
            title,
            address,
            reg_no,
            contact,
            not_pet_friendly,
            description,
            property_type,
            facing,
            bedrooms,
            balcony,
            total_area,
            price_per_sq_ft,
            floor,
            age,
            parking_available,
            furnish,
            situation,
            price,
            luxury,
            swimming_pool,
            playground,
            visitors_parking,
            intercom_facility,
            power_backup,
            fire_safety_installed,
            neighborhood_perks,
            geojson,
            images
        });

        // Save the property to the database
        const savedProperty = await newProperty.save();
        res.status(201).json({
            message: 'Property created successfully',
            property: savedProperty
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating property', error });
    }
};

// Edit an existing property
module.exports.edit = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const updatedData = req.body;

        const updatedProperty = await Property.findOneAndUpdate(
            { id: propertyId },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({
            message: 'Property updated successfully',
            property: updatedProperty
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error });
    }
};

// Show a specific property by ID
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

// Export all functions
module.exports = {
    listings: module.exports.listings,
    add: module.exports.add,
    edit: module.exports.edit,
    show: module.exports.show
};