const pgp = require('pg-promise')( /* options */ )
const noHeurisct = pgp('postgres://postgres:1234@localhost:5432/tccFinalSem')
noHeurisct.connect()

const withHeurisct = pgp('postgres://postgres:1234@localhost:5432/comheuristica')
withHeurisct.connect()


module.exports = [noHeurisct, withHeurisct]