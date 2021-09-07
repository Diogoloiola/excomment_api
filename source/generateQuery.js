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

function generateQueryForScoresNoHeuristics() {
    return `select * from (

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
     
     where scoreTotal > 0`
}


function helperJson(data, score, flag) {
    let jsonHelper = new hierarchicalJson
    data.forEach(dataRepository => {
        let scoreValor = score.filter(info => info.id == dataRepository.idcomment);
        jsonHelper.pushPath(generateCorrectPath(dataRepository.path) + '/' + scoreValor[0].scoretotal + '/' + dataRepository.tdtype)
    })
    jsonHelper.creteDataObj()
    jsonHelper.createHierarchicalJson('true' === flag)
    return jsonHelper.date
}

function generateCorrectPath(path) {
    let pathArray = path.split(/[\\"]/g)
    return pathArray.slice(8, pathArray.length).join('/')
}

module.exports = [generateQuery, helperJson, generateQueryForScoresNoHeuristics]