import mongoose, { Schema } from "mongoose";

export interface User {
   id: string;
   name: string;
   email: string;
   password: string;
   address: string;
   isAdmin: boolean;
}

export const UserSchema = new Schema<User>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      address: { type: String, required: true },
      isAdmin: { type: Boolean, required: true },
      password: { type: String, required: true },
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      timestamps: true,
   }
);

export const UserModel = mongoose.model<User>("user", UserSchema);
