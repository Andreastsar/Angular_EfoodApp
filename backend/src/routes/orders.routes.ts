import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest } from "../interfaces/IAuthenticatedRequest";
import auth from "../middlewares/auth.middleware";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { OrderStatusEnum } from "../order.enum";

const router = Router();
router.use(auth);

// New order
router.post(
   "/newOrder",
   asyncHandler(async (req: AuthenticatedRequest, res) => {
      const requestOrder = req.body;
      const currentUser = req.user;

      // If the incoming order is empty
      if (requestOrder.items.length <= 0) {
         console.log("Cart is empty");
         res.status(400).send("Cart item is empty!");
         return;
      }

      const user = await UserModel.findById(currentUser.id);
      const order = new OrderModel({ ...requestOrder, userId: currentUser.id });
      await order.save();

      user?.orders.push(order.id);
      await user?.save();

      res.status(200).send(order);
   })
);

// get order for current user (used for payment page)
router.get(
   "/getCurrentOrderForUser",
   asyncHandler(async (req: AuthenticatedRequest, res) => {
      const currentUser = req.user;

      const order = await OrderModel.findOne({
         userId: currentUser.id,
         status: OrderStatusEnum.NEW,
      });

      // check for order existence
      if (order) {
         res.send(order);
      } else {
         res.status(400).send();
      }
   })
);

export default router;
