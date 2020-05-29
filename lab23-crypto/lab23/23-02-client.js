const fs = require('fs')
const request = require('request')
const crypto = require('crypto')
const { ClientVerify } = require('./23-02m')


// request('http://localhost:3000/file').pipe(fs.createWriteStream('file.txt'))

console.log('ok')
let signContext = {}
// const rs1 = fs.createReadStream('./file.txt') // copy on client


request('http://localhost:3000/context', (err, res, context) => {
    if (err) {
        console.error(err);
    }

    signContext = JSON.parse(context)
    request('http://localhost:3000/file').pipe(fs.createWriteStream('ch23-01copy.txt'))

    const rs1 = fs.createReadStream('./ch23-01copy.txt') // copy on client
    console.log('context:', signContext);

    const clientVerify = new ClientVerify(signContext.signContext)
    clientVerify.verify(rs1, result => {
        console.log(result);
    })

})


// // send request and verify
// const clientVerify = new ClientVerify(signContext)
// clientVerify.verify(rs1, result => {
//     console.log(result);
// })

// const verify = () => {
//     const options = {
//         uri: 'http://localhost:3000/file',
//         method: 'GET'
//     }
//     request(options, (err, res) => {
//         if (!err) {
//             serverContext = JSON.parse(res.body)
//             console.log('serverContext:', serverContext)
//             calcEncryptionKey(serverContext)
//         } else {
//             console.error(err)
//         }
//     })
// }

// verify() 

// // --- КЛИЕНТ
// const calcEncryptionKey = serverContext => {
//     const clientDH = new ClientDH(serverContext)
// // получает серверный контекст от сервера
// // вычисляет ключ для шифрования
//     clientSecret = clientDH.getSecret(serverContext).toString('hex')

// // формирует клиентский контекст для отправки серверу
//     const clientContext = clientDH.getContext()
//     console.log('clientContext', clientContext)

// // отправляет клиентский контекст серверу
//     const options = {
//         uri: `http://localhost:3000/${ID}`,
//         method: 'POST',
//         body: JSON.stringify(clientContext),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     request(options, (err, res) => {
//         if (!err) {
//             console.log(res.body)
//             console.log(clientSecret)
//             getFileFromServer()
//         } else {
//             console.error(err)
//         }
//     })
// }

// const getFileFromServer = () => {
//     const options = {
//         uri: `http://localhost:3000/resource/${ID}`,
//         method: 'GET',

//     }

//     request(options, (err, res) => {
//         if (!err) {
//             console.log(res.body)
//             const encryptedData = JSON.parse(res.body)
//             const iv = Buffer.alloc(16, 0)
//             const key = crypto.scryptSync(clientSecret, 'salt', 32)

//             const decryptedData = crypto
//                 .createDecipheriv('aes-256-cbc', key, iv)
//                 .update(encryptedData.file, 'hex', 'utf8')
//                 .toString('utf8')

//             console.log('decryptedData', decryptedData)

//             fs.writeFileSync('./clientFile.txt', decryptedData)

//         } else {
//             console.error(err)
//         }
//     })
// }