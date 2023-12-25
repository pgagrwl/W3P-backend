require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const dataSchema = require("./schema/model");
const cors = require("cors"); // Add this line
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {}).then(() => {
  console.log("DB connected");
});

app.post("/filter-items", async (req, res) => {
  try {
    // Default page number is 1 and items per page is 25
    const page = parseInt(req.body.page) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;

    const query = buildQuery(req.body);
    const totalItems = await dataSchema.countDocuments(query);
    const items = await dataSchema
      .find(query)
      .sort({ tokenId: 1 })
      .skip(skip)
      .limit(limit);

    if (items.length > 0) {
      res.send({
        items: items,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems: totalItems,
      });
    } else {
      res.send("No items found");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error occurred while fetching data", error });
  }
});

const buildQuery = (filterParams) => {
  const query = {};

  // Include tokenId in query if it's provided
  if (filterParams.tokenId) {
    query.tokenId = filterParams.tokenId;
  }

  // Construct query for multiple traits
  if (filterParams.traits) {
    for (const key in filterParams.traits) {
      query[`traits.${key}`] = filterParams.traits[key];
    }
  }

  console.log(query);
  return query;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
