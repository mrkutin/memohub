const {MongoClient} = require('mongodb')
const EventEmitter = require('events')
const util = require('util')

const connectMongo = util.promisify(MongoClient.connect)

class DB extends EventEmitter {
  constructor(url) {
    super()
    this.url = url
    this.connect()
  }

  connect () {
    connectMongo(this.url).then(client => {
      this.client = client
      this.emit('connected')
    }).catch(err => {
      throw err
    })
  }

  
}

module.exports = DB