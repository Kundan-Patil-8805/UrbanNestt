const Property = require("../models/Property");

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
            return res
                .status(400)
                .json({ message: "All required fields must be provided." });
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

        // Save property to the database
        const savedProperty = await newProperty.save();

        res.status(201).json({
            message: "Property added successfully!",
            property: savedProperty,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while adding the property.",
            error: error.message,
        });
    }
};





