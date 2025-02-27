const mongoose = require("mongoose");
const User = require("./user.js")

const propertySchema = mongoose.Schema({
    id: Number,
    title: String,
    address: String,
    reg_no: String,
    contact: String,
    not_pet_friendly: Boolean,
    description: String,
    property_type: String,
    facing: String,
    bedrooms: Number,
    balcony: Number,
    total_area: String,
    price_per_sq_ft: String,
    floor: String,
    age: String,
    parking_available: Boolean,
    furnish: String,
    situation: String,
    price: String,
    luxury: String,
    swimming_pool: String,
    playground: String,
    visitors_parking: String,
    intercom_facility: String,
    power_backup: String,
    fire_safety_installed: Boolean,
    neighborhood_perks: {
        market: {
            name: String,
            distance: String
        },
        public_transport: {
            name: String,
            distance: String
        },
        mall: {
            name: String,
            distance: String
        },
        hospital: {
            name: String,
            distance: String
        },
        restaurant: {
            name: String,
            distance: String
        },
        school: {
            name: String,
            distance: String
        },
        college: {
            name: String,
            distance: String
        }
    },
    geojson: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    images: [String] // Array of image URLs
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
