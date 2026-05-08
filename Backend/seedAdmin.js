const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User.model");

mongoose.connect(process.env.MONGO_URL)
.then(() => {
   console.log("MongoDB Connected");
})
.catch((err) => {
   console.log(err);
});


const seedAdmin = async () => {

   try {

      // check existing admin
      const adminExist = await User.findOne({
         role: "superadmin"
      });

      if(adminExist){
         console.log("Super Admin already exists");
         process.exit();
      }


      // hash password
      const hashedPassword = await bcrypt.hash(
         "pass@mitra511",
         10
      );


      // create admin
      await User.create({
         name: "Super Admin",
         email: "admin@passmitra.com",
         password: hashedPassword,
         role: "superadmin"
      });

      console.log("Super Admin Created ✅");

      process.exit();

   } catch (error) {

      console.log(error);

      process.exit();

   }

};

seedAdmin();