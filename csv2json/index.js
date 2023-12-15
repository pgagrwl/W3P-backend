const fs = require('fs');
const Papa = require('papaparse');
const storeNFT = require('./mint')
const storeMetadata = require('./storeMetadata')
const ethers = require("ethers")
const attributesHeader = require('./attributeHeaders')
const metadataArr = []
const metadataWithURI = []
function convertCSVtoJSON(csvFilePath) {
    const csvFileContent = fs.readFileSync(csvFilePath, 'utf8');

    Papa.parse(csvFileContent, {
        complete: async function (results) {
            const jsonData = results.data;
            for (let i = 0; i < jsonData.length; i++) {
                const attributeArr = []
                const headers = attributesHeader
                for (let j = 0; j < headers.length; j++)
                    if (jsonData[i][headers[j]]) {
                        attributeArr.push({
                            "trait_type": headers[j],
                            "value": `${jsonData[i][headers[j]]}`
                        })
                    }
                const IPFSNFT = await storeNFT(`./images/${i}.png`, `W3PX#${jsonData[i].id}`, "Web3 Punks (X Collection)")
                console.log('IPFSNFT', IPFSNFT);

                const payload = {
                    "name": `W3PX#${jsonData[i].id}`,
                    "tokenId": jsonData[i].id,
                    "description": "Web3 Punks (X Collection)",
                    "image": IPFSNFT,
                    "external_url": "https://example.com/token-details",
                    "count": jsonData[i].Count,
                    "attributes": attributeArr
                }
                const metadataStored = await storeMetadata(payload)
                // console.log('metadata stored', metadataStored);

                metadataArr.push(payload);
                fs.writeFile(`./metadataByTokenIds/${jsonData[i].id}.json`, JSON.stringify(payload), (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("File written successfully\n");
                    }
                });
                // URIArr.push(metadataStored)
                const newPayload = {
                    "name": `W3PX#${jsonData[i].id}`,
                    "tokenId": jsonData[i].id,
                    "description": "Web3 Punks (X Collection)",
                    "image": IPFSNFT,
                    "URI": metadataStored,
                    "external_url": "https://example.com/token-details",
                    "count": jsonData[i].Count,
                    "attributes": attributeArr
                }
                metadataWithURI.push(newPayload)
            }
            fs.writeFile(`./ allMetadata.json`, JSON.stringify(metadataWithURI), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                }
            });
        },
        header: true, // Set to true if the CSV file has a header row
        dynamicTyping: true // Automatically convert numbers and booleans if possible
    });


}



// Provide the path to your CSV file
const csvFilePath = './NFT.csv';
convertCSVtoJSON(csvFilePath);
