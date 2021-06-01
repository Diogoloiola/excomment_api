const pgp = require('pg-promise')( /* options */ )
const db = pgp('postgres://postgres:1234@localhost:5432/tccFinalSem')
db.connect()

module.exports = db