import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please provide patient name"],
    trim: true,
  },
});

export default mongoose.model("Patient", PatientSchema);
