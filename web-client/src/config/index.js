const couchDbUrl = process.env.VUE_APP_COUCH_DB_URL

console.log('process.env: ', process.env)
console.log('couchDbUrl: ', couchDbUrl)

export {
  couchDbUrl
}
