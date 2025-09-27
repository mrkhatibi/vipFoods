import { model, models, Schema } from "mongoose";



const VipCartsSchema = new Schema({
     userId : {
      type : String ,
      required : true
    },
    carts: {
      type: [],
      required: true,
    }
} , {timestamps : true})

const VIPCart = models.VIPCart || model("VIPCart" , VipCartsSchema)
export default VIPCart