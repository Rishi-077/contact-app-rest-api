import express from "express";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDb();

app.use(express.json());
app.use("/api/contacts", contactRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}!!!`);
});
