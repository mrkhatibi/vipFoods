import { model, models, Schema } from "mongoose";

const VipFoodsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Appetizers", "Main Courses", "Salads", "Desserts", "Beverages"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image : {
    type : String ,

  }
} , {timestamps : true});

const VIPFOODS = models.VIPFOODS || model("VIPFOODS" , VipFoodsSchema)
export default VIPFOODS


