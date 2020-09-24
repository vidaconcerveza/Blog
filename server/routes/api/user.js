import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user";
import config from "../../config/index";
const {
  JWT_SECRET
} = config;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users");

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: e.message
    });
  }
});

router.post("/", (req, res) => {
  console.log(req.body, "REGISTER USER REQUEST");
  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Data error"
    });
  }

  User.findOne({
    email
  }).then((user) => {
    if (user) return res.status(400).json({
      message: "User already exist"
    });
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign({
              id: user.id
            },
            JWT_SECRET, {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});




export default router;