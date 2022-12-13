const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'hanahana'.repeat(2);
const iv = Buffer.from('778e6d5c11ed3a81c60e0700cbc62d0a', 'hex');

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
};

const decrypt = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};