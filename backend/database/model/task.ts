import { model, Schema } from "mongoose";

const task = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

export const MTask = model("task", task);
