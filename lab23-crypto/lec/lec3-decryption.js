// Crypto: симметричное шифрование, поток

const fs = require('fs')
const decipherFile = require('./lec3m').decryptFile

const key = '12345678901234567890123456789012' // key length is important(!)
const rs = fs.createReadStream('./lec3-out.txt')
const ws = fs.createWriteStream('./lec3-decrypted.txt')

decipherFile(rs, ws, key)