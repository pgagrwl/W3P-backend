const fs = require("fs");
const Papa = require("papaparse");
require("dotenv").config();

const storeNFT = require("../utils/storeImage");
const storeMetadata = require("../utils/storeMetadata");
const attributesHeader = require("../utils/attributeHeaders");
const { encryptMessage, decryptMessage } = require("../utils/encrypt");

// Provide the path to your CSV file
const csvFilePath = "./../input/NFT.csv";

const metadataArr = [];
const metadataWithURI = [];
const key = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

function convertCSVtoJSON(csvFilePath) {
  const csvFileContent = fs.readFileSync(csvFilePath, "utf8");

  Papa.parse(csvFileContent, {
    complete: async function (results) {
      const jsonData = results.data;
      for (let i = 0; i < jsonData.length; i++) {
        const attributeArr = [];
        const headers = attributesHeader;
        for (let j = 0; j < headers.length; j++)
          if (jsonData[i][headers[j]]) {
            attributeArr.push({
              trait_type: headers[j],
              value: `${jsonData[i][headers[j]]}`,
            });
          }
        const IPFSNFT = await storeNFT(
          `${jsonData[i].NewId}`,
          "Web3 Punks (X Collection)",
          `./../images/${jsonData[i].OldId}.png`
        );
        console.log("IPFSNFT", IPFSNFT);

        const payload = {
          name: `W3PX#${jsonData[i].NewId}`,
          tokenId: jsonData[i].NewId,
          description: "Web3 Punks (X Collection)",
          image: `https://ipfs.io/ipfs/${IPFSNFT}`,
          external_url: "https://example.com/token-details",
          count: jsonData[i].Count,
          attributes: attributeArr,
        };
        const metadataStored = await storeMetadata(payload);

        metadataArr.push(payload);
        fs.writeFile(
          `./../output/metadataByTokenIds/${jsonData[i].NewId}.json`,
          JSON.stringify(payload),
          (err) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
            }
          }
        );

        // // Encrypt the message
        // const encryptedData = encryptMessage(iv, key, metadataStored);

        // // Decrypt the message
        // const decryptedMessage = decryptMessage(iv, key, encryptedData);

        // console.log("Encrypted:", encryptedData);
        // console.log("Decrypted:", decryptedMessage);

        const newPayload = {
          name: `W3PX#${jsonData[i].NewId}`,
          tokenId: jsonData[i].NewId,
          description: "Web3 Punks (X Collection)",
          image: encryptMessage(iv, key, IPFSNFT),
          URI: encryptMessage(iv, key, metadataStored),
          external_url: "https://example.com/token-details",
          count: jsonData[i].Count,
          attributes: attributeArr,
        };
        metadataWithURI.push(newPayload);
      }
      fs.writeFile(
        `./../output/allMetadata.json`,
        JSON.stringify(metadataWithURI),
        (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");
          }
        }
      );
    },
    header: true, // Set to true if the CSV file has a header row
    dynamicTyping: true, // Automatically convert numbers and booleans if possible
  });
}

convertCSVtoJSON(csvFilePath);
