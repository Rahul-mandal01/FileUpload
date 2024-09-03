const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// localFileUpload -> handler function 

exports.localFileUpload = async (req, res) => {
    try{

        // fetch file from request
        const file = req.files.rahulFile;
        console.log("FILE AAGYI-> ", file);

        // create path where file need to be stored on server
        let path = __dirname  + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH -> ", path);

        // add path to the move function
        file.mv(path , (err) => {
            console.log("error: ", err);
        }) ;

        // create a successful response
        res.json({
            success: true,
            message: "Local File uploaded successfully"
        })
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Not able to upload the file on server" });
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



// image Upload -> handler function
exports.imageUpload = async (req, res) => {
    try{
            // data fetch
            const {name, tags, email} = req.body;
            console.log(name, tags, email);
            const file = req.files.imageFile;
            console.log(file);

            // validation
            const supportedTypes = ["jpg", "jpeg", "png"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("File type: ", fileType);

            if(!isFileTypeSupported(fileType, supportedTypes)){
                return res.status(400).json({
                    success:false,
                    message:"File format not supported"
                })
            }

            // File formats supported
            // Upload on cloudinary
            const response = await uploadFileToCloudinary(file, "codehelp");

            console.log(response);

            // save entry in DB

            const fileData = await File.create({
                name,
                imageUrl: response.secure_url,
                tags,
                email
            })

            res.json({
                success:true,
                message:"Image uploaded successfully",
                imageUrl:response.secure_url
            })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Failed to upload image"
        });
    }
}


// video upload -> handler function

exports.videoUpload = async (req, res) => {
    try{
        
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type: ", fileType);

        //  TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        
            // File formats supported
            // Upload on cloudinary
            const response = await uploadFileToCloudinary(file, "codehelp");

            console.log(response);

            // save entry in DB

            const fileData = await File.create({
                name,
                imageUrl: response.secure_url,
                tags,
                email
            });

            res.json({
                success:true,
                message:"video uploaded successfully",
                videoUrl:response.secure_url
            })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message:"Failed to upload video"
        });
    }
}


// imageSizeReducer -> Handler function

exports.imageSizeReducer = async (req, res) => {
    try{
            // data fetch
            const {name, tags, email} = req.body;
            console.log(name, tags, email);
            const file = req.files.imageFile;
            console.log(file);

            // validation
            const supportedTypes = ["jpg", "jpeg", "png"];
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("File type: ", fileType);

            if(!isFileTypeSupported(fileType, supportedTypes)){
                return res.status(400).json({
                    success:false,
                    message:"File format not supported"
                })
            }

            // File formats supported
            // Upload on cloudinary
            const response = await uploadFileToCloudinary(file, "codehelp", 20);

            console.log(response);

            // save entry in DB

            const fileData = await File.create({
                name,
                imageUrl: response.secure_url,
                tags,
                email
            })

            res.json({
                success:true,
                message:"Image uploaded successfully",
                imageUrl:response.secure_url
            })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message:"Failed to reduce image size"
        });
    }
}