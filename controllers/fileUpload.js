const File = require("../models/file");

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
        res.status(500).json({ message: "Server error" });
    }
}