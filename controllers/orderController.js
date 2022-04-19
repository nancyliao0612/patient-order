import Order from "../models/Order.js";

const getSinglePatientOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.find({ Id: orderId });
    // if (!order) {
    //   return res.status(404).json({ msg: `No task with id : ${orderId}` });
    // }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createPatientOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updatePatientOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ msg: `No task with id : ${orderId}` });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { getSinglePatientOrder, createPatientOrder, updatePatientOrder };
