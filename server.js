import express from "express";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use("/api/contacts", contactRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}!!!`);
});
