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

router.get('/score/project/:id/database/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)

    db.any(score(req.params.id))
        .then(function(data) {
            res.json(data)
        }).catch(function(data) {
            console.log(data)
        })
});


router.get('/score/project/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)

    db.any(`select * from (

        select padroes.id, 
         COALESCE(total, 0) as totalPadroes, 
         COALESCE(totalh, 0) as totalHeuristicas,  
         COALESCE(total, 0) + COALESCE(totalh, 0) as scoreTotal, 
         padroes.comment,
         padroes.path,
         padroes.classe,
         padroes.method
         
        from 
     
         (select sum(score) as total, 
                 c.id as id, 
                 c.comment as comment,
                 c.path as path,
                 cl.name as Classe,
                 m.name as method
          from comments c
          left join pattern_comment pc ON pc.idComment=c.id
          left join pattern p ON p.id = pc.idPattern
          left join classes cl ON cl.id = c.idclass
          left join methods m ON m.id = c.idmethod
          group by c.id, cl.id, m.id
          order by total) as padroes
     
     right join 
     
         (select c.id as id, 
                 sum(score) as totalh, 
                 c.path as path
          from comments c
          left join comment_heuristicas ch ON ch.idcomment = c.id
          left join heuristicas h ON ch.idheuristica = h.id
          group by c.id) as heuristicas
     
     ON padroes.id = heuristicas.id
     order by scoreTotal desc, total desc, totalh desc) total
     
     where scoreTotal > 0`)
        .then(function(data) {
            res.json(data)
        }).catch(function(data) {
            console.log(data)
        })
});


router.get('/jsonHierarchical/:id/database/:type', function(req, res, next) {

    const type = req.params.type
    const db = new routerDb(databases[0], databases[1]).getDatabase(type)

    const idProject = req.params.id
    db.multi(generateQuery(idProject) + ';' + score()).then((projects, classes) => {
        res.json(createJson(projects[0], projects[1], req.query.flag))
    })
});


module.exports = router;