const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, "Property ID is required"],
            unique: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
            maxlength: [200, "Address cannot exceed 200 characters"],
        },
        reg_no: {
            type: String,
            required: [true, "Registration number is required"],
            unique: true,
            trim: true,
        },
        contact: {
            type: String,
            required: [true, "Contact number is required"],
            validate: {
                validator: function (v) {
                    return /^\+?\d{10,12}$/.test(v); // Validates phone numbers
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        not_pet_friendly: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        property_type: {
            type: String,
            required: [true, "Property type is required"],
            enum: ["Apartment", "Villa", "Studio", "Penthouse", "Farmhouse"],
        },
        facing: {
            type: String,
            required: [true, "Facing direction is required"],
            enum: ["North", "South", "East", "West"],
        },
        bedrooms: {
            type: Number,
            required: [true, "Number of bedrooms is required"],
            min: [1, "Bedrooms must be at least 1"],
        },
        balcony: {
            type: Number,
            required: [true, "Number of balconies is required"],
            min: [0, "Balconies cannot be negative"],
        },
        total_area: {
            type: String,
            required: [true, "Total area is required"],
            trim: true,
        },
        price_per_sq_ft: {
            type: String,
            required: [true, "Price per sq. ft. is required"],
            trim: true,
        },
        floor: {
            type: String,
            required: [true, "Floor details are required"],
            trim: true,
        },
        age: {
            type: String,
            required: [true, "Age of the property is required"],
            trim: true,
        },
        parking_available: {
            type: Boolean,
            default: true,
        },
        furnish: {
            type: String,
            required: [true, "Furnish type is required"],
            enum: ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
        },
        situation: {
            type: String,
            required: [true, "Situation is required"],
            enum: ["Ready to Move", "Under Construction"],
        },
        price: {
            type: String,
            required: [true, "Price is required"],
            trim: true,
        },
        luxury: {
            type: String,
            required: [true, "Luxury level is required"],
            enum: ["Low", "Medium", "High", "Premium"],
        },
        swimming_pool: {
            type: String,
            required: [true, "Swimming pool details are required"],
            enum: ["Yes", "No"],
        },
        playground: {
            type: String,
            required: [true, "Playground details are required"],
            enum: ["Yes", "No"],
        },
        visitors_parking: {
            type: String,
            required: [true, "Visitors parking details are required"],
            enum: ["Yes", "No"],
        },
        intercom_facility: {
            type: String,
            required: [true, "Intercom facility details are required"],
            enum: ["Yes", "No"],
        },
        power_backup: {
            type: String,
            required: [true, "Power backup details are required"],
            enum: ["Yes", "No"],
        },
        fire_safety_installed: {
            type: Boolean,
            default: true,
        },
        neighborhood_perks: {
            market: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
            public_transport: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
            mall: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
            hospital: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
            restaurant: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
            school: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
            college: {
                name: { type: String, trim: true },
                distance: { type: String, trim: true },
            },
        },
        geojson: {
            type: {
                type: String,
                enum: ["Point"],
                default : "Point",
                required: true,
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        images: {
            type: [String], // Array of image URLs
            validate: {
                validator: function (v) {
                    return v.length <= 10; // Maximum 10 images
                },
                message: "Cannot upload more than 10 images",
            },
        },
    },
    { timestamps: true }
);

// Add a 2dsphere index for geospatial queries
//propertySchema.index({ geojson: "2dsphere" });

// Create the model
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;