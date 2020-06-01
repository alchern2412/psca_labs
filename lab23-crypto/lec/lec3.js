// Crypto: симметричное шифрование, поток

const fs = require('fs')
const cipherFile = require('./lec3m').encryptFile

const key = '12345678901234567890123456789012' // key length is important(!)
const rs = fs.createReadStream('./lec3-in.txt')
const ws = fs.createWriteStream('./lec3-out.txt')

cipherFile(rs, ws, key)