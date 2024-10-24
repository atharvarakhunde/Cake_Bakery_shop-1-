import express from "express";
import { addFood, listFood, removefood } from "../controllers/foodControllers.js"; // Correct spelling
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`);
    }
});

const upload = multer({storage: storage});

// Define the POST route with the upload middleware
foodRouter.post("/add", upload.single("image"),addFood);

foodRouter.get("/list",listFood)
foodRouter.post("/remove",removefood)

export default foodRouter;
