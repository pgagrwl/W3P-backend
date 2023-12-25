const { NFTStorage, File } = require('nft.storage')
const fs = require('fs')
require('dotenv').config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY
console.log('NFT_STORAGE_KEY', NFT_STORAGE_KEY);

module.exports = async function storeNFT(name, description, imagePath) {

    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const result = await nftstorage.store({
        name, description,
        image: new File([fs.readFileSync(imagePath)], name, { type: 'image/jpg' })
    })
    const imageData = result.data.image.href

    return imageData.slice(7)
}

