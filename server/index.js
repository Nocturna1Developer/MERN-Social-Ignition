// Cors policy - allows resources to be loaded from another domain example --> a web page commonly loads images, style sheets, scripts, etc. from other domains
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath } from "url";

/* 
* CONFIGURATIONS - Middleware runs in between things
*    - Comes from package instruction documentation of multer
*/

// Allows us to use the modules 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config() // Allows is to use env files
const app = express(); // Invoke express app and more!
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// Sets the directory of where we keep our assets, locally, usually want S3 but its fine (our images)
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* 
* FILE STORAGE - saves file uploads from website 
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.orginalname);
    }
});
const upload = multer({ storage });

/* 
* MONGOOSE SETUP - from .env file
*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));