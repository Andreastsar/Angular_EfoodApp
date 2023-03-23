export interface Food {
   id: string;
   name: string;
   price: number;
   favorite: boolean;
   imageUrl: string;
   origins: string[];
   cookTime: string;
}

import mongoose, { Schema } from "mongoose";

export const FoodSchema = new Schema<Food>(
   {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      favorite: { type: Boolean, required: true },
      imageUrl: { type: String, required: true },
      origins: { type: [String], required: true },
      cookTime: { type: String, required: true },
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      timestamps: true,
   }
);

export const FoodModel = mongoose.model<Food>("food", FoodSchema);
