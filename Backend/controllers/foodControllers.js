import foodmodel from "../models/FoodModel.js";
import fs from "fs";

// Add food items
const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Image file is required" });
    }

    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
        return res.json({ success: false, message: "All fields are required" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error occurred while adding food" });
    }
};

// Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food items" });
    }
};

// Remove food item
const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Use fs.promises.unlink for better error handling
        await fs.promises.unlink(`uploads/${food.image}`);

        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removefood };
