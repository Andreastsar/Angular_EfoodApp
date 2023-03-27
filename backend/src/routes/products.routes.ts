import { Router } from "express";
import { foods } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

// ------------------------------------------------------------

// Seed the data from dummy data to database
router.get(
   "/seed",
   asyncHandler(async (req, res) => {
      const productsCount = await FoodModel.countDocuments();

      if (productsCount > 0) {
         res.send("Seed is already completed");
         return;
      }

      await FoodModel.create(foods);
      res.send("Seed is done");
   })
);

// GET all foods
router.get(
   "/",
   asyncHandler(async (req, res) => {
      const products = await FoodModel.find();
      res.send(products);
   })
);

// GET food by id
router.get(
   "/:id",
   asyncHandler(async (req, res) => {
      const id = req.params.id;

      const filteredFood = await FoodModel.findById(id);

      res.send(filteredFood);
   })
);

//
export default router;
