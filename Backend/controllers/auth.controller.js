const User = require("../models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser =async (req,res) => {
    try {
        const {
            name, email , mobile , password , role
        } = req.body;

        const userExist = await User.findOne({email})

        if(userExist)
        {
            return res.status(400).json({
                message : "User alredy exist..!!",
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name, email ,mobile , password : hashedPassword, role
        })

        res.status(200).json({
            message : "user Register SuccessFully..!!",
            user,
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
        })
    }
}

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }


    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }


    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {registerUser , loginUser}