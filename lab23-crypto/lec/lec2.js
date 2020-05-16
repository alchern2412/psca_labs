// 2. Crypto: Симметричное шифрование
const crypto = require('crypto')


let iv = crypto.randomBytes(16)
let key = crypto.randomBytes(32)

let txt = 'My text to encrypting'

// encrypt
let encryption = crypto.createCipheriv('aes-256-cbc', key, iv)
let encryptedTxt = encryption.update(txt)
encryptedTxt = Buffer.concat([encryptedTxt, encryption.final()])

console.log(txt, ' => ', encryptedTxt.toString('hex'))
encryptedTxt = iv.toString('hex') + ':' + encryptedTxt.toString('hex')
console.log('EncryptedTxt: ', encryptedTxt)

// decrypt
let txts = encryptedTxt.split(':')
iv = Buffer.from(txts.shift(), 'hex') // get iv
encryptedTxt = Buffer.from(txts.join(':'), 'hex') // get encrypted text

let decryption = crypto.createDecipheriv('aes-256-cbc', key, iv)
let decryptedTxt = decryption.update(encryptedTxt)
decryptedTxt = Buffer.concat([decryptedTxt, decryption.final()]).toString()

console.log(encryptedTxt.toString('hex'), ' => ', decryptedTxt)












