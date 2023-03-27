import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest } from "../interfaces/IAuthenticatedRequest";
import auth from "../middlewares/auth.middleware";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";

const router = Router();
router.use(auth);

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
   })
);

export default router;
