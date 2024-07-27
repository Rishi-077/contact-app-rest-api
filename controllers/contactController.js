import asyncHandler from "express-async-handler";
import Contacts from "../models/contactModal.js";

const getContacts = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found!!!");
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User Dont have permission to view this contact!!!");
    }
    res.status(200).json({ message: "Welcome Contact app", data: contact });
  } else {
    const contacts = await Contacts.find({ user_id: req.user.id });
    res.status(200).json({ message: "Welcome Contact app", data: contacts });
  }
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, number } = req.body;
  if (!name || !email || !number) {
    res.status(400);
    throw new Error("All Field is required!!!");
  }
  const contacts = await Contacts.findOne({
    $or: [{ email }, { number }],
  });
  if (contacts) {
    res.status(400);
    throw new Error("Contact Already Exists!!!");
  } else {
    const contact = await Contacts.create({
      user_id: req.user.id,
      name,
      email,
      number,
    });
    res
      .status(200)
      .json({ message: "Contact created successfully", data: contact });
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found!!!");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Don't have permission to delete this contact!!!");
  }

  await Contacts.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Contact Deleted" });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found!!!");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Dont have permission to update this contact!!!");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Contact Updated", data: updatedContact });
});

export { getContacts, createContact, deleteContact, updateContact };
