const PouchDB = require ('pouchdb')
const db = new PouchDB('http://localhost:5984/memohub-6d726b7574696e', {
  auth: {
    username: 'mrkutin',
    password: '1qaz'
  }
})

const populate = async () => {
  for (let i = 0; i < 100000; i++){
    await db.post({
      caption: Math.random().toString(36).replace(/[^a-z]+/g, ''),
      text: Math.random().toString(36).replace(/[^a-z]+/g, ''),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}


populate()
