const CryptoJS = require('crypto-js')

const decryptPassword = (ciphertext, key) => {
    const bytes  = CryptoJS.AES.decrypt(ciphertext, key)
    return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports = decryptPassword