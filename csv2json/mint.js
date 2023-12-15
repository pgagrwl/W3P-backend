
const { NFTStorage, File } = require('nft.storage')
const axios = require('axios');
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

module.exports = async function storeNFT(imagePath, name, description) {

    const image = await fileFromPath(imagePath)
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const result = await nftstorage.store({ image, name, description })
    // const status = await nftstorage.check(`${result.ipnft}`)
    // console.log('status: ' + JSON.stringify(status));
    // console.log('result:', result.ipnft);
    const getData = await axios.get(`https://${result.ipnft}.ipfs.dweb.link/metadata.json`)
    const imageData = getData.data.image;

    return imageData
}


async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.lookup(filePath);
    return new File([content], path.basename(filePath), { type })
}
