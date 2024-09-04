const mongoose = require('mongoose');
let transporter = require("../config/nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
})

// post middleware
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc);

        // send mail

        let info = await transporter.sendMail({
            from: '"CodeHelp- by Rahul" mrrahul574@gmail.com ', // sender address
            to: doc.email, // list of receivers
            subject: "New File Uploaded on Cloudinary", // Subject line
            text: `A new file named ${doc.name} has been uploaded to our platform. You can access it here: ${doc.imageUrl}`, // plain text body
        })
        console.log("INFO: ", info);
    }catch(error){
        console.error("Error saving file", error);
        throw error;
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;