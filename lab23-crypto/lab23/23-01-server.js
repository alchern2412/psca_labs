const {ServerDH, ClientDH} = require('./23-01m')
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const crypto = require('crypto')

const serverDH = new ServerDH(1024, 3) // длина а, g
const serverContext = serverDH.getContext()
console.log('serverContext', serverContext)

const PORT = 3000
const clients = [] // {id, context, secret}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
// --- СЕРВЕР
// получает запрос от клиента
// формирует серверный контекст для отправки клиенту
    res.json(serverContext)
// отправляет ответ клиенту с серверным контекстом
})

app.post('/:id', (req, res) => {
// --- СЕРВЕР
// получает клиенсткий контекст и вычисляет ключ для шифрования
    const clientContext = req.body
    const serverSecret = serverDH.getSecret(clientContext)
    console.log('serverSecret', serverSecret)
    const client = clients.find(client => client.id === req.params.id)
    if (client) {
        client.secret = serverSecret.toString('hex')
    } else {
        clients.push({
            id: req.params.id,
            secret: serverSecret.toString('hex')
        })
    }
    console.log('clients', clients)
    res.send('OK')
})

app.get('/resource/:id', (req, res) => {
    try {
        const id = req.params.id
        console.log('id', id)
        const file = fs.readFileSync('./serverFile.txt', 'utf-8')
        console.log('file:', file)
        const client = clients.find(client => client.id === id)
        console.log('client', client)
        console.log('clients', clients)
        if (!client) {
            return res.status(404).json({msg: 'Client not found'})
        }
        let key = client.secret
        if (!key) {
            return res.status(404).json({msg: 'No secret of this ClientId'})
        }

        const iv = Buffer.alloc(16, 0)
        key = crypto.scryptSync(key, 'salt', 32)
        const encryptedFile = crypto
            .createCipheriv('aes-256-cbc', key, iv)
            .update(file, 'utf8', 'hex')
            .toString('utf8')
        const decryptedData = crypto
            .createDecipheriv('aes-256-cbc', key, iv)
            .update(encryptedFile, 'hex', 'utf8')
            .toString('utf8')

        console.log('decryptedData', decryptedData)
        // let encryption = crypto.createCipheriv('aes-256-cbc', key, iv)
        // let encryptedTxt = encryption.update(file)
        // encryptedTxt = Buffer.concat([encryptedTxt, encryption.final()])
        //
        // console.log(file, ' => ', encryptedTxt.toString('hex'))
        // encryptedTxt = iv.toString('hex') + ':' + encryptedTxt.toString('hex')
        // console.log('EncryptedTxt: ', encryptedTxt)



        res.json({file: encryptedFile})
    } catch (e) {
        console.error(e)
        res.status(500).json({msg: 'Server Error'})
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`)
})