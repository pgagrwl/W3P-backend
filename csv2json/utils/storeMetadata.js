const { NFTStorage, File } = require('nft.storage')
const { Blob } = require('buffer');
require('dotenv').config('./../')

module.exports = async function storeMetadata(file) {

    const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY
    console.log('NFT_STORAGE_KEY', NFT_STORAGE_KEY);

    const client = new NFTStorage({ token: NFT_STORAGE_KEY })
    const content = new Blob([JSON.stringify(file)])
    const cid = await client.storeBlob(content)
    // console.log(cid)
    const uri = `https://ipfs.io/ipfs/${cid}`;
    return uri
};