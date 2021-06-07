import mongoose, { Schema } from "mongoose";

export interface ICommit extends Document {
  userId: string;
  repoId: string;
  count: number;
}

const commitSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    repoId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Repository"
    },
    count: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

const Commit = mongoose.model<ICommit>("Commit", commitSchema);

export default Commit;
