const crypto = require('crypto')

module.exports.encryptFile = (readStream, writeStream, key, cb) => {
    const algorithm = 'aes-256-cbc'
    const piv = Buffer.alloc(16, 0) // Create Buffer size 16, fill 0
    const pKey = key ? key : crypto.randomBytes(32)
    const cipher = crypto.createCipheriv(algorithm, pKey, piv)

    const rc = {
        cmd: 'cipher',
        iv: piv,
        algorithm,
        inbytes: 0,
        outbytes: 0,
        key: pKey
    }

    let pb = cb ? cb : (err, rc) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rc)
        }
    }

    readStream.pipe(cipher).pipe(writeStream)
    writeStream.on('close', () => {
        rc.inbytes = readStream.bytesRead;
        rc.outbytes = writeStream.bytesWritten;
        pb(null, rc)
    })
}

module.exports.decryptFile = (readStream, writeStream, key, iv, cb) => {
    const alg = 'aes-256-cbc'
    const piv = iv ? iv : Buffer.alloc(16, 0)

    const decipher = crypto.createDecipheriv(alg, key, piv)

    const rc = {
        cmd: 'decipher',
        iv: piv,
        algorithm: alg,
        inbytes: 0,
        outbytes: 0,
        key
    }

    const pcb = cb ? cb : (err, rc) => {
        if (err) {
            console.error(err)
        } else {
            console.log(rc)
        }
    }

    readStream.pipe(decipher).pipe(writeStream)
    writeStream.on('close', () => {
        rc.inbytes = readStream.bytesRead
        rc.outbytes = writeStream.bytesWritten
        pcb(null, rc)
    })
    decipher.on('error', (err) => {
        console.error(err)
    })
}



