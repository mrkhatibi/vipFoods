import { model, models, Schema } from "mongoose";

const VipOrderrSchema = new Schema(
  {
    userId : {
      type : String ,
      required : true
    },
    foodDetails: {
      type: {},
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const VIPORDER = models.VIPORDER || model("VIPORDER", VipOrderrSchema);
export default VIPORDER;
