import { model, models, Schema } from "mongoose";

const vipFoodUUsersSchema = new Schema(
  {
    userName: {
      type: String,
      requierd: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      requierd: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      requierd: true,
    },
    number: {
      type: Number,
    },
    address: {
      type: String,
    },
    resturantName: {
      type: String,
    },
    resturantType: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "OWNER", "USER"],
      requierd: true
    },
  },
  { timestamps: true }
);

const VIPFOODUSERS =
  models.VIPFOODUSERS || model("VIPFOODUSERS", vipFoodUUsersSchema);
export default VIPFOODUSERS;
