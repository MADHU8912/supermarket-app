const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://localhost:27017/supermarket");

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await Admin.create({
    username: "admin",
    password: 1234
  });

  console.log("Admin created");
}

createAdmin();
