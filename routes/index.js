const databases = require('../database/db')
const countDt = require('../source/countDt')
const functions = require('../source/generateQuery')
const routerDb = require('../source/routerDb')

const generateQuery = functions[0]
const createJson = functions[1]
const score = functions[2]

var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/repository/:id/database/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)

    db.any(generateQuery(req.params.id))
        .then(function(data) {
            res.json(data)
        }).catch(function(data) {
            console.log(data)
        })
});

router.get('/projects/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)


    db.any('select * from projects')
        .then(data => res.json(data))
        .catch(data => res.json(data))
});

router.get('/dt/project/:id/database/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)

    db.any(generateQuery(req.params.id))
        .then(function(data) {
            res.json(countDt(data))
        }).catch(function(data) {
            console.log(data)
        })
});

router.get('/jsonHierarchical/:id/database/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)

    const idProject = req.params.id
    db.multi(generateQuery(idProject) + ';' + score(idProject)).then((projects, classes) => {
        res.json(createJson(projects[0], projects[1]))
    })
});


module.exports = router;