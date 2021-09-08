import pgp from 'pg-promise';
import dotenv from 'dotenv'

dotenv.config()

/**
 * This function returns a url to connect to the database.
 * @returns string
 */

function formatStringFoConnection() {
    const password = process.env.DB_PASS;
    const user = process.env.DB_USER;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const database = process.env.DB_NAME;
    const url = `postgres://${user}:${password}@${host}:${port}/${database}`;

    return url;
}
const connection = pgp()(formatStringFoConnection())
connection.connect()

export { connection };