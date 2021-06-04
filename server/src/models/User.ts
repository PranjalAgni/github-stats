import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/";

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 85
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
