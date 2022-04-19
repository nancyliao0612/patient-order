import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  Message: {
    type: String,
    required: [true, "Please provide order message"],
    trim: true,
  },
  Id: {
    type: String,
    required: [true, "Please provide order id"],
  },
});

export default mongoose.model("Order", OrderSchema);
