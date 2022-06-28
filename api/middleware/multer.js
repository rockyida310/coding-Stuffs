const multer = require('multer');
const DatauriParser=require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

const parser = new DatauriParser();

const dataUri = (req) => {
    const extName = path.extname(req.file.originalname).toString();
    const file64 = parser.format(extName, req.file.buffer);
    return file64;
};

module.exports = {multerUploads,dataUri};
