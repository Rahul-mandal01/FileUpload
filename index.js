// App create 

const express = require('express');
const app = express();

// Find Port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// add middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect with DB
 const db = require("./config/database");
 db.connect();

//  connect with cloud
cloudinary  = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Mount api route
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// activate server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // server is running on port 3000
})