const fs = require('fs');
const keccak256 = require('keccak256');
const filterArr = []

fs.readFile('./../output/allMetadata.json', 'ascii', function (err, data) {

    const arr = JSON.parse(data)
    let traitsObj = {}
    // Display the file content 
    arr.forEach(element => {
        for (let i = 0; i < element.attributes.length; i++) {
            traitsObj[element.attributes[i].trait_type] = element.attributes[i].value
        }

        const payload = {
            "image": element.image,
            "attributeCount": element.count,
            "URI": element.URI,
            "traits": traitsObj,
            "tokenId": element.tokenId,
            "imageHash": keccak256(element.image).toString('hex')
        }

        filterArr.push(payload)
        traitsObj = {}
    });


    fs.writeFile(`./../output/data.json`, JSON.stringify(filterArr), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });

});