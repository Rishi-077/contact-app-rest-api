const getContacts = (req, res) => {
  res.status(200).json({ message: "Welcome Contact app" });
};

const createContact = (req, res) => {
  res.status(200).json({ message: "Contact Created" });
};

const deleteContact = (req, res) => {
  res.status(200).json({ message: "Contact Deleted" });
};

const updateContact = (req, res) => {
  res.status(200).json({ message: "Contact Updated" });
};

export { getContacts, createContact, deleteContact, updateContact };
