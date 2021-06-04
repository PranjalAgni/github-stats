import mongoose, { Schema } from "mongoose";
import { IRepository } from "../interfaces/";

const repositorySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Repository = mongoose.model<IRepository>("Repository", repositorySchema);

export default Repository;
