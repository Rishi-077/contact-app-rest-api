import asyncHandler from "express-async-handler";
import Contacts from "../models/contactModal.js";

const getContacts = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found!!!");
    }
    res.status(200).json({ message: "Welcome Contact app", data: contact });
  } else {
    const contacts = await Contacts.find();
    res.status(200).json({ message: "Welcome Contact app", data: contacts });
  }
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, number } = req.body;
  if (!name || !email || !number) {
    res.status(400);
    throw new Error("All Field is required!!!");
  }
  const contact = await Contacts.create({
    name,
    email,
    number,
  });
  res.status(200).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Contact Deleted" });
});

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Contact Updated" });
});

export { getContacts, createContact, deleteContact, updateContact };
