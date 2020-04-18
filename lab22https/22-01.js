const https = require('https')
const fs = require('fs')

const PORT = (3443)
const options = {
    key: fs.readFileSync('LAB.key'),
    cert: fs.readFileSync('LAB.crt')
}

https.createServer(options, (req, res) => {
    console.log('hello from https')
    res.end('Resource')
}).listen(PORT)

