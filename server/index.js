const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const port = 3000
const url = 'mongodb://localhost:27017'

const DB = require('./db')
const db = new DB(url, 'memohub', 'notes')

db.on('connected', async () => {
  const app = express()
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  app.get('/notes/:id', async (req, res) => {
    const doc = await db.get(req.params.id)
    res.json(doc)
  })

  app.get('/notes', async (req, res) => {
    const cursor = await db.find({})
    res.json(await cursor.toArray())
  })

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
  })
})


