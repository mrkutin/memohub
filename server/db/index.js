const {MongoClient, ObjectId} = require('mongodb')
const EventEmitter = require('events')

class DB extends EventEmitter {
  constructor(url, dbName, collectionName) {
    super()
    this.url = url
    this.dbName = dbName
    this.collectionName = collectionName
    this.connect()
  }

  connect() {
    MongoClient.connect(this.url).then(client => {
      this.collection = client.db(this.dbName).collection(this.collectionName)
      this.emit('connected')
    }).catch(err => {
      throw err
    })
  }

  get(id) {
    const _id = typeof id === 'string' ? ObjectId(id) : id
    return new Promise((resolve, reject) => {
      this.collection.findOne({_id}, {}, (err, doc) => {
        if (err) {
          return reject(err)
        }
        return resolve(doc)
      })
    })
  }

  find(query) {
    if (typeof query._id === 'string') {
      query._id = ObjectId(query._id)
    }
    return new Promise((resolve, reject) => {
      this.collection.find(query, {}, (err, cursor) => {
        if (err) {
          return reject(err)
        }
        return resolve(cursor)
      })
    })
  }

  insert(doc) {
    return new Promise((resolve, reject) => {
      this.collection.insertOne(doc, {}, (err, {insertedId}) => {
        if (err) {
          return reject(err)
        }
        return resolve(insertedId)
      })
    })
  }

  update(query, doc) {
    if (typeof query._id === 'string') {
      query._id = ObjectId(query._id)
    }
    return new Promise((resolve, reject) => {
      this.collection.updateOne( query, {$set: doc}, {}, (err, {result}) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }

  remove(query) {
    if (typeof query._id === 'string') {
      query._id = ObjectId(query._id)
    }
    return new Promise((resolve, reject) => {
      this.collection.remove( query, {}, (err, {result}) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }

}

module.exports = DB