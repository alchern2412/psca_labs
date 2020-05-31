const express = require('express')
const swaggerUi = require('swagger-ui-express')
const openApiDoc = require('./openapi')

const PORT = process.env.PORT || 3000
const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDoc))
const server = app.listen(PORT)