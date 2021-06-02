const db = require('../database/db')
const countDt = require('../source/countDt')
const functions = require('../source/generateQuery')


const generateQuery = functions[0]
const createJson = functions[1]
const score = functions[2]

var express = require('express');
const { reset } = require('nodemon')
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/repository/:id', function(req, res, next) {
    db.any(generateQuery(req.params.id))
        .then(function(data) {
            res.json(data)
        }).catch(function(data) {
            console.log(data)
        })
});

router.get('/projects', function(req, res, next) {
    db.any('select * from projects')
        .then(data => res.json(data))
        .catch(data => res.json(data))
});

router.get('/dt/project/:id', function(req, res, next) {
    db.any(generateQuery(req.params.id))
        .then(function(data) {
            res.json(countDt(data))
        }).catch(function(data) {
            console.log(data)
        })
});

router.get('/jsonHierarchical/:id', function(req, res, next) {
    const idProject = req.params.id
    db.multi(generateQuery(idProject) + ';' + score(idProject)).then((projects, classes) => {
        res.json(createJson(projects[0], projects[1]))
    })
});


module.exports = router;