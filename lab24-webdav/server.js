// npm i webdav
// const config = require('config')
const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json({ extended: false }))
app.use(fileUpload())

app.use('/api/webdav', require('./routes/api/webdav'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running ${PORT}`));
