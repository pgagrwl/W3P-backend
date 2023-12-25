const crypto = require('crypto');
require("dotenv").config()

exports.encryptMessage = (predefinedIV, predefinedKey, message) => {
    const iv = Buffer.from(predefinedIV, 'hex'); // Directly use as 16 bytes
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(predefinedKey, 'hex'), iv);
    let encrypted = cipher.update(message);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

exports.decryptMessage = (predefinedIV, predefinedKey, encryptedMessage) => {
    const iv = Buffer.from(predefinedIV, 'hex'); // Directly use as 16 bytes
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(predefinedKey, 'hex'), iv);
    let decrypted = decipher.update(Buffer.from(encryptedMessage, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Generate a random key
// const key = process.env.ENCRYPTION_KEY

// Original message
// const message = "Hello, this is a secret message!";

// Encrypt the message
// const { iv, encryptedData } = encryptMessage(key, message);

// Decrypt the message
// const decryptedMessage = decryptMessage(key, iv, encryptedData);

// console.log('Key:', key);
// console.log('key length:', key.length);

// console.log('IV:', iv);
// console.log('Encrypted:', encryptedData);
// console.log('Decrypted:', decryptedMessage);
