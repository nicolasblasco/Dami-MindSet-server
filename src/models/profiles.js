const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilesSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    maxLength: 50,
    required: true
  },
  description: {
    type: String,
    maxLength: 500,
    required: true
  }
});

module.exports = mongoose.model("Profiles", ProfilesSchema);