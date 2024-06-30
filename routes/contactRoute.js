import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);

export default router;
