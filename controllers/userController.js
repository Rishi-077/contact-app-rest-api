import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import userModal from "../models/userModal.js";
import User from "../models/userModal.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!!!");
  }
  const userAvailable = await userModal.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Registered!!!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModal.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({ message: "Register successfully" });
  } else {
    res.status(400);
    throw new Error("User data Not Valid");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All field is required!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({
      message: "Login successfully",
      token: accessToken,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("Email or Password Not Valid");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "current user info" });
});

export { registerUser, loginUser, currentUser };
