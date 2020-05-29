const JsonRPCServer = require('jsonrpc-server-http-nats')

const server = new JsonRPCServer()

server.on('Ping', response => {
    let error = null
    let result = 'Pong'

    response(error, result)
})

let bin_validator = param => {
    console.log('validator', param);
    if (!Array.isArray(param)) {
        throw new Error('Expected Array')
    }
    if (param.length != 2) {
        throw new Error('Expected 2 values')
    }
    if (!isFinite(param[0]) || !isFinite(param[1])) {
        throw new Error('Expected number')
    }
    return param
}

server.on('sum', bin_validator, (params, channel, response) => {
    response(null, params[0] + params[1])
})


server.listenHttp({
    host: 'localhost',
    port: 3000
}, () => {
    console.log('JSON-RPC listen 3000')
})





