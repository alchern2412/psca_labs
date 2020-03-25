const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        phonesList: (context, opt) => {
            return (
                `<div>
                    <ul class="list-group">
                    ${context.map((item) => {
                        return `<a href="/update?name=${encodeURIComponent(item.name)}&number=${encodeURIComponent(item.number)}"><li class="list-group-item">${item.name} - ${item.number}</li></a>` 
                }).join('\n')}
                    </ul>
                </div>`
            )
        }
    }
})

app.set('port', 3000)
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// let phonesList = [
//     { name: 'Alex', number: '+375298402412'},
//     { name: 'Andrey', number: '88005553535'},
//     { name: 'Valeria', number: '+375295309879'},
//     { name: 'Yarik', number: '+3752944444444'},
// ]

console.log(path.join(__dirname, 'list.json'));
let phonesList = JSON.parse(fs.readFileSync(path.join(__dirname, 'list.json')).toString('utf-8'))
console.log(phonesList);

app.get('/', (req, res, next) => {
    res.render('index', {
        phonesList: phonesList
    })
}).get('/add', (req, res, next) => {
    res.render('add', {
        phonesList: phonesList
    })
}).post('/add', (req, res, next) => {
    // phonesList.push(req.body);
    console.log(req.body)
    phonesList.push(req.body)
    next()
}).get('/update', (req, res, next) => {
    let name = req.query.name
    let number = req.query.number
    res.render('update', {
        phonesList,
        name,
        number
    })
}).post('/update', (req, res, next) => {
    const {name, number, oldName, oldNumber} = req.body
    console.log(oldName)
    console.log(oldNumber)
    console.log(number)
    phonesList.forEach((item, i) => {
        if (item.name === oldName && item.number === oldNumber) {
            phonesList[i] = {name, number}
        }
    })
    next()
}).post('/delete', (req, res, next) => {
    const {name, number} = req.body
    phonesList = phonesList.filter(item => item.name !== name)
    next()
}).use((req, res) => {
    fs.writeFileSync(path.join(__dirname, 'list.json'), JSON.stringify(phonesList), {encoding: 'utf-8', flag: 'w'})
    res.redirect('/')
})

const server = app.listen(
    app.get('port'), () => {
        console.log('Server is started, port: ', app.get('port'))
    }
)





















