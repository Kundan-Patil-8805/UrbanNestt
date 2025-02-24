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
