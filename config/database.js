const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(
        console.log("MongoDB connected successfully")
    ).catch( (error) => {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    });
};
