require("dotenv").config({ path: "./../.env" });
const fs = require("fs");
const mongoose = require("mongoose");
const dataSchema = require("./../schema/model");

const filterArr = [];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {}).then(() => {
  console.log("DB connected");
});

fs.readFile("./../output/allMetadata.json", "ascii", function (err, data) {
  const arr = JSON.parse(data);
  let traitsObj = {};
  // Display the file content
  arr.forEach((element) => {
    for (let i = 0; i < element.attributes.length; i++) {
      traitsObj[element.attributes[i].trait_type] = element.attributes[i].value;
    }

    const payload = new dataSchema({
      image: element.image,
      attributeCount: element.count,
      URI: element.URI,
      traits: traitsObj,
      tokenId: element.tokenId,
    });

    filterArr.push(payload);
    try {
      payload.save();
    } catch (error) {
      console.log(error.message);
    }
    traitsObj = {};
  });

  fs.writeFile(`./../output/data.json`, JSON.stringify(filterArr), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
});
