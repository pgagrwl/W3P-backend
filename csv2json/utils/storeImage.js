const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
require("dotenv").config({ path: "./../.env" });

module.exports = async function storeNFT(name, description, imagePath) {
  const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
  const result = await nftstorage.store({
    name,
    description,
    image: new File([fs.readFileSync(imagePath)], name, { type: "image/jpg" }),
  });
  const imageData = result.data.image.href;

  return imageData.slice(7);
};
