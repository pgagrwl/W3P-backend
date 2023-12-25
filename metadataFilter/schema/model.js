const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  image: String,
  attributeCount: Number,
  URI: String,
  traits: {
    Gender: String,
    SkinTone: String,
    HairColor: String,
    "Hair Style": String,
    "Lipstick Type": String,
    "Lipstick Color": String,
    "Ear Stud Shape": String,
    "Ear Stud Gemstone": String,
    "Necklace Metal": String,
    "Necklace Gemstone": String,
    "Neck Chain": String,
    Face: String,
    Mouth: String,
    Mood: String,
    Eyeshadow: String,
    "Nerd Frame Type": String,
    "Nerd Frame Color": String,
    "Shades Type": String,
    "Shades Color": String,
    "3D Glasses": String,
    "VR Glassess": String,
  },
  tokenId: { type: Number, unique: true },
  imageHash: String,
});

const dataSchema = new mongoose.model("metadata", itemSchema);
module.exports = dataSchema;
