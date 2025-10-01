const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      minLength: 8,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error();
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://p.kindpng.com/picc/s/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
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
