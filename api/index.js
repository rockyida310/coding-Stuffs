const connection = require('./db/connection');
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const { urlencoded, json } = require("body-parser");
const { uploader, cloudinaryConfig } = require("./config/cloudinaryConfig");
const { resolve } = require("path");
const { multerUploads, dataUri } = require("./middleware/multer");

const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.static(resolve(__dirname, "src/public")));
app.use(json({limit:'50mb'})); 
app.use(urlencoded({extended:true, limit:'50mb'}));
app.use(express.json());
app.use("*", cloudinaryConfig);


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.post("/api/upload", multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    
    uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",
          data: {
            image,
          },
        });
      })
      .catch((err) => 
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  }
});


const start = async ()=> {
  try{
      await connection(process.env.MONGO_URI);
      app.listen(port, ()=> console.log(`App is runnning on ${port}...`));
  }catch(err){
    console.log(err);
  }
}

start();

