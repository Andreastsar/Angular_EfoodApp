import mongoose, { Schema, Types } from "mongoose";
import { OrderStatusEnum } from "../order.enum";
import { Food, FoodSchema } from "./food.model";

// Order Item (Cart item) model
export interface OrderItem {
   food: Food;
   price: number;
   quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
   food: { type: FoodSchema, required: true },
   price: { type: Number, required: true },
   quantity: { type: Number, required: true },
});

// -----------------------------------------

// Order model
export interface Order {
   items: OrderItem[];
   totalPrice: number;
   name: string;
   address: string;
   paymentID: string;
   createdAt: string;
   status: OrderStatusEnum;

   userId: Types.ObjectId;
   updatedAt: Date;
}

export const OrderSchema = new Schema<Order>(
   {
      items: { type: [OrderItemSchema], required: true },
      totalPrice: { type: Number, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      paymentID: { type: String },
      status: { type: String, default: OrderStatusEnum.NEW },
      userId: { type: Schema.Types.ObjectId, required: true },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
      toObject: {
         virtuals: true,
      },
   }
);

export const OrderModel = mongoose.model("order", OrderSchema);
