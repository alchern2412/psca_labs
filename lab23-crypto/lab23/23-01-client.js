const request = require('request')
const crypto = require('crypto')
const {ClientDH} = require('./23-01m')
const fs = require('fs')

const ID = 3
let serverContext = ''
let clientSecret

// --- КЛИЕНТ
// Клиент делает запрос на получение контекста
// для генерации симметричного ключа для шифрования
const getContextRequest = () => {
    const options = {
        uri: 'http://localhost:3000/',
        method: 'GET'
    }
    request(options, (err, res) => {
        if (!err) {
            serverContext = JSON.parse(res.body)
            console.log('serverContext:', serverContext)
            calcEncryptionKey(serverContext)
        } else {
            console.error(err)
        }
    })
}

getContextRequest() 

// --- КЛИЕНТ
const calcEncryptionKey = serverContext => {
    const clientDH = new ClientDH(serverContext)
// получает серверный контекст от сервера
// вычисляет ключ для шифрования
    clientSecret = clientDH.getSecret(serverContext).toString('hex')

// формирует клиентский контекст для отправки серверу
    const clientContext = clientDH.getContext()
    console.log('clientContext', clientContext)

// отправляет клиентский контекст серверу
    const options = {
        uri: `http://localhost:3000/${ID}`,
        method: 'POST',
        body: JSON.stringify(clientContext),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(options, (err, res) => {
        if (!err) {
            console.log(res.body)
            console.log(clientSecret)
            getFileFromServer()
        } else {
            console.error(err)
        }
    })
}

const getFileFromServer = () => {
    const options = {
        uri: `http://localhost:3000/resource/${ID}`,
        method: 'GET',

    }

    request(options, (err, res) => {
        if (!err) {
            console.log(res.body)
            const encryptedData = JSON.parse(res.body)
            const iv = Buffer.alloc(16, 0)
            const key = crypto.scryptSync(clientSecret, 'salt', 32)

            const decryptedData = crypto
                .createDecipheriv('aes-256-cbc', key, iv)
                .update(encryptedData.file, 'hex', 'utf8')
                .toString('utf8')

            console.log('decryptedData', decryptedData)

            fs.writeFileSync('./clientFile.txt', decryptedData)

        } else {
            console.error(err)
        }
    })
}

// getFileFromServer()