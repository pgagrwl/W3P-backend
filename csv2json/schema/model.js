const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  tokenId: { type: Number, unique: true },
  attributeCount: Number,
  image: String,
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
});

const dataSchema = new mongoose.model("metadata", itemSchema);
module.exports = dataSchema;
