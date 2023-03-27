import { Router } from "express";
import { users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const router = Router();
// ---------------------------------------------------------

// Generate JWT
const generateTokenResponse = (user: User) => {
   const jsonToken = jwt.sign(
      {
         id: user.id,
         email: user.email,
         isAdmin: user.isAdmin,
      },
      "Some Env Variable / private Key",
      {
         expiresIn: "2d",
      }
   );

   return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: jsonToken,
   };
};

// ---------------------------------------------------------

// Seed the data from dummy data to database
router.get(
   "/seed",
   asyncHandler(async (req, res, next) => {
      const userCount = await UserModel.countDocuments();

      if (userCount > 0) {
         res.send("Seed is already completed");
         return;
      }

      await UserModel.create(users);
      res.send("Seed is done");
   })
);

// User Login
router.post(
   "/login",
   asyncHandler(async (req, res, next) => {
      const { email, password } = req.body;

      // find the user from db
      const user = await UserModel.findOne({ email, password });

      // check if user exists --> response --> send user + JWT
      if (user) {
         res.send(generateTokenResponse(user));
      } else {
         res.status(400).send("Username or Password is not valid");
      }
   })
);

// User Register
router.post(
   "/register",
   asyncHandler(async (req, res, next) => {
      const { name, email, password, address } = req.body;

      // Check for existing user with the same email
      const user = await UserModel.findOne({ email });
      if (user) {
         res.status(400).send("This email already exists!");
         return;
      }

      // Create a new user with encrypted password
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser: User = {
         id: "",
         name,
         email: email.toLowerCase(),
         password: encryptedPassword,
         address,
         isAdmin: false,
      };

      // Add new user to the DB
      const newDBUser = await UserModel.create(newUser);
      res.send(generateTokenResponse(newDBUser));
   })
);

export default router;
