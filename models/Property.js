const mongoose = require("mongoose");
const User = require("./user.js")
const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
       
        trim: true
    },
    images: {
        type: String, 
        default : "https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    facilities: {
        type: [String], 
        required: false
    },
    bedroomNum: {
        type: Number,
        required: true,
        min: 0
    },
    balconyNum: {
        type: Number,
        required: true,
        min: 0
    },
    furnish: {
        type: String,
        required: true,
        enum: ["Furnished", "Semi-Furnished", "Unfurnished"] 
    },
    petFriendly: {
        type: Boolean,
        required: true,
        default : true,
    },
    // publisher: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // Name of the User model
    //     required: true
    // }
    
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
