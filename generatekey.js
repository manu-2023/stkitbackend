// generateKey.js
const crypto = require('crypto');

// Generate a random 32-byte key
const secretKey = crypto.randomBytes(32).toString('base64');

// Print the key to the console
console.log('Your JWT Secret Key:', secretKey);