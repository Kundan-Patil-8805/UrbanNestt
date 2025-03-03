const Property = require("../models/Property");
const fs = require("fs");
const multer = require("multer");

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fetch all property listings
const listings = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
};

// Add a new property
const add = async (req, res) => {
    try {
        const {
            PROPERTY_TYPE,
            SOCIETY_NAME,
            CITY,
            location,
            BEDROOM_NUM,
            BALCONY_NUM,
            AREA,
            Price_per_sqft,
            PRICE,
            AGE,
            FURNISH,
            amenity_luxury,
            FLOOR_NUM,
            LATITUDE,
            LONGITUDE,
            TOTAL_FLOOR,
            DESCRIPTION,
            Facing_Direction,
            Image,
            Loan_Availability,
            Estimated_Monthly_EMI,
            Maintenance_Fees,
            Property_Tax,
            Stamp_Duty_Registration_Costs,
            Nearest_Schools,
            Nearest_Colleges,
            Nearest_Hospitals,
            Nearest_Markets,
            Nearest_Public_Transport,
            Nearest_Restaurants,
            Nearest_Railway_Stations,
            Nearest_Malls,
            Swimming_Pool,
            Playground,
            RERA_Registration_Number,
            
            Visitor_Parking,
            Intercom_Facility,
            Power_Backup,
            Water_Supply,
            Pet_Friendly,
            Fire_Safety_Installed
        } = req.body;

        // Create a new property document
        const newProperty = new Property({
            PROPERTY_TYPE,
            SOCIETY_NAME,
            CITY,
            location,
            BEDROOM_NUM,
            BALCONY_NUM,
            AREA,
            Price_per_sqft,
            PRICE,
            AGE,
            FURNISH,
            amenity_luxury,
            FLOOR_NUM,
            LATITUDE,
            LONGITUDE,
            TOTAL_FLOOR,
            DESCRIPTION,
            Facing_Direction,
            Image,
            Loan_Availability,
            Estimated_Monthly_EMI,
            Maintenance_Fees,
            Property_Tax,
            Stamp_Duty_Registration_Costs,
            Nearest_Schools,
            Nearest_Colleges,
            Nearest_Hospitals,
            Nearest_Markets,
            Nearest_Public_Transport,
            Nearest_Restaurants,
            Nearest_Railway_Stations,
            Nearest_Malls,
            Swimming_Pool,
            Playground,
            RERA_Registration_Number,
            
            Visitor_Parking,
            Intercom_Facility,
            Power_Backup,
            Water_Supply,
            Pet_Friendly,
            Fire_Safety_Installed
        });

        // Save the property to the database
        const savedProperty = await newProperty.save();
        res.status(201).json({
            message: 'Property created successfully',
            property: savedProperty
        });
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: 'Error creating property', error: error.message });
    }
};

// Edit an existing property
const edit = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const updatedData = req.body;

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
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
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }
};

// Show a specific property by ID
const show = async (req, res) => {
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
        console.error('Error fetching property:', error);
        return res.status(500).json({
            message: "An error occurred while fetching the property.",
            error: error.message,
        });
    }
};

// Export all functions
module.exports = {
    listings,
    add,
    edit,
    show
};