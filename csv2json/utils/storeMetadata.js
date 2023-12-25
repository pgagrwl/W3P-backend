const { NFTStorage, File } = require("nft.storage");
const { Blob } = require("buffer");
require("dotenv").config({ path: "./../.env" });

module.exports = async function storeMetadata(file) {
  const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
  const content = new Blob([JSON.stringify(file)]);
  const cid = await client.storeBlob(content);
  // console.log(cid)
  const uri = `https://ipfs.io/ipfs/${cid}`;
  return uri;
};
