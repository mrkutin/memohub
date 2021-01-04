const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const port = 3000

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', (req, res) => {
    res.json({greeting: 'Hello'})
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})