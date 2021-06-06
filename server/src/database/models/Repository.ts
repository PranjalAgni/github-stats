import mongoose, { Schema } from "mongoose";

export interface IRepository extends Document {
  userId: string;
  name: string;
  description: string;
  url: string;
  language: string;
}

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
      type: String
    },
    url: {
      type: String,
      required: true
    },
    language: {
      type: String
    }
  },
  { timestamps: true }
);

const Repository = mongoose.model<IRepository>("Repository", repositorySchema);

export default Repository;
