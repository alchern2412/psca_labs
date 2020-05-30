const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use('/', express.static('public'))

app.use((req, res, next) => {
    console.log('handler 02')
    next()
})

app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`)
})



