class Router {
    constructor(db1, db2) {
        this.databases = {
            'without': db1,
            'with': db2,
        }
    }
    getDatabase(typeDb) {
        return this.databases[typeDb]
    }
}

module.exports = Router