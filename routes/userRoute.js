import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register successfully" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login successfully" });
});

router.post("/current", (req, res) => {
  res.json({ message: "User Data" });
});

export default router;
