import Patient from "../models/Patient.js";

const getAllPatients = async (req, res) => {
  try {
    const patient = await Patient.find({});
    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ msg: "there was an error" });
  }
};

export { getAllPatients };
