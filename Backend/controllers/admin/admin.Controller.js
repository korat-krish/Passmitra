const User = require("../../models/User.model");
const bcrypt = require("bcrypt");

const createOrganizer = async (req, res) => {
  try {
    const { name, email, mobile, password, companyName } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Organizer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organizer = await User.create({
      name,
      email,
      mobile,

      password: hashedPassword,

      role: "organizer",

      eventLimit: 1,

      branding: {
        companyName,
      },
    });

    res.status(201).json({
         message: "Organizer created successfully",
         organizer
      });
  } catch (error) {
    console.log("Error is :", error);
  }
};

module.exports = {
   createOrganizer
};
