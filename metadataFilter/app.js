require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const data = require('./data');
const cors = require('cors'); // Add this line
const app = express();
app.use(cors());
app.use(express.json());

function fetchTokenData(tokenData, filters) {
    return tokenData.filter(token => {
        // Check for tokenId match if specified
        if ('tokenId' in filters && token.tokenId !== filters.tokenId) {
            return false;
        }

        // Check if all specified traits match
        for (let trait in filters.traits) {
            if (filters.traits.hasOwnProperty(trait) && token.traits[trait] !== filters.traits[trait]) {
                return false;
            }
        }

        return true;
    });
}

app.post('/fetchTokens', (req, res) => {
    const filters = req.body; // Filters can include traits and/or tokenId
    const result = fetchTokenData(data.tokenData, filters);
    res.json(result);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
