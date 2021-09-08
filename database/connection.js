import pgp from 'pg-promise';
const connection = pgp()('postgres://postgres:1234@localhost:5432/with_heuristics')
connection.connect()

export { connection };