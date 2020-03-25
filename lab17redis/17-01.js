const redis = require('redis'); // npm install redis

const client = redis.createClient('//redis-11216.c44.us-east-1-2.ec2.cloud.redislabs.com:11216', {
    password: 'OsYhlQEfGqya2DAzPAqRDctFsh51xOr7'
});

client.on('ready', () => {
    console.log('ready');
});

client.on('error', (err) => {
    console.log('error: ' + err);
});

client.on('connect', () => {
    console.log('connect');
});

client.on('end', () => {
    console.log('end');
});

client.quit(); // 








