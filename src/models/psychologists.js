const mongoose = require("mongoose");

const { Schema } = mongoose;

const PsychologistsSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    maxLength: 30,
    required: true,
  },
  username: {
    type: String,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    maxLength: 30,
    required: true,
  },
  phoneNumber: {
    type: String,
    maxLength: 15,
    required: true,
  },
  enrollmentNumber: {
    type: String,
    maxLength: 4,
    required: true,
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "UNAVAILABLE"],
    required: true,
  },
  availability: {
    type: [{
      key: {
        type: String,
      },
      day: {
        type: String,
      },
      time: {
        type: String,
      },
    }],
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Psychologists", PsychologistsSchema);
