const express = require('express')

const { ServerSign, ClientVerify } = require('./23-02m')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'));



app.get('/context', (req, res) => {
    const rs = fs.createReadStream('./ch23-01.txt', 'utf8') // on server

    const serverSign = new ServerSign()
    
    serverSign.getSignContext(rs, signContext => {
        return res.json({
            signContext
        })
    })          
})

app.get('/file', (req, res) => {
    const rs = fs.createReadStream('./ch23-01.txt', 'utf8') // on server

    rs.pipe(res);
    return;
})

app.listen(PORT, () => console.log(`Server is running ${PORT}`))

