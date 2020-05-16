// const {ServerSign, ClientVerify} = require('./23-01m')
// const fs = require('fs')
//
// const rs = fs.createReadStream('./ch23-01.txt')
// const rs1 = fs.createReadStream('./ch23-01.txt')
//
// let ss = new ServerSign()
// ss.getSignContext(rs, signContext => {
//
// })

const { ServerDH, ClientDH } = require('./23-01m')

// --- КЛИЕНТ
// Клиент делает запрос на получение контекста
// для генерации симметричного ключа для шифрования

// --- СЕРВЕР
// получает запрос от клиента
const serverDH = new ServerDH(1024, 3) // длина а, g
// формирует серверный контекст для отправки клиенту
const serverContext = serverDH.getContext()
console.log('serverContext', serverContext)
// отправляет ответ клиенту с серверным контекстом

// --- КЛИЕТ
// получает серверный контекст от сервера
const clientDH = new ClientDH(serverContext)
// вычисляет ключ для шифрования
const clientSecret = clientDH.getSecret(serverContext)
// формирует клиентский контекст для отправки серверу
const clientContext = clientDH.getContext()
console.log('clientContext', clientContext)

// отправляет клиентский контекст серверу

// --- СЕРВЕР
// получает клиенсткий контекст и вычисляет ключ для шифрования
const serverSecret = serverDH.getSecret(clientContext)

// ------------
console.log('serverSecret', serverSecret)
console.log('clientSecret', clientSecret)







