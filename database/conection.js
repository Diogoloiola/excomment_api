import pgp from 'pg-promise';
const conection = pgp()('postgres://postgres:1234@localhost:5432/comheuristica')
conection.connect()

export { conection };