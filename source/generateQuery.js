const hierarchicalJson = require('./hierarchicalJson')
const db = require('../database/db')

function generateQuery(id) {
    return `select distinct pc.idComment,tp.tdtype, c.comment, c.path, cl.name, m.name
    from
        pattern_comment pc, tdType tp, theme t, theme_tdtype tt, pattern_theme pt, pattern p, comments c
        left join classes cl ON cl.id = c.idclass 
        left join methods m ON m.id = c.idMethod
    where 
        pc.idPattern = p.id and
        pc.idPattern = pt.idPattern and
        t.id = pt.idTheme and
        t.id = tt.idTheme and
        tt.idTdType = tp.id and
        c.id = pc.idcomment and c.idProject = ${id}
    order by pc.idComment`
}

function generateQueryForScoresNoHeuristics(id) {
    return `select sum(score) as total, c.comment, c.id, c.idproject
        from comments c, pattern p, pattern_comment pc
        where
        pc.idcomment = c.id and
        pc.idpattern = p.id and
        c.idproject = ${id}
        group by c.id
        order by total desc`
}


function helperJson(data, score) {
    let jsonHelper = new hierarchicalJson
    data.forEach(dataRepository => {
        let scoreValor = score.filter(info => info.id == dataRepository.idcomment);
        jsonHelper.pushPath(generateCorrectPath(dataRepository.path) + '/' + scoreValor[0].total + '/' + dataRepository.tdtype)
    })
    jsonHelper.creteDataObj()
    jsonHelper.createHierarchicalJson(false)
    return jsonHelper.date
}

function generateCorrectPath(path) {
    let pathArray = path.split(/[\\"]/g)
    return pathArray.slice(8, pathArray.length).join('/')
}

module.exports = [generateQuery, helperJson, generateQueryForScoresNoHeuristics]