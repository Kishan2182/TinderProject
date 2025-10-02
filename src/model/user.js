const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      maxLength: 20,
    },
    emailId: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email:");
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Enter Strong Password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase:true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Not a valid gender (Male , Female and other)");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://p.kindpng.com/picc/s/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
      validate(value) {
        if (!validator.isURL(value)) {
         throw new Error("Invalid Photo URL: "+ value);
        }
      },
    },
    about: {
      type: String,
      default: "I am deafult description of the about",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
