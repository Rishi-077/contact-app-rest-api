import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Add the Contact Name"],
    },
    email: {
      type: String,
      require: [true, "Please Add the Contact Email"],
    },
    number: {
      type: String,
      require: [true, "Please Add the Contact Number"],
    },
  },
  {
    timestamps: true,
  }
);

const contact = mongoose.model("Contact", contactSchema);
export default contact;
